import React, { forwardRef } from 'react'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const sizeClasses = {
  h1: 'text-2xl',
  h2: 'text-xl',
  h3: 'text-lg',
  h4: 'text-base',
  h5: 'text-sm',
  h6: 'text-xs',
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Component, className, children, ...props }, ref) => {
    const sizeClass = sizeClasses[Component]
    const baseClasses = 'font-bold leading-tight text-gray-900'
    const combinedClassName = `${baseClasses} ${sizeClass} ${className || ''}`.trim()

    return React.createElement(
      Component,
      {
        ref,
        className: combinedClassName,
        ...props,
      },
      children
    )
  }
)

Heading.displayName = 'Heading'
