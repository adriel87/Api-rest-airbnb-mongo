
export const envConstant = {
    NODE_ENV: process.env?.NODE_ENV ?? 'no variable added',
    isProduction: process.env.NODE_ENV === "production",
    PORT: Number(process.env?.PORT) ?? 3030,
    STATIC_FILES_PATH: process.env?.STATIC_FILES_PATH ?? 'no variable added',
    CORS_ORIGIN: process.env?.CORS_ORIGIN ?? 'no variable added',
    CORS_METHODS: process.env?.CORS_METHODS ?? 'no variable added',
    CORS_CREDENTIALS: process.env?.CORS_CREDENTIALS === 'TRUE',
    API_MOCK: process.env?.API_MOCK === 'true',
    MONGODB_URI: process.env?.MONGODB_URI ?? 'no variable added',
    MONGODB_APARTMENT_COLLECTION: process.env?.MONGODB_APARTMENT_COLLECTION ?? '',
    MONGODB_USER_COLLECTION: process.env?.MONGODB_USER_COLLECTION ?? '',
    USE_MONGOOSE: process.env?.USE_MONGOOSE === 'true',
    SECRET_KEY: process.env?.SECRET_KEY,
    SALT_LENGTH: Number(process.env?.SALT_LENGTH) ?? 1,
    PASSWORD_LENGTH: Number(process.env?.PASSWORD_LENGTH) ?? 1,
    ITERATIONS: Number(process.env?.ITERATIONS) ?? 1,
    SALT: process.env?.SALT ?? ''
}