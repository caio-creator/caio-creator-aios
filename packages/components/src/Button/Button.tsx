import React, { forwardRef } from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const variantClasses = {
  primary: 'bg-primary-500 hover:bg-primary-900 text-white',
  secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white',
  danger: 'bg-danger-500 hover:bg-danger-600 text-white',
}

const sizeClasses = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    const baseClasses = 'font-sans font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
    const variantClass = variantClasses[variant]
    const sizeClass = sizeClasses[size]
    const disabledClass = isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

    const combinedClassName = `${baseClasses} ${variantClass} ${sizeClass} ${disabledClass} ${className || ''}`.trim()

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={combinedClassName}
        {...props}
      >
        {loading && (
          <span className="inline-block mr-2 animate-spin">
            <svg
              className="w-4 h-4 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
