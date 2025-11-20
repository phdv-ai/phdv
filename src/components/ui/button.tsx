"use client"

import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline" | "legendary" | "danger"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center transition-colors disabled:opacity-50 disabled:pointer-events-none font-bold cursor-pointer"

    const variantStyles = {
      default: "bg-cyan-400 text-white hover:bg-cyan-500",
      ghost: "hover:bg-cyan-400/10 hover:text-cyan-400",
      outline: "border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white",
      legendary: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/50",
      danger: "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 shadow-lg shadow-red-500/50",
    }

    const sizeStyles = {
      default: "px-4 py-2 rounded-lg",
      sm: "px-3 py-1.5 rounded-md text-sm",
      lg: "px-6 py-3 rounded-lg text-lg",
      icon: "h-10 w-10 rounded-lg",
    }

    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
