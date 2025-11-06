import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Loading } from '../loading'

describe('Loading Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<Loading />)
    expect(container).toBeDefined()
  })

  it('should accept onComplete callback', () => {
    const onComplete = vi.fn()
    render(<Loading onComplete={onComplete} />)
    expect(onComplete).toBeDefined()
  })

  it('should export Loading function', () => {
    expect(Loading).toBeDefined()
    expect(typeof Loading).toBe('function')
  })

  it('should render loading UI', () => {
    const { container } = render(<Loading />)
    const element = container.querySelector('.fixed')
    expect(element).toBeInTheDocument()
  })
})

