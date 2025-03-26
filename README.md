## Basic Authentication System With Expressjs And MongoDB

Config your .env file:

```env
PORT=3000
MONGO_URI="mongodb://localhost:27017/express-athentication"
COOKIES_SECRET="59810e40-3a3c-48e8-9e4c-24881f2262df"
ACCESS_TOKEN_SECRET="8c10eabd-3b9d-4800-aacf-28a9af5e681f"
REFRESH_TOKEN_SECRET="dd2d1ac9-2563-4a74-8be3-149e6891467e"
ACCESS_TOKEN_EXPIRES="10s"
REFRESH_TOKEN_EXPIRES="30d"
ACCESS_TOKEN_EXPIRES_IN_MILLISECONDS=10000
REFRESH_TOKEN_EXPIRES_IN_MILLISECONDS=2592000000
```

Run development server:

```bash
npm run dev
```

Development server running on [http://localhost:3000](http://localhost:3000)
