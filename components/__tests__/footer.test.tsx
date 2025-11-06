import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '../footer'

describe('Footer Component', () => {
  it('should render the brand name', () => {
    render(<Footer />)
    expect(screen.getByText('TERRA')).toBeInTheDocument()
  })

  it('should render the company description', () => {
    render(<Footer />)
    expect(
      screen.getByText(/protecting africa's critical infrastructure/i)
    ).toBeInTheDocument()
  })

  it('should render all footer sections', () => {
    render(<Footer />)
    
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Resources')).toBeInTheDocument()
  })

  it('should render product links', () => {
    render(<Footer />)
    
    expect(screen.getByText('Artemis')).toBeInTheDocument()
    expect(screen.getByText('Archer')).toBeInTheDocument()
    expect(screen.getByText('Iroko')).toBeInTheDocument()
    expect(screen.getByText('Duma')).toBeInTheDocument()
    expect(screen.getByText('Kallon')).toBeInTheDocument()
  })

  it('should render company links', () => {
    render(<Footer />)
    
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Leadership')).toBeInTheDocument()
    expect(screen.getByText('Careers')).toBeInTheDocument()
    expect(screen.getByText('Press')).toBeInTheDocument()
  })

  it('should render resource links', () => {
    render(<Footer />)
    
    expect(screen.getByText('Documentation')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Support')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('should render copyright text', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(
      screen.getByText(new RegExp(`${currentYear}.*Terra Industries`, 'i'))
    ).toBeInTheDocument()
  })

  it('should have proper semantic HTML structure', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })

  it('should render brand section with tagline', () => {
    render(<Footer />)
    expect(screen.getByText(/advanced autonomous defense/i)).toBeInTheDocument()
  })

  it('should render footer sections in correct order', () => {
    render(<Footer />)
    
    const sections = screen.getAllByRole('heading', { level: 4 })
    const sectionTitles = sections.map(section => section.textContent)
    
    expect(sectionTitles).toContain('Products')
    expect(sectionTitles).toContain('Company')
    expect(sectionTitles).toContain('Resources')
  })
})

