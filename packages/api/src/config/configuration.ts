type AppConfiguration = {
  port: number
}

const config = () : AppConfiguration => ({
    port: parseInt(process.env.PORT, 10) || 5000
  });

export default config