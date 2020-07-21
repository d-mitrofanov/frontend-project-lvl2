# Makefile

install:
		npm install

gendiff:
		node --experimental-modules bin/gendiff 

publish:
		npm publish --dry-run

lint:
		npx eslint .