import type { InputHTMLAttributes } from 'react'

const inputClassName =
  'w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3.5 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600 outline-none transition-colors focus:border-zinc-600 focus:bg-zinc-900'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className = '', ...props }: InputProps) {
  return <input className={`${inputClassName} ${className}`.trim()} {...props} />
}

export { inputClassName }
