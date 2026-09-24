import { InvalidInput } from '../errors'
import type { NewCompany } from '../types'

// Valida apenas o FORMATO (nome, CNPJ e UF). Unicidade do CNPJ é regra de negócio.
export function companyDTO(body: unknown): NewCompany {
  const b = (body ?? {}) as Record<string, unknown>
  const invalid: string[] = []

  if (typeof b.name !== 'string' || b.name.trim().length < 3) invalid.push('name')
  if (typeof b.cnpj !== 'string' || !/^\d{14}$/.test(b.cnpj)) invalid.push('cnpj')
  if (typeof b.state !== 'string' || !/^[A-Za-z]{2}$/.test(b.state)) invalid.push('state')

  if (invalid.length > 0) throw new InvalidInput(invalid)

  return {
    name: (b.name as string).trim(),
    cnpj: b.cnpj as string,
    state: (b.state as string).toUpperCase()
  }
}
