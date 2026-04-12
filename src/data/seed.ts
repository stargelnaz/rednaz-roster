import type { Person, Role, ServiceDate } from '../types'

/**
 * Display key generation logic:
 *   - Primary key: firstName
 *   - Collision → firstName + last initial (e.g. "Scott S")
 *   - Still collides → firstName + last initial + number (e.g. "Scott S2")
 */
export function buildDisplayKey(
  firstName: string,
  lastName: string | undefined,
  existing: string[]
): string {
  if (!existing.includes(firstName)) return firstName
  const withInitial = lastName ? `${firstName} ${lastName[0]}` : firstName
  if (!existing.includes(withInitial)) return withInitial
  let n = 2
  while (existing.includes(`${withInitial}${n}`)) n++
  return `${withInitial}${n}`
}

export const PEOPLE: Person[] = [
  { id: 'Richard',  firstName: 'Richard',  email: 'richard@rednaz.net.au',  phone: '+61 412 345 001' },
  { id: 'Scott',    firstName: 'Scott',    email: 'scott@rednaz.net.au',    phone: '+61 423 456 002' },
  { id: 'Linda',    firstName: 'Linda',    email: 'linda@rednaz.net.au',    phone: '+61 434 567 003' },
  { id: 'Jacque',   firstName: 'Jacque',   email: 'jacque@rednaz.net.au',   phone: '+61 445 678 004' },
  { id: 'Lyn',      firstName: 'Lyn',      email: 'lyn@rednaz.net.au',      phone: '+61 456 789 005' },
  { id: 'Tish',     firstName: 'Tish',     email: 'tish@rednaz.net.au',     phone: '+61 467 890 006' },
  { id: 'Marie',    firstName: 'Marie',    email: 'marie@rednaz.net.au',    phone: '+61 478 901 007' },
  { id: 'Zoe',      firstName: 'Zoe',      email: 'zoe@rednaz.net.au',      phone: '+61 489 012 008' },
  { id: 'Mirriam',  firstName: 'Mirriam',  email: 'mirriam@rednaz.net.au',  phone: '+61 491 234 009' },
  { id: 'Evelyn',   firstName: 'Evelyn',   email: 'evelyn@rednaz.net.au',   phone: '+61 412 234 010' },
  { id: 'Reuben',   firstName: 'Reuben',   email: 'reuben@rednaz.net.au',   phone: '+61 423 345 011' },
  { id: 'Adriaan',  firstName: 'Adriaan',  email: 'adriaan@rednaz.net.au',  phone: '+61 434 456 012' },
  { id: 'Elaine',   firstName: 'Elaine',   email: 'elaine@rednaz.net.au',   phone: '+61 445 567 013' },
  { id: 'Jo',       firstName: 'Jo',       email: 'jo@rednaz.net.au',       phone: '+61 456 678 014' },
  { id: 'George',   firstName: 'George',   email: 'george@rednaz.net.au',   phone: '+61 467 789 015' },
]

export const ROLES: Role[] = [
  { id: 'preacher',       name: 'Preacher',        order: 1 },
  { id: 'worship-leader', name: 'Worship Leader',  order: 2 },
  { id: 'reader-1',       name: 'Reader 1',        order: 3 },
  { id: 'reader-2',       name: 'Reader 2',        order: 4 },
  { id: 'reader-3',       name: 'Reader 3',        order: 5 },
  { id: 'pianist',        name: 'Pianist',         order: 6 },
  { id: 'counter-1',      name: 'Counter 1',       order: 7 },
  { id: 'counter-2',      name: 'Counter 2',       order: 8 },
  { id: 'kitchen',        name: 'Kitchen',         order: 9 },
]

