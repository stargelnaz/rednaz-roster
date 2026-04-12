export interface Person {
  id: string        // display key: first name, or "First L", or "First L2"
  firstName: string
  lastName?: string
  email: string
  phone: string
}

export interface Role {
  id: string
  name: string
  order: number
}

export interface Assignment {
  personId: string
  confirmed: boolean
}

export interface ServiceDate {
  date: string                              // YYYY-MM-DD
  assignments: Record<string, Assignment[]> // roleId → assignments
}

export type { }
