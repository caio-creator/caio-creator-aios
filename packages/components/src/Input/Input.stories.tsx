import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    as: {
      control: 'select',
      options: ['input', 'textarea'],
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
}

export const Textarea: Story = {
  args: {
    as: 'textarea',
    placeholder: 'Enter multi-line text',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
  },
}

export const ErrorState: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter email',
    error: true,
    errorMessage: 'Please enter a valid email address',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    type: 'text',
    placeholder: 'This field is disabled',
    disabled: true,
  },
}
