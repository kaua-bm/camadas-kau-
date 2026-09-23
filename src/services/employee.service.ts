import { NotFound, RuleViolation } from '../errors'
import type { Employee, NewEmployee } from '../types'
import type { EmployeeRepository } from '../repositories/employee.repository'
import type { CompanyRepository } from '../repositories/company.repository'

const MINIMUM_WAGE = 1518
const INSS_RATE = 0.11

export class EmployeeService {
  constructor(
    private employees: EmployeeRepository,
    private companies: CompanyRepository
  ) {}

  async create(data: NewEmployee): Promise<Employee> {
    const company = this.companies.findById(data.companyId)
    if (!company) throw new NotFound('company')

    if (data.salary < MINIMUM_WAGE) throw new RuleViolation('salary below minimum wage')

    const netSalary = data.salary - data.salary * INSS_RATE

    return this.employees.save({
      name: data.name,
      email: data.email,
      grossSalary: data.salary,
      netSalary,
      companyId: data.companyId
    })
  }

  async findByCompany(companyId: number): Promise<Employee[]> {
    return this.employees.findByCompany(companyId)
  }
}
