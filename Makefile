# Makefile

install:
		npm install

gendiff:
		node --experimental-modules bin/gendiff 

test:
		npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
		npm publish --dry-run

lint:
		npx eslint .