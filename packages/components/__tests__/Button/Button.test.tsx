import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from '../../src/Button'

expect.extend(toHaveNoViolations)

describe('Button', () => {
  describe('Rendering', () => {
    it('renders button with text', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('renders button with primary variant', () => {
      const { container } = render(<Button variant="primary">Primary</Button>)
      expect(container.querySelector('button')).toHaveClass('bg-primary-500')
    })

    it('renders button with secondary variant', () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>)
      expect(container.querySelector('button')).toHaveClass('bg-secondary-500')
    })

    it('renders button with danger variant', () => {
      const { container } = render(<Button variant="danger">Delete</Button>)
      expect(container.querySelector('button')).toHaveClass('bg-danger-500')
    })

    it('renders button with different sizes', () => {
      const { container: smContainer } = render(<Button size="sm">Small</Button>)
      expect(smContainer.querySelector('button')).toHaveClass('px-2', 'py-1')

      const { container: mdContainer } = render(<Button size="md">Medium</Button>)
      expect(mdContainer.querySelector('button')).toHaveClass('px-4', 'py-2')

      const { container: lgContainer } = render(<Button size="lg">Large</Button>)
      expect(lgContainer.querySelector('button')).toHaveClass('px-6', 'py-3')
    })

    it('renders disabled button', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('renders loading state', () => {
      render(<Button loading>Loading</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('Interaction', () => {
    it('calls onClick handler', () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Click</Button>)
      screen.getByRole('button').click()
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', () => {
      const handleClick = jest.fn()
      render(<Button disabled onClick={handleClick}>Disabled</Button>)
      screen.getByRole('button').click()
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Button>Accessible Button</Button>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', () => {
      render(<Button>Keyboard</Button>)
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })
  })
})
