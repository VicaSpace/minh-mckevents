export default {
  app: {
    port: process.env.PORT ?? 4000,
    host: process.env.HOST ?? 'localhost',
  },
  db: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'mysecretishere',
  },
};
