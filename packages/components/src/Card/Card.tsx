import React, { forwardRef } from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined'
  padding?: 'sm' | 'md' | 'lg'
}

const variantClasses = {
  default: 'bg-white shadow-md rounded-lg',
  outlined: 'bg-white border border-gray-200 rounded-lg',
}

const paddingClasses = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const variantClass = variantClasses[variant]
    const paddingClass = paddingClasses[padding]

    const combinedClassName = `${variantClass} ${paddingClass} ${className || ''}`.trim()

    return (
      <div
        ref={ref}
        className={combinedClassName}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
