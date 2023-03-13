#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

# for f in lib/commonjs/*.js; do
#     echo "rename $f";
#     mv "$f" "${f/.js/.cjs}";
# done

# for f in lib/commonjs/presets/*.js; do
#     echo "rename $f";
#     mv "$f" "${f/.js/.cjs}";
# done

cat >dist/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF

cat >dist/esm/package.json <<!EOF
{
    "type": "module"
}
!EOF