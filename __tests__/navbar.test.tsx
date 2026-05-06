import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Navbar from '@/components/layout/navbar'

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Navbar Component', () => {
  it('renders the logo and links', () => {
    render(<Navbar />)
    expect(screen.getByText(/meta/i)).toBeTruthy()
    expect(screen.getByText(/meal/i)).toBeTruthy()
    expect(screen.getByText('Analyze')).toBeTruthy()
    expect(screen.getByText('Compare')).toBeTruthy()
  })
})
