#!/bin/bash

# Usage: VERSION_TO_DEPLOY=30.6.2025 ./update_addresses.sh input.json

if [ "$#" -ne 1 ]; then
  echo "Usage: VERSION_TO_DEPLOY=<version> $0 <input.json>"
  exit 1
fi

if [ -z "$VERSION_TO_DEPLOY" ]; then
  echo "❌ VERSION_TO_DEPLOY env variable is not set"
  exit 1
fi

JSON_FILE="$1"
CONSTANTS_FILE="Algebra/src/utils/constants.ts"
SUBGRAPH_FILE="Algebra/subgraph.yaml"
PACKAGE_FILE="Algebra/package.json"

# Extract addresses from JSON
FACTORY=$(jq -r '.factory' "$JSON_FILE")
NONFUNGIBLE_POSITION_MANAGER=$(jq -r '.nonfungiblePositionManager' "$JSON_FILE")

# === constants.ts ===
sed -i '' -E "s|export const FACTORY_ADDRESS = '0x[a-fA-F0-9]{40}'|export const FACTORY_ADDRESS = '$FACTORY'|" "$CONSTANTS_FILE"

# === subgraph.yaml ===
sed -i '' -E "/name: Factory/ {
  N;N;N;N;
  s/address: '0x[a-fA-F0-9]{40}'/address: '$FACTORY'/
}" "$SUBGRAPH_FILE"

sed -i '' -E "/name: NonfungiblePositionManager/ {
  N;N;N;N;
  s/address: '0x[a-fA-F0-9]{40}'/address: '$NONFUNGIBLE_POSITION_MANAGER'/
}" "$SUBGRAPH_FILE"

# === package.json ===
# Replace anything after poap-subgraph-core/ and before --path
sed -i '' -E "s|(poap-subgraph-core/)[^ ]+|\1${VERSION_TO_DEPLOY}|" "$PACKAGE_FILE"

echo "✅ All updates applied successfully."
