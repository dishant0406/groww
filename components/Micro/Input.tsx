'use client'

import React, { useState } from 'react'

type Props = {
  label?: string,
  name: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  value: string,
  type?: string,
  disabled?: boolean,
  className?: string,
  spaced?: boolean,
  inputClassName?: string,
  placeHolder?: string,
  errorString?: string,
  verificationRegex?: RegExp,
  setVerified?: (verified: boolean) => void
}

const Input = ({
  label,
  name,
  onChange,
  value,
  type = 'text',
  disabled = false,
  inputClassName,
  spaced = false,
  className,
  placeHolder = '',
  errorString,
  verificationRegex,
  setVerified: _setVerified
}: Props) => {
  const [verified, setVerified] = useState(true)
  return (
    <div className={
      `${className} w-full flex flex-col gap-[1vh] ${spaced ? 'mb-[3vh]' : ''}`
    }>
      {label && <label htmlFor={name} className='font-medium text-[3.5vw] md:text-[1.1vw]'>
        {label}
      </label>}
      <input
        autoComplete='off'
        placeholder={placeHolder}
        value={value}
        readOnly={disabled}
        onChange={
          (e) => {
            if (e.target.value !== '') {
              setVerified(verificationRegex ? verificationRegex.test(e.target.value) : true)
              _setVerified && _setVerified(verificationRegex ? verificationRegex.test(e.target.value) : true)
            } else {
              setVerified(true)
              _setVerified && _setVerified(true)
            }
            if (onChange) {
              onChange(e)
            }
          }
        }
        name={name} type={type} className={`${inputClassName} ${!verified ? 'border-red-500' : ''
          } w-full focus:outline-none p-[0.8rem] border rounded-xl`} />
      <p className={`text-red-500 ${(errorString && !verified) ? 'visible' : 'invisible'
        } text-[2.5vw] md:text-[0.8vw]`}>
        {(errorString && !verified) ? errorString : '_'}
      </p>
    </div>
  )
}

export default Input