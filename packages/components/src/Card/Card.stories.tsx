import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined'],
    },
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default Card',
    variant: 'default',
    padding: 'md',
  },
}

export const Outlined: Story = {
  args: {
    children: 'Outlined Card',
    variant: 'outlined',
    padding: 'md',
  },
}

export const WithContent: Story = {
  args: {
    variant: 'default',
    padding: 'md',
  },
  render: () => (
    <Card variant="default" padding="md" style={{ maxWidth: '400px' }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
        Card Title
      </h3>
      <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
        This is a card with more detailed content. It demonstrates how the card component
        works with longer text content and multiple elements.
      </p>
      <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>
        Additional information or metadata can be displayed here.
      </p>
    </Card>
  ),
}

export const PaddingSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
          Small Padding
        </p>
        <Card padding="sm" variant="default">
          Small padding card
        </Card>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
          Medium Padding
        </p>
        <Card padding="md" variant="default">
          Medium padding card
        </Card>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
          Large Padding
        </p>
        <Card padding="lg" variant="default">
          Large padding card
        </Card>
      </div>
    </div>
  ),
}

export const Interactive: Story = {
  args: {
    variant: 'default',
    padding: 'md',
  },
  render: (args: Record<string, unknown>) => (
    <Card
      {...args}
      style={{
        maxWidth: '400px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = ''
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
        Interactive Card
      </h3>
      <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
        Hover over this card to see the interactive effect with elevation and transform.
      </p>
    </Card>
  ),
}
