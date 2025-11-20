"use client"

import * as React from "react"

interface SwitchProps {
  defaultChecked?: boolean
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export function Switch({
  defaultChecked = false,
  checked: controlledChecked,
  onCheckedChange,
  disabled = false,
  className = ""
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked)

  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked

  const handleToggle = () => {
    if (disabled) return

    const newValue = !isChecked

    if (controlledChecked === undefined) {
      setInternalChecked(newValue)
    }

    onCheckedChange?.(newValue)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={handleToggle}
      className={`
        relative inline-flex h-6 w-11 shrink-0 items-center rounded-full
        transition-colors duration-200 ease-in-out
        ${isChecked ? "bg-cyan-400" : "bg-gray-600"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      <span
        className={`
          inline-block h-5 w-5 rounded-full bg-white shadow-lg
          transition-transform duration-200 ease-in-out
          ${isChecked ? "translate-x-5" : "translate-x-0.5"}
        `}
      />
    </button>
  )
}
