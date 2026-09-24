import { NotFound, RuleViolation } from '../errors'
import type { Company, NewCompany } from '../types'
import type { CompanyRepository } from '../repositories/company.repository'
import type { EmployeeRepository } from '../repositories/employee.repository'

export class CompanyService {
  constructor(
    private companies: CompanyRepository,
    private employees: EmployeeRepository
  ) {}

  async findAll(): Promise<Company[]> {
    return this.companies.findAll()
  }

  async findById(id: number): Promise<Company> {
    const company = this.companies.findById(id)
    if (!company) throw new NotFound('company')
    return company
  }

  async create(data: NewCompany): Promise<Company> {
    // Regra primeiro, persistência depois.
    if (this.companies.findByCnpj(data.cnpj)) {
      throw new RuleViolation('CNPJ already registered')
    }
    return this.companies.save(data)
  }

  async remove(id: number): Promise<void> {
    const company = this.companies.findById(id)
    if (!company) throw new NotFound('company')

    if (this.employees.findByCompany(id).length > 0) {
      throw new RuleViolation('company still has employees')
    }
    this.companies.remove(id)
  }
}
