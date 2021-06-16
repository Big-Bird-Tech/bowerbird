jest.mock('knex', () => ({
  __esModule: true,
  default: jest.fn(() => ({}))
}))

import { expect } from 'chai'
import { mocked } from 'ts-jest/utils'
import { Connection } from '../src/connection'
import knex from 'knex'

describe('Connection', () => {
  let config,
      connection: Connection

  beforeEach(() => {
    config = { value: 'value' }
    connection = new Connection(config)
  })

  describe('#connect', () => {
    beforeEach(() => {
      connection.connect()
    })

    it('conects to the database defined in the config', () => {
      expect(mocked(knex).mock.calls[0]).to.have.length(1)
    })
  })

  describe('#connection', () => {
    describe('when it is called after the #connect method', () => {
      beforeEach(async () => {
        connection = new Connection(config)
        connection.connect()
      })

      it('returns the active connection', async () => {
        const activeConnection = await connection.use()
        expect(activeConnection).to.deep.equal(knex(config))
      })
    })

    describe('when the #connect method is not called', () => {
      beforeEach(async () => {
        connection = new Connection(config)
      })

      it('returns the active connection', () => {
        return connection.use().catch(error => {
          expect(error).to.be.ok
        })
      })
    })
  })
})
