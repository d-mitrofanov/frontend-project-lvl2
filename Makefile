# Makefile

install:
		npm install

gendiff:
		node --experimental-modules bin/gendiff 

test:
		npm test

publish:
		npm publish --dry-run

lint:
		npx eslint .