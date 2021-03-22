/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
describe('config', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  test('exits on missing or non-string PORT', () => {
    const exitMsg = 'mock process.exit(0)'
    const logSpy = jest.spyOn(global.console, 'log')
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error(exitMsg)
    })

    // PORT check

    process.env.PORT = undefined

    try {
      require('../../src/config').default
    } catch (e) {
      expect((e as Error).message).toBe(exitMsg)
    }

    expect(logSpy).toBeCalledTimes(1)
    expect(logSpy).toBeCalledWith('Please provide a valid .env config')

    expect(exitSpy).toBeCalledTimes(1)
    expect(exitSpy).toBeCalledWith(0)
  })

  test('exits on missing or non-string DB_URL', () => {
    const exitMsg = 'mock process.exit(0)'
    const logSpy = jest.spyOn(global.console, 'log')
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error(exitMsg)
    })

    // PORT check

    process.env.DB_URL = undefined

    try {
      require('../../src/config').default
    } catch (e) {
      expect((e as Error).message).toBe(exitMsg)
    }

    expect(logSpy).toBeCalledTimes(1)
    expect(logSpy).toBeCalledWith('Please provide a valid .env config')

    expect(exitSpy).toBeCalledTimes(1)
    expect(exitSpy).toBeCalledWith(0)
  })

  test('returns valid config', () => {
    const port = '8001'
    const dbUrl = 'test URL'

    process.env.PORT = port
    process.env.DB_URL = dbUrl

    const config = require('../../src/config').default
    const configCheck = {
      port: port,
      database: {
        url: dbUrl,
      },
    }

    expect(config).toStrictEqual(configCheck)
  })
})
