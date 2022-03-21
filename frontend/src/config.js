const isProd = !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

const config = {
  isPord,
  apiUrlPrefix: isProd ? 'api' : 'http://localhost:8000/api'
}

export default config;