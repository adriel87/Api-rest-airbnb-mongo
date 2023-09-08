
export const envConstant = {
    NODE_ENV: process.env?.NODE_ENV ?? 'no variable added',
    PORT: Number(process.env?.PORT) ?? 3030,
    STATIC_FILES_PATH: process.env?.STATIC_FILES_PATH ?? 'no variable added',
    CORS_ORIGIN: process.env?.CORS_ORIGIN ?? 'no variable added',
    CORS_METHODS: process.env?.CORS_METHODS ?? 'no variable added',
    CORS_CREDENTIALS: process.env?.CORS_CREDENTIALS === 'TRUE',
    API_MOCK: process.env?.API_MOCK ?? 'no variable added',
    MONGODB_URI: process.env?.MONGODB_URI ?? 'no variable added',
}