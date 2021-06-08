import knex, { Knex } from "knex";

export class Connection {
  private activeConnection: Knex | null

  constructor(readonly config: Knex.Config) {}

  public connect() {
    this.activeConnection ||= knex(this.config)

    return this
  }

  public get use() {
    if (this.activeConnection) {
      return this.activeConnection
    }

    throw new Error('Not connected to the database, use new Connection(config).connect() first')
  }
}
