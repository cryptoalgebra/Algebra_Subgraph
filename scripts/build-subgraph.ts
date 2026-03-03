#!/usr/bin/env tsx
/// <reference types="node" />

import { execSync } from 'child_process';
import { readdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const AVAILABLE_SUBGRAPHS = ['analytics', 'farming', 'blocks', 'limits', 'alm', 'erc20-deployer'];

function getAvailableNetworks(): string[] {
  const configDir = join(__dirname, '..', 'config');
  if (!existsSync(configDir)) {
    console.error('❌ Config directory not found');
    process.exit(1);
  }
  
  return readdirSync(configDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

function getNetworkFromSubgraph(subgraph: string): string | null {
  const subgraphDir = join(__dirname, '..', 'subgraphs', subgraph);
  const subgraphYaml = join(subgraphDir, 'subgraph.yaml');
  
  if (!existsSync(subgraphYaml)) {
    return null;
  }
  
  try {
    const content = readFileSync(subgraphYaml, 'utf8');
    const networkMatch = content.match(/network:\s*(\S+)/);
    return networkMatch ? networkMatch[1] : null;
  } catch (error) {
    return null;
  }
}

function buildSubgraph(subgraph: string): boolean {
  const subgraphDir = join(__dirname, '..', 'subgraphs', subgraph);
  
  if (!existsSync(subgraphDir)) {
    console.error(`❌ Subgraph directory not found: ${subgraphDir}`);
    return false;
  }
  
  // Check if subgraph.yaml exists
  const subgraphYaml = join(subgraphDir, 'subgraph.yaml');
  if (!existsSync(subgraphYaml)) {
    console.error(`❌ subgraph.yaml not found for ${subgraph}. Run: yarn prepare-network <network>`);
    return false;
  }
  
  // Detect network from subgraph.yaml
  const network = getNetworkFromSubgraph(subgraph);
  if (!network) {
    console.error(`❌ Could not detect network from subgraph.yaml`);
    return false;
  }
  
  console.log(`🔨 Building ${subgraph} subgraph (network: ${network})...`);
  
  try {
    // Generate types
    console.log(`🔧 Generating types...`);
    execSync(`graph codegen --output-dir src/types`, { 
      stdio: 'inherit',
      cwd: subgraphDir
    });
    
    // Build subgraph
    console.log(`🏗️  Building subgraph...`);
    execSync(`graph build`, { 
      stdio: 'inherit',
      cwd: subgraphDir
    });
    
    console.log(`✅ Successfully built ${subgraph} subgraph for ${network}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to build ${subgraph} subgraph:`, error);
    return false;
  }
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log(`
📖 Usage: yarn build-subgraph <subgraph>

📋 Available subgraphs: ${AVAILABLE_SUBGRAPHS.join(', ')}

📝 Examples:
  yarn build-subgraph analytics
  yarn build-subgraph farming  
  yarn build-subgraph blocks
  yarn build-subgraph limits

💡 The network will be automatically detected from the existing subgraph.yaml file.
   If subgraph.yaml doesn't exist, run: yarn prepare-network <network> first.
    `);
    process.exit(1);
  }
  
  const [subgraph] = args;
  
  // Validate subgraph
  if (!AVAILABLE_SUBGRAPHS.includes(subgraph)) {
    console.error(`❌ Invalid subgraph: ${subgraph}`);
    console.log(`📋 Available subgraphs: ${AVAILABLE_SUBGRAPHS.join(', ')}`);
    process.exit(1);
  }
  
  const success = buildSubgraph(subgraph);
  process.exit(success ? 0 : 1);
}

// Run if this file is executed directly
main();