/** 14 Sundays: last Sunday, this Sunday, next 12 */
export const SERVICE_DATES: ServiceDate[] = [
  {
    date: '2026-04-05',
    assignments: {
      'preacher':       [{ personId: 'Richard', confirmed: true }],
      'worship-leader': [{ personId: 'Scott',   confirmed: true }],
      'reader-1':       [{ personId: 'Linda',   confirmed: true }],
      'reader-2':       [{ personId: 'Jacque',  confirmed: true }],
      'reader-3':       [{ personId: 'Lyn',     confirmed: true }],
      'pianist':        [{ personId: 'Marie',   confirmed: true }],
      'counter-1':      [{ personId: 'Reuben',  confirmed: true }],
      'counter-2':      [{ personId: 'Adriaan', confirmed: true }],
      'kitchen':        [{ personId: 'Evelyn',  confirmed: true }, { personId: 'Tish', confirmed: true }],
    },
  },
  {
    date: '2026-04-12',
    assignments: {
      'preacher':       [{ personId: 'George',  confirmed: true }],
      'worship-leader': [{ personId: 'Scott',   confirmed: true }],
      'reader-1':       [{ personId: 'Zoe',     confirmed: true }],
      'reader-2':       [{ personId: 'Jo',      confirmed: false }],
      'reader-3':       [{ personId: 'Mirriam', confirmed: true }],
      'pianist':        [{ personId: 'Marie',   confirmed: true }],
      'counter-1':      [{ personId: 'Elaine',  confirmed: true }],
      'counter-2':      [{ personId: 'Reuben',  confirmed: false }],
      'kitchen':        [{ personId: 'Linda',   confirmed: true }],
    },
  },
  {
    date: '2026-04-19',
    assignments: {
      'preacher':       [{ personId: 'Richard', confirmed: false }],
      'worship-leader': [{ personId: 'Scott',   confirmed: true }],
      'reader-1':       [{ personId: 'Jacque',  confirmed: true }],
      'reader-2':       [{ personId: 'Lyn',     confirmed: false }],
      'reader-3':       [{ personId: 'Elaine',  confirmed: true }],
      'pianist':        [{ personId: 'Marie',   confirmed: false }],
      'counter-1':      [{ personId: 'Adriaan', confirmed: true }],
      'counter-2':      [{ personId: 'George',  confirmed: false }],
      'kitchen':        [{ personId: 'Tish',    confirmed: true }, { personId: 'Evelyn', confirmed: true }],
    },
  },
  {
    date: '2026-04-26',
    assignments: {
      'preacher':       [{ personId: 'George',  confirmed: true }],
      'worship-leader': [{ personId: 'Scott',   confirmed: false }],
      'reader-1':       [{ personId: 'Jo',      confirmed: true }],
      'reader-2':       [{ personId: 'Mirriam', confirmed: true }],
      'reader-3':       [{ personId: 'Zoe',     confirmed: false }],
      'pianist':        [{ personId: 'Marie',   confirmed: true }],
      'counter-1':      [{ personId: 'Reuben',  confirmed: false }],
      'counter-2':      [{ personId: 'Richard', confirmed: true }],
      'kitchen':        [{ personId: 'Lyn',     confirmed: true }],
    },
  },
  {
    date: '2026-05-03',
    assignments: {
      'preacher':       [{ personId: 'Richard', confirmed: false }],
      'worship-leader': [{ personId: 'Scott',   confirmed: true }],
      'reader-1':       [{ personId: 'Linda',   confirmed: false }],
      'reader-2':       [{ personId: 'Elaine',  confirmed: true }],
      'reader-3':       [{ personId: 'Jacque',  confirmed: false }],
      'pianist':        [{ personId: 'Tish',    confirmed: true }],
      'counter-1':      [{ personId: 'Adriaan', confirmed: false }],
      'counter-2':      [{ personId: 'Reuben',  confirmed: true }],
      'kitchen':        [{ personId: 'Jo',      confirmed: false }, { personId: 'Mirriam', confirmed: false }],
    },
  },
  {
    date: '2026-05-10',
    assignments: {
      'preacher':       [{ personId: 'George',  confirmed: true }],
      'worship-leader': [{ personId: 'Scott',   confirmed: true }],
      'reader-1':       [{ personId: 'Zoe',     confirmed: false }],
      'reader-2':       [{ personId: 'Lyn',     confirmed: true }],
      'reader-3':       [{ personId: 'Jo',      confirmed: true }],
      'pianist':        [{ personId: 'Marie',   confirmed: false }],
      'counter-1':      [{ personId: 'Elaine',  confirmed: true }],
      'counter-2':      [{ personId: 'Adriaan', confirmed: false }],
      'kitchen':        [{ personId: 'Evelyn',  confirmed: true }],
    },
  },
  {
    date: '2026-05-17',
    assignments: {
      'preacher':       [{ personId: 'Richard', confirmed: true }],
      'worship-leader': [{ personId: 'Scott',   confirmed: false }],
      'reader-1':       [{ personId: 'Mirriam', confirmed: true }],
      'reader-2':       [{ personId: 'Jacque',  confirmed: false }],
      'reader-3':       [{ personId: 'Linda',   confirmed: true }],
      'pianist':        [{ personId: 'Marie',   confirmed: true }],
      'counter-1':      [{ personId: 'George',  confirmed: false }],
      'counter-2':      [{ personId: 'Reuben',  confirmed: true }],
      'kitchen':        [{ personId: 'Tish',    confirmed: false }],
    },
  },
  {
    date: '2026-05-24',
    assignments: {
      'preacher':       [{ personId: 'George',  confirmed: false }],
      'worship-leader': [{ personId: 'Scott',   confirmed: true }],
      'reader-1':       [{ personId: 'Elaine',  confirmed: true }],
      'reader-2':       [{ personId: 'Zoe',     confirmed: false }],
      'reader-3':       [{ personId: 'Lyn',     confirmed: true }],
      'pianist':        [{ personId: 'Tish',    confirmed: false }],
      'counter-1':      [{ personId: 'Adriaan', confirmed: true }],
      'counter-2':      [{ personId: 'Richard', confirmed: false }],
      'kitchen':        [{ personId: 'Jo',      confirmed: true }, { personId: 'Linda', confirmed: true }],
    },
  },
  {
    date: '2026-05-31',
    assignments: {
      'preacher':       [{ personId: 'Richard', confirmed: true }],
      'worship-leader': [{ personId: 'Scott',   confirmed: false }],
      'reader-1':       [{ personId: 'Jo',      confirmed: false }],
      'reader-2':       [{ personId: 'Linda',   confirmed: true }],
      'reader-3':       [{ personId: 'Mirriam', confirmed: true }],
      'pianist':        [{ personId: 'Marie',   confirmed: false }],
      'counter-1':      [{ personId: 'Reuben',  confirmed: true }],
      'counter-2':      [{ personId: 'Elaine',  confirmed: false }],
      'kitchen':        [{ personId: 'Evelyn',  confirmed: true }, { personId: 'Lyn', confirmed: true }],
    },
  },
  {
    date: '2026-06-07',
    assignments: {
      'preacher':       [{ personId: 'George',  confirmed: true }],
      'worship-leader': [{ personId: 'Scott',   confirmed: true }],
      'reader-1':       [{ personId: 'Jacque',  confirmed: false }],
      'reader-2':       [{ personId: 'Mirriam', confirmed: true }],
      'reader-3':       [{ personId: 'Zoe',     confirmed: false }],
      'pianist':        [{ personId: 'Marie',   confirmed: true }],
      'counter-1':      [{ personId: 'Adriaan', confirmed: false }],
      'counter-2':      [{ personId: 'Reuben',  confirmed: true }],
      'kitchen':        [{ personId: 'Tish',    confirmed: true }],
    },
  },
  {
    date: '2026-06-14',
    assignments: {
      'preacher':       [{ personId: 'Richard', confirmed: false }],
      'worship-leader': [{ personId: 'Scott',   confirmed: true }],
      'reader-1':       [{ personId: 'Lyn',     confirmed: true }],
      'reader-2':       [{ personId: 'Jo',      confirmed: false }],
      'reader-3':       [{ personId: 'Elaine',  confirmed: true }],
      'pianist':        [{ personId: 'Tish',    confirmed: false }],
      'counter-1':      [{ personId: 'George',  confirmed: true }],
      'counter-2':      [{ personId: 'Adriaan', confirmed: false }],
      'kitchen':        [{ personId: 'Mirriam', confirmed: true }, { personId: 'Jacque', confirmed: true }],
    },
  },
  {
    date: '2026-06-21',
    assignments: {
      'preacher':       [{ personId: 'George',  confirmed: true }],
      'worship-leader': [{ personId: 'Scott',   confirmed: false }],
      'reader-1':       [{ personId: 'Linda',   confirmed: true }],
      'reader-2':       [{ personId: 'Zoe',     confirmed: true }],
      'reader-3':       [{ personId: 'Jacque',  confirmed: false }],
      'pianist':        [{ personId: 'Marie',   confirmed: true }],
      'counter-1':      [{ personId: 'Reuben',  confirmed: false }],
      'counter-2':      [{ personId: 'Elaine',  confirmed: true }],
      'kitchen':        [{ personId: 'Evelyn',  confirmed: false }],
    },
  },
  {
    date: '2026-06-28',
    assignments: {
      'preacher':       [{ personId: 'Richard', confirmed: true }],
      'worship-leader': [{ personId: 'Scott',   confirmed: true }],
      'reader-1':       [{ personId: 'Mirriam', confirmed: false }],
      'reader-2':       [{ personId: 'Lyn',     confirmed: true }],
      'reader-3':       [{ personId: 'Jo',      confirmed: false }],
      'pianist':        [{ personId: 'Marie',   confirmed: false }],
      'counter-1':      [{ personId: 'Adriaan', confirmed: true }],
      'counter-2':      [{ personId: 'George',  confirmed: true }],
      'kitchen':        [{ personId: 'Tish',    confirmed: false }, { personId: 'Linda', confirmed: false }],
    },
  },
  {
    date: '2026-07-05',
    assignments: {
      'preacher':       [{ personId: 'George',  confirmed: false }],
      'worship-leader': [{ personId: 'Scott',   confirmed: true }],
      'reader-1':       [{ personId: 'Elaine',  confirmed: false }],
      'reader-2':       [{ personId: 'Jacque',  confirmed: true }],
      'reader-3':       [{ personId: 'Zoe',     confirmed: true }],
      'pianist':        [{ personId: 'Tish',    confirmed: true }],
      'counter-1':      [{ personId: 'Reuben',  confirmed: false }],
      'counter-2':      [{ personId: 'Richard', confirmed: true }],
      'kitchen':        [{ personId: 'Jo',      confirmed: false }, { personId: 'Evelyn', confirmed: false }],
    },
  },
]

export const PEOPLE_MAP: Record<string, Person> = Object.fromEntries(
  PEOPLE.map((p) => [p.id, p])
)
