#!/usr/bin/env bash

OBSIDIAN_VAULT="some-remarks"

set -e

# Make sure yarn is available.
#
if [[ -z "$(which yarn 2> /dev/null)" ]]; then
	echo "Could not find yarn in your system's PATH!"
	exit 1
fi

# Try to locate the git directory based on the path of this script.
#
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [[ ! -d "$SCRIPT_DIR/.git" ]] || [[ ! -d "$SCRIPT_DIR/overlay" ]] || [[ ! -d "$SCRIPT_DIR/www" ]]; then
	echo "Could not locate website git repo!"
	exit 1
fi

# Try to locate Obsidian vault directory.
#
if [[ -d "$HOME/Documents/Obsidian/$OBSIDIAN_VAULT/.obsidian" ]]; then
	DATA_DIR="$HOME/Documents/Obsidian/$OBSIDIAN_VAULT"
elif [[ -d "$HOME/storage/shared/Documents/Obsidian/$OBSIDIAN_VAULT/.obsidian" ]]; then
	DATA_DIR="$HOME/storage/shared/Documents/Obsidian/$OBSIDIAN_VAULT"
elif [[ -d "$HOME/Obsidian/$OBSIDIAN_VAULT/.obsidian" ]]; then
	DATA_DIR="$HOME/Obsidian/$OBSIDIAN_VAULT"
elif [[ -d "$HOME/obsidian/$OBSIDIAN_VAULT/.obsidian" ]]; then
	DATA_DIR="$HOME/obsidian/$OBSIDIAN_VAULT"
else
	echo "Could not locate Obsidian vault $OBSIDIAN_VAULT in the usual locations!"
	exit 1
fi

# Clean build directory and exit if instructed  to do so
#
if [[ "$1" == "clean" ]]; then
	(
		cd "$SCRIPT_DIR"

		[[ -e build ]] && rm -rf build
	)
	exit
fi

# Set up the build directory.
#
(
	cd "$SCRIPT_DIR"

	mkdir -p build
	cd build

	[[ ! -d obsidian ]] && rm -f obsidian
	if [[ ! -e obsidian ]]; then
		cp -af "$DATA_DIR" obsidian
		cd obsidian
		rm -rf .obsidian \
		       .trash \
		       assets/private \
		       metadata \
		       templates
		find . -type f \( -name '.DS_Store' -o -name '.nomedia' \) -delete
		cd ..
	fi

	[[ ! -d quartz ]] && rm -f quartz
	if [[ ! -e quartz ]]; then
		cp -af ../quartz quartz
	fi

	cp -af ../overlay/* quartz/
	cd quartz
	[[ -e .git ]] && rm -rf .git
	[[ -e package-lock.json ]] && rm -f package-lock.json
	yarn install
)

# Build the site!
#
(
	cd "$SCRIPT_DIR"

	[[ -e "www/$OBSIDIAN_VAULT" ]] && rm -rf "www/$OBSIDIAN_VAULT"
	mkdir -p "www/$OBSIDIAN_VAULT"

	cd build/quartz
	if [[ "$1" == "serve" ]]; then
		yarn run quartz build \
			--directory ../obsidian \
			--output ../../www/"$OBSIDIAN_VAULT" \
			--serve
	else
		yarn run quartz build \
			--directory ../obsidian \
			--output ../../www/"$OBSIDIAN_VAULT"
	fi
	sed -i'' -e 's#href=\&quot;[\./]\+/#href=\&quot;https://cardboard-iguana.com/grimoire/#g;s#src=\&quot;[\./]\+/#src=\&quot;https://cardboard-iguana.com/grimoire/#g;' ../../www/"$OBSIDIAN_VAULT"/index.xml
)
