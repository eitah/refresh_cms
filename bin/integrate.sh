#!/usr/bin/env bash

cp bin/git_hooks/pre-push .git/hooks/

git pull --rebase

npm run-script eslint
npm run-script test

git push
