import { isString } from './utils/parseTypes/typeChecks'
import { Config } from './types'
import dotenv from 'dotenv'

dotenv.config()

// .env config

const { PORT, DB_URL } = process.env

if (!isString(PORT) || !isString(DB_URL)) {
  console.log('Please provide a valid .env config')
  process.exit(0)
}

// Options passed to the Twitch client

const config: Config = {
  port: PORT,
  database: {
    url: DB_URL,
  },
}

export default config
