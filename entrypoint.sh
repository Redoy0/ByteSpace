#!/bin/sh
set -e

# Path to the static and server files in standalone mode
# TARGET_DIR="./.next"
TARGET_DIR="./.next/static"

echo "Injecting runtime variables..."

# Collect all NEXT_PUBLIC vars into a sed expression
# This builds one big command so we only scan files ONCE
SED_EXPR=""
for line in $(printenv | grep NEXT_PUBLIC_); do
  key=$(echo $line | cut -d "=" -f1)
  value=$(echo $line | cut -d "=" -f2)
  
  echo "Replacing $key with value $value"
  # Escape forward slashes in values for sed
  escaped_value=$(echo "$value" | sed 's/\//\\\//g')
  SED_EXPR="$SED_EXPR s/$key/$escaped_value/g;"
done

# Run sed on all js and html files in the build folder (skip CSS to prevent corruption)
if [ -n "$SED_EXPR" ]; then
  find "$TARGET_DIR" -type f \( -name "*.js" -o -name "*.html" \) \
    -exec sed -i "$SED_EXPR" {} +
fi

echo "Variables injected. Starting Next.js..."
exec "$@"