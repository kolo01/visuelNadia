git:
	git add .
	git commit -m "new commit"
	git push

test: 
	git remote remove origin
	git remote add origin https://github.com/kolo01/chapchap.git 
	git add .
	git commit -m "24 octobre"
	git push --set-upstream origin main
	

principale: 
	git remote remove origin
	git remote add origin https://github.com/RSCHAIN/chap_client.git
	git add .
	git commit -m "25 octobre"
	git push --set-upstream origin main -f