import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn utility', () => {
  it('merges conditional classes', () => {
    const result = cn('p-2', false && 'hidden', 'text-sm')
    expect(result).toBe('p-2 text-sm')
  })

  it('deduplicates Tailwind conflicts keeping the last', () => {
    const result = cn('p-2', 'p-4')
    expect(result).toBe('p-4')
  })
})
