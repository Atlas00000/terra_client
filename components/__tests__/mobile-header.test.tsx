import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MobileHeader } from '../mobile-header'

describe('MobileHeader Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<MobileHeader />)
    expect(container).toBeDefined()
  })

  it('should export MobileHeader function', () => {
    expect(MobileHeader).toBeDefined()
    expect(typeof MobileHeader).toBe('function')
  })

  it('should be a valid React component', () => {
    const result = render(<MobileHeader />)
    expect(result).toBeDefined()
  })
})

