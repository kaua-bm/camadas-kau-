import type { Request, Response, NextFunction } from 'express'
import { EmployeeService } from '../services/employee.service'
import { employeeDTO } from '../dtos/employee.dto'

export class EmployeeController {
  constructor(private service: EmployeeService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = employeeDTO(req.body)
      const created = await this.service.create(dto)
      res.status(201).json(created)
    } catch (error) {
      next(error)
    }
  }

  async findByCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await this.service.findByCompany(Number(req.params.id))
      res.json(list)
    } catch (error) {
      next(error)
    }
  }
}
