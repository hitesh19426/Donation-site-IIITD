const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? process.env.DEVLOPMENT_URL : "http://localhost:3000"