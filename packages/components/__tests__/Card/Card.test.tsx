import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Card } from '../../src/Card'

expect.extend(toHaveNoViolations)

describe('Card', () => {
  describe('Rendering', () => {
    it('renders card with children', () => {
      const { getByText } = render(<Card>Card content</Card>)
      expect(getByText('Card content')).toBeInTheDocument()
    })

    it('renders card with default variant', () => {
      const { container } = render(<Card variant="default">Default</Card>)
      expect(container.querySelector('div')).toHaveClass('bg-white', 'shadow-md')
    })

    it('renders card with outlined variant', () => {
      const { container } = render(<Card variant="outlined">Outlined</Card>)
      expect(container.querySelector('div')).toHaveClass('border', 'border-gray-200')
    })

    it('renders card with different padding sizes', () => {
      const { container: smContainer } = render(<Card padding="sm">Small</Card>)
      expect(smContainer.querySelector('div')).toHaveClass('p-3')

      const { container: mdContainer } = render(<Card padding="md">Medium</Card>)
      expect(mdContainer.querySelector('div')).toHaveClass('p-4')

      const { container: lgContainer } = render(<Card padding="lg">Large</Card>)
      expect(lgContainer.querySelector('div')).toHaveClass('p-6')
    })

    it('applies custom className', () => {
      const { container } = render(<Card className="custom-class">Custom</Card>)
      expect(container.querySelector('div')).toHaveClass('custom-class')
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Card>Accessible Card</Card>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
