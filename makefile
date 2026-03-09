.PHONY: preview prod

tests:
	npx vitest run

stage:
	git diff-index --quiet HEAD || git commit -a

prod-push:
	git checkout prod
	git merge main
	git push origin prod
	git checkout main

prod: tests stage prod-push

preview-push:
	git push origin main

preview: tests stage preview-push