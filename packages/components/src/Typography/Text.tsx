import React, { forwardRef } from 'react'

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: 'primary' | 'secondary' | 'muted'
}

const colorClasses = {
  primary: 'text-gray-900',
  secondary: 'text-gray-600',
  muted: 'text-gray-400',
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ color = 'primary', className, children, ...props }, ref) => {
    const colorClass = colorClasses[color]
    const baseClasses = 'text-base leading-normal'
    const combinedClassName = `${baseClasses} ${colorClass} ${className || ''}`.trim()

    return (
      <p ref={ref} className={combinedClassName} {...props}>
        {children}
      </p>
    )
  }
)

Text.displayName = 'Text'
