.PHONY: preview prod

stage:
	git commit -a

prod-push:
	git checkout prod
	git merge main
	git push origin prod
	git checkout main

prod: stage prod-push

preview-push:
	git push origin main

preview: stage preview-push