#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

/**
 * Network build script for Algebra Subgraph
 * Copies network-specific configuration files from config directory
 * 
 * Usage:
 *   tsx scripts/prepare-network.ts [network-name]
 *   npm run prepare:polygon
 *   NETWORK=polygon npm run prepare
 */

// Get network from command line argument or environment variable
const network = process.argv[2] || process.env.NETWORK || 'base-sepolia';

console.log(`🌐 Building for network: ${network}`);

// Paths
const rootDir = path.join(__dirname, '..');
const configDir = path.join(rootDir, 'config');

// Check if config directory exists
if (!fs.existsSync(configDir)) {
  console.error(`❌ Config directory not found: ${configDir}`);
  console.error(`Please create the config directory with network subdirectories`);
  process.exit(1);
}

// Get available networks from config directory
const availableNetworks = fs.readdirSync(configDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

if (availableNetworks.length === 0) {
  console.error(`❌ No network configurations found in ${configDir}`);
  console.error(`Please create network subdirectories with chain.ts files`);
  process.exit(1);
}

if (!availableNetworks.includes(network)) {
  console.error(`❌ Network '${network}' not found in config directory`);
  console.error(`Available networks: ${availableNetworks.join(', ')}`);  process.exit(1);
}

console.log(`📋 Found network configuration for: ${network}`);

// Load network config.json
const networkConfigPath = path.join(configDir, network, 'config.json');
let networkConfig: { 
  network: string; 
  startBlock: number; 
  description?: string;
} | null = null;

try {
  if (!fs.existsSync(networkConfigPath)) {
    console.error(`❌ Network config file not found: ${networkConfigPath}`);
    console.error(`Please create config/${network}/config.json with network details`);
    process.exit(1);
  }
  
  const configContent = fs.readFileSync(networkConfigPath, 'utf8');
  networkConfig = JSON.parse(configContent);
  
  // Validate required fields
  if (!networkConfig || !networkConfig.network || networkConfig.startBlock === undefined) {
    throw new Error('Missing required fields: network and/or startBlock');
  }
  
  console.log(`📋 Network config loaded:`, {
    network: networkConfig.network,
    startBlock: networkConfig.startBlock
  });
  
} catch (error) {
  console.error(`❌ Error reading config.json: ${(error as Error).message}`);
  process.exit(1);
}

// Function to normalize addresses to lowercase in chain.ts content
function normalizeAddresses(chainContent: string): string {
  // Normalize single address constants (supports ', ", ` quotes)
  chainContent = chainContent.replace(
    /(export const \w*ADDRESS\w* = (['"`]))([^'"`]+)\2/g,
    (match, prefix, quote, address) => prefix + address.toLowerCase() + quote
  );
  
  // Normalize REFERENCE_TOKEN (supports ', ", ` quotes)
  chainContent = chainContent.replace(
    /(export const REFERENCE_TOKEN = (['"`]))([^'"`]+)\2/g,
    (match, prefix, quote, address) => prefix + address.toLowerCase() + quote
  );
  
  // Normalize STABLE_TOKEN_POOL (supports ', ", ` quotes)
  chainContent = chainContent.replace(
    /(export const STABLE_TOKEN_POOL = (['"`]))([^'"`]+)\2/g,
    (match, prefix, quote, address) => prefix + address.toLowerCase() + quote
  );
  
  // Normalize arrays of addresses (WHITELIST_TOKENS, STABLE_COINS, etc.) - supports ', ", ` quotes
  chainContent = chainContent.replace(
    /(['"`])(0x[a-fA-F0-9]+)\1/g,
    (match, quote, address) => quote + address.toLowerCase() + quote
  );
  
  return chainContent;
}

// Copy network-specific chain.ts file - this is now done per subgraph in processSubgraphTemplate
const networkChainPath = path.join(configDir, network, 'chain.ts');

if (!fs.existsSync(networkChainPath)) {
  console.error(`❌ Network configuration file not found: ${networkChainPath}`);
  console.error(`Please create config/${network}/chain.ts with network-specific constants`);
  process.exit(1);
}

console.log(`📋 Using chain configuration from: ${networkChainPath}`);

// Function to extract values from chain.ts file
function extractConfigFromChainFile(chainFilePath: string): { 
  factoryAddress: string; 
  nonfungiblePositionManagerAddress: string;
  eternalFarmingAddress?: string;
  limitOrderAddress?: string;
} {
  try {
    const chainContent = fs.readFileSync(chainFilePath, 'utf8');
    
    // Extract FACTORY_ADDRESS
    const factoryMatch = chainContent.match(/export const FACTORY_ADDRESS = '([^']+)'/);
    const factoryAddress = factoryMatch ? factoryMatch[1] : '';
    
    // Extract NONFUNGIBLE_POSITION_MANAGER_ADDRESS
    const nftManagerMatch = chainContent.match(/export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '([^']+)'/);
    const nonfungiblePositionManagerAddress = nftManagerMatch ? nftManagerMatch[1] : '';
    
    // Extract farming addresses (optional)
    const eternalFarmingMatch = chainContent.match(/export const ETERNAL_FARMING_ADDRESS = '([^']+)'/);
    const eternalFarmingAddress = eternalFarmingMatch ? eternalFarmingMatch[1] : undefined;
    
    // Extract limit order address (optional)
    const limitOrderMatch = chainContent.match(/export const LIMIT_ORDER_ADDRESS = '([^']+)'/);
    const limitOrderAddress = limitOrderMatch ? limitOrderMatch[1] : undefined;
    
    if (!factoryAddress || !nonfungiblePositionManagerAddress) {
      throw new Error('Could not extract required addresses from chain.ts');
    }
    
    return { 
      factoryAddress, 
      nonfungiblePositionManagerAddress,
      eternalFarmingAddress,
      limitOrderAddress
    };
  } catch (error) {
    throw new Error(`Failed to parse chain.ts: ${(error as Error).message}`);
  }
}

// Function to process subgraph template for a specific subgraph
function processSubgraphTemplate(
  subgraphName: string, 
  networkConfig: { 
    network: string; 
    startBlock: number; 
    description?: string;
  }, 
  addresses: ReturnType<typeof extractConfigFromChainFile>
): void {
  const subgraphDir = path.join(rootDir, 'subgraphs', subgraphName);
  const templatePath = path.join(subgraphDir, 'subgraph.template.yaml');
  const outputPath = path.join(subgraphDir, 'subgraph.yaml');
  const chainUtilsPath = path.join(subgraphDir, 'src', 'utils', 'chain.ts');
  
  // Skip if template doesn't exist
  if (!fs.existsSync(templatePath)) {
    console.log(`⚠️  No template found for ${subgraphName} subgraph, skipping...`);
    return;
  }
  
  try {
    // Copy chain.ts to subgraph's utils directory only for subgraphs that need it
    // Farming and limits subgraphs don't need chain.ts as they don't use network constants
    const needsChainFile = ['analytics'].includes(subgraphName);
    
    if (needsChainFile) {
      const chainUtilsDir = path.dirname(chainUtilsPath);
      if (!fs.existsSync(chainUtilsDir)) {
        fs.mkdirSync(chainUtilsDir, { recursive: true });
      }
      
      const chainContent = fs.readFileSync(networkChainPath, 'utf8');
      const normalizedContent = normalizeAddresses(chainContent);
      fs.writeFileSync(chainUtilsPath, normalizedContent);
    }
    
    // Process template
    const template = fs.readFileSync(templatePath, 'utf8');
    
    // Use the same start block for all subgraphs
    const startBlock = networkConfig.startBlock;
    
    let subgraphContent = template
      .replace(/{{NETWORK_NAME}}/g, network)
      .replace(/{{NETWORK}}/g, networkConfig.network)
      .replace(/{{FACTORY_ADDRESS}}/g, addresses.factoryAddress)
      .replace(/{{NONFUNGIBLE_POSITION_MANAGER_ADDRESS}}/g, addresses.nonfungiblePositionManagerAddress)
      .replace(/{{START_BLOCK}}/g, startBlock.toString());
    
    // Replace farming-specific placeholders
    if (addresses.eternalFarmingAddress) {
      subgraphContent = subgraphContent.replace(/{{ETERNAL_FARMING_ADDRESS}}/g, addresses.eternalFarmingAddress);
    }
    
    // Replace limit order placeholders
    if (addresses.limitOrderAddress) {
      subgraphContent = subgraphContent.replace(/{{LIMIT_ORDER_ADDRESS}}/g, addresses.limitOrderAddress);
    }
    
    fs.writeFileSync(outputPath, subgraphContent);
    console.log(`✅ Generated ${subgraphName}/subgraph.yaml from template`);
    if (needsChainFile) {
      console.log(`✅ Copied chain.ts to ${subgraphName}/src/utils/`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${subgraphName} subgraph: ${(error as Error).message}`);
  }
}

// Generate subgraph.yaml files for all subgraphs
try {
  // Extract configuration from chain.ts
  const addresses = extractConfigFromChainFile(networkChainPath);
  
  // Ensure networkConfig is not null
  if (!networkConfig) {
    throw new Error('Network configuration not loaded');
  }
  
  // Process each subgraph
  const subgraphs = ['analytics', 'farming', 'blocks', 'limits'];
  let processedCount = 0;
  
  for (const subgraphName of subgraphs) {
    const subgraphDir = path.join(rootDir, 'subgraphs', subgraphName);
    if (fs.existsSync(subgraphDir)) {
      processSubgraphTemplate(subgraphName, networkConfig, addresses);
      processedCount++;
    } else {
      console.log(`⚠️  Subgraph directory not found: ${subgraphName}, skipping...`);
    }
  }
  
  if (processedCount === 0) {
    throw new Error('No subgraphs were processed');
  }
  
} catch (error) {
  console.error(`❌ Error processing subgraph templates: ${(error as Error).message}`);
  process.exit(1);
}

console.log('✅ Network preparation complete!');
console.log('📁 Files updated:');
console.log(`  - subgraphs/*/subgraph.yaml (generated from templates)`);
console.log(`  - subgraphs/*/src/utils/chain.ts (copied and normalized from config/${network}/chain.ts)`);
console.log(`🔧 All token addresses normalized to lowercase`);
console.log(`🚀 Ready to build for ${network}!`);
console.log(`💡 Next steps:`);
console.log(`  cd subgraphs/analytics && yarn codegen && yarn build    # Build analytics subgraph`);
console.log(`  cd subgraphs/farming && yarn codegen && yarn build # Build farming subgraph (if configured)`);
console.log(`  cd subgraphs/blocks && yarn codegen && yarn build  # Build blocks subgraph (if configured)`);
console.log(`  cd subgraphs/limits && yarn codegen && yarn build  # Build limits subgraph (if configured)`);
