import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Heading, Text, Label, Caption } from '../../src/Typography'

expect.extend(toHaveNoViolations)

describe('Typography', () => {
  describe('Heading', () => {
    it('renders h1', () => {
      render(<Heading as="h1">Heading 1</Heading>)
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })

    it('renders h2', () => {
      render(<Heading as="h2">Heading 2</Heading>)
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('renders h3', () => {
      render(<Heading as="h3">Heading 3</Heading>)
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    })

    it('applies correct heading classes', () => {
      const { container } = render(<Heading as="h1">Title</Heading>)
      expect(container.querySelector('h1')).toHaveClass('text-2xl', 'font-bold')
    })
  })

  describe('Text', () => {
    it('renders paragraph text', () => {
      render(<Text>This is body text</Text>)
      expect(screen.getByText('This is body text')).toBeInTheDocument()
    })

    it('renders with correct text classes', () => {
      const { container } = render(<Text>Body text</Text>)
      expect(container.querySelector('p')).toHaveClass('text-base', 'leading-normal')
    })

    it('supports text color variants', () => {
      const { container } = render(<Text color="secondary">Colored text</Text>)
      expect(container.querySelector('p')).toHaveClass('text-gray-600')
    })
  })

  describe('Label', () => {
    it('renders form label', () => {
      render(<Label htmlFor="input">Input Label</Label>)
      expect(screen.getByText('Input Label')).toBeInTheDocument()
    })

    it('applies label styling', () => {
      const { container } = render(<Label>Label</Label>)
      expect(container.querySelector('label')).toHaveClass('text-sm', 'font-medium')
    })

    it('links to input with htmlFor', () => {
      const { getByLabelText } = render(
        <>
          <Label htmlFor="name">Name</Label>
          <input id="name" />
        </>
      )
      expect(getByLabelText('Name')).toBeInTheDocument()
    })
  })

  describe('Caption', () => {
    it('renders caption text', () => {
      render(<Caption>This is a caption</Caption>)
      expect(screen.getByText('This is a caption')).toBeInTheDocument()
    })

    it('applies caption styling', () => {
      const { container } = render(<Caption>Caption</Caption>)
      expect(container.querySelector('span')).toHaveClass('text-xs', 'text-gray-500')
    })
  })

  describe('Accessibility', () => {
    it('heading passes a11y check', async () => {
      const { container } = render(<Heading as="h1">Accessible Heading</Heading>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('text passes a11y check', async () => {
      const { container } = render(<Text>Accessible text</Text>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('label passes a11y check', async () => {
      const { container } = render(<Label htmlFor="input">Label</Label>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('caption passes a11y check', async () => {
      const { container } = render(<Caption>Caption</Caption>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
