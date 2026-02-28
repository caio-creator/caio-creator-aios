import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from './Heading'
import { Text } from './Text'
import { Label } from './Label'
import { Caption } from './Caption'

const meta = {
  title: 'Typography',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

export default meta

// Heading Stories
export const H1: StoryObj = {
  render: () => <Heading as="h1">Heading Level 1</Heading>,
}

export const H2: StoryObj = {
  render: () => <Heading as="h2">Heading Level 2</Heading>,
}

export const H3: StoryObj = {
  render: () => <Heading as="h3">Heading Level 3</Heading>,
}

// Text Story
export const BodyText: StoryObj = {
  render: () => (
    <Text>
      This is body text. It should be easily readable and provide clear communication to users. The default text color is primary (dark gray).
    </Text>
  ),
}

// Label Story
export const FormLabel: StoryObj = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="username">Username</Label>
      <input id="username" type="text" placeholder="Enter username" className="px-3 py-2 border border-gray-300 rounded" />
    </div>
  ),
}

// Caption Story
export const CaptionText: StoryObj = {
  render: () => <Caption>This is a small caption text for additional information or helper text</Caption>,
}

// Text Colors Story
export const TextColors: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <Text color="primary">Primary text - main content</Text>
      <Text color="secondary">Secondary text - less prominent</Text>
      <Text color="muted">Muted text - least prominent</Text>
    </div>
  ),
}

// All Headings Together
export const AllHeadings: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <Heading as="h1">Heading H1 - text-2xl</Heading>
      <Heading as="h2">Heading H2 - text-xl</Heading>
      <Heading as="h3">Heading H3 - text-lg</Heading>
      <Heading as="h4">Heading H4 - text-base</Heading>
      <Heading as="h5">Heading H5 - text-sm</Heading>
      <Heading as="h6">Heading H6 - text-xs</Heading>
    </div>
  ),
}

// Complete Typography System
export const TypographySystem: StoryObj = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Heading as="h1">Main Heading</Heading>
        <Caption>H1 - Largest heading size</Caption>
      </div>

      <div>
        <Heading as="h2">Section Heading</Heading>
        <Text>
          This is body text that follows a section heading. It provides detailed information and explanation to users.
        </Text>
      </div>

      <div>
        <Heading as="h3">Subsection</Heading>
        <Text color="secondary">Secondary text for less important information</Text>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <input
          id="email"
          type="email"
          placeholder="user@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        <Caption>We'll never share your email with anyone else.</Caption>
      </div>
    </div>
  ),
}
