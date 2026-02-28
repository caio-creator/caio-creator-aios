import React, { forwardRef } from 'react'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  as?: 'input'
  label?: string
  error?: boolean
  errorMessage?: string
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: 'textarea'
  label?: string
  error?: boolean
  errorMessage?: string
}

const baseInputClasses =
  'w-full px-3 py-2 text-base font-sans rounded-md transition-colors duration-200 focus:outline-none focus:ring-2'

const normalClasses = 'border border-gray-300 focus:border-primary-500 focus:ring-primary-500'
const errorClasses = 'border border-danger-500 focus:border-danger-500 focus:ring-danger-500'
const disabledClasses = 'bg-gray-100 opacity-50 cursor-not-allowed'

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps | TextareaProps>(
  (props, ref) => {
    const {
      as = 'input',
      label,
      error = false,
      errorMessage,
      disabled = false,
      className,
      id,
      ...restProps
    } = props

    const isTextarea = as === 'textarea'
    const inputType = !isTextarea ? (props as InputProps).type || 'text' : undefined
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const stateClasses = error ? errorClasses : normalClasses
    const disabledClass = disabled ? disabledClasses : ''

    const combinedClassName = `${baseInputClasses} ${stateClasses} ${disabledClass} ${className || ''}`.trim()

    const commonProps = {
      id: inputId,
      disabled,
      className: combinedClassName,
    }

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        {isTextarea ? (
          <textarea
            ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
            rows={(props as TextareaProps).rows || 4}
            {...commonProps}
            {...(restProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.ForwardedRef<HTMLInputElement>}
            type={inputType}
            {...commonProps}
            {...(restProps as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && errorMessage && (
          <p className="text-sm text-danger-500 mt-1">{errorMessage}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
