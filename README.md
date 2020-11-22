# AlgoBridge web client

[Hosted site](https://algobridge.netlify.com/)

## How to run

1. Clone repository
2. Run `npm install`
3. Set `REACT_APP_API_URL` environment variable in /.env file (api url to backend)
4. Run `npm run server`

## How to deploy

1. Check that test stage of CI was passed
2. Deploy manually via Circle CI trigger

## Command

- `npm install` - install dependencies
- `npm run dev` - build project in develop mode
- `npm run prod` - build project in production mode
- `npm run analyzer` - visualize packages' size
