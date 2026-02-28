import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Input } from '../../src/Input'

expect.extend(toHaveNoViolations)

describe('Input', () => {
  describe('Rendering', () => {
    it('renders input field', () => {
      render(<Input placeholder="Enter text" />)
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('renders input with label', () => {
      render(<Input label="Email" type="email" />)
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
    })

    it('renders different input types', () => {
      const { rerender, container } = render(<Input type="text" />)
      expect(container.querySelector('input')).toHaveAttribute('type', 'text')

      rerender(<Input type="email" />)
      expect(container.querySelector('input')).toHaveAttribute('type', 'email')

      rerender(<Input type="password" />)
      expect(container.querySelector('input')).toHaveAttribute('type', 'password')
    })

    it('renders error state with message', () => {
      render(<Input error errorMessage="This field is required" />)
      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })

    it('renders disabled input', () => {
      render(<Input disabled placeholder="Disabled" />)
      expect(screen.getByPlaceholderText('Disabled')).toBeDisabled()
    })

    it('renders textarea', () => {
      render(<Input as="textarea" placeholder="Multi-line" />)
      expect(screen.getByPlaceholderText('Multi-line')).toHaveAttribute('rows', '4')
    })
  })

  describe('Interaction', () => {
    it('updates value on input change', async () => {
      const user = userEvent.setup()
      const { getByRole } = render(<Input type="text" />)
      const input = getByRole('textbox')

      await user.type(input, 'hello')
      expect(input).toHaveValue('hello')
    })

    it('calls onChange handler', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<Input onChange={onChange} />)

      await user.type(screen.getByRole('textbox'), 'test')
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Input label="Name" placeholder="Enter name" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
