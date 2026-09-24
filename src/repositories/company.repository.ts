import type { Database } from 'better-sqlite3'
import type { Company, NewCompany } from '../types'

export class CompanyRepository {
  constructor(private db: Database) {}

  findById(id: number): Company | undefined {
    return this.db
      .prepare('SELECT * FROM companies WHERE id = ?')
      .get(id) as Company | undefined
  }

  findByCnpj(cnpj: string): Company | undefined {
    return this.db
      .prepare('SELECT * FROM companies WHERE cnpj = ?')
      .get(cnpj) as Company | undefined
  }

  findAll(): Company[] {
    return this.db
      .prepare('SELECT * FROM companies ORDER BY name')
      .all() as Company[]
  }

  save(data: NewCompany): Company {
    const result = this.db
      .prepare('INSERT INTO companies (name, cnpj, state) VALUES (?, ?, ?)')
      .run(data.name, data.cnpj, data.state)
    return this.findById(Number(result.lastInsertRowid)) as Company
  }

  remove(id: number): void {
    this.db.prepare('DELETE FROM companies WHERE id = ?').run(id)
  }
}
