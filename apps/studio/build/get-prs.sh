#! /bin/bash

set -euxo pipefail

TAG="$1"


git log --merges --first-parent main "$TAG..HEAD" --oneline
