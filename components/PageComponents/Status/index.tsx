'use client'

import Button from '@/components/Micro/Button'
import SideInfo from '@/components/Micro/SideInfo'
import { useOrderData } from '@/lib/Store/useStore'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {}



const StatusComponent = (props: Props) => {
  const { deliveryMethod, paymentMethod, orderData, totalAmount } = useOrderData()
  const router = useRouter()
  const generateRandomOrderStatus = () => {
    const status = ['success', 'error']
    return status[Math.floor(Math.random() * status.length)]
  }
  let orderStatus = generateRandomOrderStatus()
  useEffect(() => {
    if (!deliveryMethod || !paymentMethod || !orderData || !totalAmount) {
      router.push('/')
    }
  }
    , [])


  return (
    <div className='w-full px-[5%]'>
      <p className='w-full font-medium text-[5vw] md:text-[2vw] mt-[5vh] '>
        Order Status -
        <span className={
          orderStatus === 'success' ? 'text-pri' : 'text-[#FF0000]'
        }>
          {" " + orderStatus.toUpperCase()}
        </span>
      </p>
      <div className='w-full my-[5vh] justify-between md:flex-row flex-col flex gap-[1rem]'>
        <div className='md:w-[70%] flex flex-col gap-[2vh] w-full bg-white rounded-xl border p-[3%]'>
          <div className='w-full flex justify-between'>
            <p className='font-medium'>Order ID</p>
            <p className='font-light'>{
              orderData?.id?.value
            }</p>
          </div>
          <div className='w-full flex justify-between'>
            <p className='font-medium'>Delivery Method</p>
            <p className='font-light'>{deliveryMethod}</p>
          </div>
          <div className='w-full flex justify-between'>
            <p className='font-medium'>Payment Method</p>
            <p className='font-light'>{paymentMethod}</p>
          </div>
          <div className='w-full flex justify-between'>
            <p className='font-medium'>Order Status</p>
            <p className='font-light'>{orderStatus.toUpperCase()}</p>
          </div>
          <div className='w-full flex justify-between'>
            <p className='font-medium'>Total Price</p>
            <p className='font-light'>
              ₹ {totalAmount}
            </p>
          </div>
          <div className='w-full my-[5vh] flex justify-between'>
            <Button onClick={() => {
              console.log('clicked')
              if (orderStatus === 'success') {
                router.push('/')
              } else {
                orderStatus = 'error'
              }
            }} className='w-full'>
              {
                orderStatus === 'success' ? 'Close' : 'Try Again'
              }
            </Button>
          </div>
          <p className='w-full text-center font-medium text-[5vw] md:text-[1.5vw] '>
            {
              orderStatus === 'success' ? 'Your order has been placed successfully' : 'There was an error placing your order, please try again later.'
            }
          </p>
        </div>
        <SideInfo />
      </div>
    </div>
  )
}

export default StatusComponent