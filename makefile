.PHONY: preview prod

stage:
	git commit -a

prod-push:
	git push origin main

prod: stage prod-push

preview-push:
	git push origin preview

preview: stage preview-push