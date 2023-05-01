const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? "https://donation-site-iiitd.vercel.app/" : "https://donation-site-iiitd.vercel.app/"