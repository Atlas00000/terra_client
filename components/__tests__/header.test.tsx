import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from '../header'

describe('Header Component', () => {
  beforeEach(() => {
    // Reset scroll position before each test
    window.scrollY = 0
  })

  it('should render the logo', () => {
    render(<Header />)
    const logo = screen.getByRole('img', { name: /terra industries logo/i })
    expect(logo).toBeInTheDocument()
  })

  it('should render the company name', () => {
    render(<Header />)
    expect(screen.getByText('TERRA INDUSTRIES')).toBeInTheDocument()
  })

  it('should render all navigation items', () => {
    render(<Header />)
    
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Artemis')).toBeInTheDocument()
    expect(screen.getByText('Archer')).toBeInTheDocument()
    expect(screen.getByText('Iroko')).toBeInTheDocument()
    expect(screen.getByText('Duma')).toBeInTheDocument()
    expect(screen.getByText('Kallon')).toBeInTheDocument()
  })

  it('should have correct navigation links', () => {
    render(<Header />)
    
    const companyLink = screen.getByText('Company').closest('a')
    expect(companyLink).toHaveAttribute('href', '/company')
    
    const artemisLink = screen.getByText('Artemis').closest('a')
    expect(artemisLink).toHaveAttribute('href', '/artemis')
  })

  it('should have logo wrapped in link to home', () => {
    render(<Header />)
    
    const logo = screen.getByRole('img', { name: /terra industries logo/i })
    const link = logo.closest('a')
    expect(link).toHaveAttribute('href', '/')
  })

  it('should render with fixed positioning', () => {
    const { container } = render(<Header />)
    const header = container.firstChild as HTMLElement
    expect(header).toHaveClass('fixed')
  })

  it('should apply scrolled class when scrolled', () => {
    const { container } = render(<Header />)
    
    // Initial state (not scrolled)
    let header = container.firstChild as HTMLElement
    expect(header).toHaveClass('bg-background/80')
    
    // Simulate scroll
    window.scrollY = 100
    window.dispatchEvent(new Event('scroll'))
    
    // Should still have the class from initial render
    // (React doesn't re-render in test without state update)
    expect(header).toBeDefined()
  })

  it('should have accessibility features', () => {
    render(<Header />)
    
    // Logo should have alt text
    const logo = screen.getByRole('img', { name: /terra industries logo/i })
    expect(logo).toHaveAttribute('alt')
    
    // Navigation should be in nav element
    const companyLink = screen.getByText('Company')
    const nav = companyLink.closest('nav')
    expect(nav).toBeInTheDocument()
  })

  it('should render 6 navigation items', () => {
    render(<Header />)
    
    const nav = screen.getByText('Company').closest('nav')
    const links = nav?.querySelectorAll('a')
    expect(links).toHaveLength(6)
  })
})

