type AppConfiguration = {
  port: number,
  env: string
}

const config = () : AppConfiguration => ({
    port: parseInt(process.env.PORT, 10) || 5000,
    env: process.env.NODE_ENV || 'development'
  });

export default config