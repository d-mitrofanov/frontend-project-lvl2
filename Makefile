# Makefile

install:
		npm install

gendiff:
		node bin/gendiff

publish:
		npm publish --dry-run

lint:
		npx eslint .