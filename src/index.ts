import { Knex } from 'knex'
import { v4 } from 'uuid'

export * from './connection'

export const timestamps = (table: Knex.CreateTableBuilder) => {
  table.timestamp('createdAt').notNullable()
  table.timestamp('updatedAt').notNullable()
}

export const id = (table: Knex.CreateTableBuilder) => {
  table.uuid('id').primary().notNullable()
}

export const uuid = v4

export type Result<T> = T

export type BaseDto<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>

export abstract class Entity {
  public static schema: TEntity | Record<string, any>

  constructor(
    public createdAt: Date,
    public updatedAt: Date,
    public id: string,
  ) {}
}


export class TEntity {
  id: 'id'
  all: '*'
  tableName: string
  createdAt: string
  updatedAt: string
}

export const Table = (name) => (target: unknown) => {
  target['schema'] = target['schema'] || {}
  target['schema']['tableName'] = name
  target['schema']['id'] = 'id'
  target['schema']['createdAt'] = 'createdAt'
  target['schema']['updatedAt'] = 'updatedAt'
  target['schema']['all'] = '*'
}

export const Column = (name: string) => (
  target: Entity,
  _propertyKey,
  _parameterIndex,
) => {
  target['schema'] = target['schema'] || {}
  target['schema'][name] = name
}
