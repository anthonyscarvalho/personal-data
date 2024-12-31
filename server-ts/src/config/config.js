export const config = {
    global: {
        // Database
        MONGODB_URL: 'mongodb://192.168.0.201:27017',
        MONGODB_DATABASE: 'accounts',

        // Files
        FILE_ROOT: 'MediaCollection'
    },
    dev: {
        PORT: 3002,
        NODE_ENV: 'dev',

        // JWT - Temporarily hardcoded
        JWT_ACCESS_SECRET: '',
        JWT_REFRESH_SECRET: '',

        JWT_SECRET: '',

        // rabbitmq
        COLLECTION_NAME: 'accounts_dev'
    },
    prod: {
        PORT: 3091,
        NODE_ENV: 'prod',

        // JWT - Temporarily hardcoded
        JWT_ACCESS_SECRET: '',
        JWT_REFRESH_SECRET: '',

        JWT_SECRET: '',

        // rabbitmq
        COLLECTION_NAME: 'accounts_dev'
    }
};
