import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    env: process.env.NODE_ENV,
    accessTokenSecret: 'B6vW7Zj9RLqwfOXy05OTSBhDznGn8OHbqMhkp7CqsdjlnopjZMd15QGmhJ4LdafBun6IVwyk7ZXjDmZNgFEwLiXJqpGpnJpYwJz',
    refreshTokenSecret: 'r4HK1fSVJgODIlbQYWsi0XOcPqrnIa4v8Y2aAfspodg2PlKZ34nb6SKu99scbLhPozsK7LN2traABIDQG9PqAtsA6cj2j3hM1Al',
    permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILE']
};
