import { isString } from './utils/parseTypes/typeChecks'
import { Config } from './types'
import dotenv from 'dotenv'

dotenv.config()

// .env config

const { PORT } = process.env

if (!isString(PORT)) {
  console.log('Please provide a valid .env config')
  process.exit(0)
}

// Options passed to the Twitch client

const config: Config = {
  port: PORT,
}

export default config
