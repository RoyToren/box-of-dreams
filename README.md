box of dreams

if you want to run in dev mode:
go to functions folder, than use: npm run dev

if you want to run in production:
first run in client folder: run npm build
than, run in root folder firebase serve --only functions,hosting(takes client build)

if you want to deploy:
run in root folder: firebase deploy