import { InvalidInput } from '../errors'
import type { NewEmployee } from '../types'

// Valida apenas o FORMATO. Regras de negócio ficam no service.
export function employeeDTO(body: unknown): NewEmployee {
  const b = (body ?? {}) as Record<string, unknown>
  const invalid: string[] = []

  if (typeof b.name !== 'string' || b.name.trim().length < 3) invalid.push('name')
  if (typeof b.email !== 'string' || !b.email.includes('@')) invalid.push('email')
  if (typeof b.salary !== 'number' || !Number.isFinite(b.salary)) invalid.push('salary')
  if (!Number.isInteger(b.companyId)) invalid.push('companyId')

  if (invalid.length > 0) throw new InvalidInput(invalid)

  return {
    name: (b.name as string).trim(),
    email: (b.email as string).trim(),
    salary: b.salary as number,
    companyId: b.companyId as number
  }
}
