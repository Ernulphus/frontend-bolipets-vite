.PHONY: commit preview prod all setup

lint:
	npm run lint

tests:
	npx vitest run

build:
	npm run build


continuous_tests:
	npm run test

stage:
	git diff-index --quiet HEAD || git commit -a

commit: stage

setup: lint tests build stage

prod-push:
	git checkout prod
	git merge main
	git push origin prod
	git checkout main

prod: setup prod-push

preview-push:
	git push origin main

preview: setup preview-push

all: setup preview-push prod-push