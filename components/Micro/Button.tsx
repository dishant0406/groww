import React from 'react'

type Props = {
  children: React.ReactNode,
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
  disabled?: boolean,
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({
  children,
  className,
  onClick,
  disabled = false,
  type = 'button'
}: Props) => {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={` ${className || ''} bg-pri disabled:opacity-50 text-white p-[0.8rem] px-[1.5rem] w-fit rounded-xl `}>
      {children}
    </button>
  )
}

export default Button