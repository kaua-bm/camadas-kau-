import type { Request, Response, NextFunction } from 'express'
import { CompanyService } from '../services/company.service'
import { companyDTO } from '../dtos/company.dto'

export class CompanyController {
  constructor(private service: CompanyService) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this.service.findAll())
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this.service.findById(Number(req.params.id)))
    } catch (error) {
      next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = companyDTO(req.body)
      const created = await this.service.create(dto)
      res.status(201).json(created)
    } catch (error) {
      next(error)
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.remove(Number(req.params.id))
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}
