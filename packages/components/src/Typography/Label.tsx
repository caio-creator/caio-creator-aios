import React from 'react'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, ...props }, ref) => {
    const baseClasses = 'text-sm font-medium text-gray-700'
    const combinedClassName = `${baseClasses} ${className || ''}`.trim()

    return (
      <label ref={ref} className={combinedClassName} {...props}>
        {children}
      </label>
    )
  }
)

Label.displayName = 'Label'
