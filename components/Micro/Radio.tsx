'use client'

import React, { useRef } from 'react'

type Props = {
  title?: string,
  subtitle?: string,
  checked?: boolean
  onCheck?: React.ChangeEventHandler<HTMLInputElement>,
  sideText?: string
}

const Radio = ({
  title,
  subtitle,
  checked,
  onCheck,
  sideText
}: Props) => {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div className='w-full flex justify-between'>
      <div className='flex gap-[2vw] md:gap-[1vw]'>
        <input
          ref={ref}
          checked={checked}
          onChange={onCheck}
          className='focus:outline-none accent-pri'
          type='radio'></input>
        <div onClick={() => {
          if (ref.current) {
            ref.current.click()
          }
        }} className='cursor-pointer flex flex-col'>
          <p className='text-[3vw] md:text-[1vw] font-medium'>
            {title}
          </p>
          <p className='text-[3vw] md:text-[1vw] opacity-50'>
            {subtitle}
          </p>
        </div>
      </div>
      <p className='text-[3.5vw] md:text-[1.1vw] font-medium'>
        {sideText}
      </p>
    </div>
  )
}

export default Radio