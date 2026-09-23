import type { Database } from 'better-sqlite3'
import type { Employee } from '../types'

// Dados já calculados pelo service, prontos para gravar.
export interface EmployeeRecord {
  name: string
  email: string
  grossSalary: number
  netSalary: number
  companyId: number
}

export class EmployeeRepository {
  constructor(private db: Database) {}

  findById(id: number): Employee | undefined {
    return this.db
      .prepare('SELECT * FROM employees WHERE id = ?')
      .get(id) as Employee | undefined
  }

  findByCompany(companyId: number): Employee[] {
    return this.db
      .prepare('SELECT * FROM employees WHERE company_id = ?')
      .all(companyId) as Employee[]
  }

  save(data: EmployeeRecord): Employee {
    const result = this.db
      .prepare(
        `INSERT INTO employees (name, email, gross_salary, net_salary, company_id)
         VALUES (?, ?, ?, ?, ?)`
      )
      .run(data.name, data.email, data.grossSalary, data.netSalary, data.companyId)
    return this.findById(Number(result.lastInsertRowid)) as Employee
  }
}
