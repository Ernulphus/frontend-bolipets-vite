.PHONY: commit preview prod all

lint:
	npm run lint

tests:
	npx vitest run

continuous_tests:
	npm run test

stage:
	git diff-index --quiet HEAD || git commit -a

commit: stage

prod-push:
	git checkout prod
	git merge main
	git push origin prod
	git checkout main

prod: lint tests stage prod-push

preview-push:
	git push origin main

preview: lint tests stage preview-push

all: lint tests stage preview-push prod-push