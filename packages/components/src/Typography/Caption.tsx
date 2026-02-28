import React from 'react'

export interface CaptionProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export const Caption = React.forwardRef<HTMLSpanElement, CaptionProps>(
  ({ className, children, ...props }, ref) => {
    const baseClasses = 'text-xs text-gray-500'
    const combinedClassName = `${baseClasses} ${className || ''}`.trim()

    return (
      <span ref={ref} className={combinedClassName} {...props}>
        {children}
      </span>
    )
  }
)

Caption.displayName = 'Caption'
