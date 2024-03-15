import { Gift, HandCoins, Truck } from 'lucide-react'
import React from 'react'

type Props = {}

const SideInfo = (props: Props) => {
  return (
    <div className='w-full md:w-[25%] flex flex-col gap-[5vh]'>
      <div className='w-full flex flex-col gap-[1vh] bg-white rounded-xl border p-[5%]'>
        <div className='w-full flex gap-[5%] items-center'>
          <Truck />
          <p className='font-medium text-[4vw] md:text-[1.1vw]'>
            Courier delivery across country
          </p>
        </div>
        <p className='font-medium opacity-50 text-[3.5vw] md:text-[1vw]'>
          Currently we can send all the orders across country to all regions and cities
        </p>
      </div>
      <div className='w-full flex flex-col gap-[1vh] bg-white rounded-xl border p-[5%]'>
        <div className='w-full flex gap-[5%] items-center'>
          <Gift />
          <p className='font-medium text-[4vw] md:text-[1.1vw]'>
            Free Shipping
          </p>
        </div>
        <p className='font-medium opacity-50 text-[3.5vw] md:text-[1vw]'>
          Get free shipping on all orders above ₹ 1000, no promo code required
        </p>
      </div>
      <div className='w-full flex flex-col gap-[1vh] bg-white rounded-xl border p-[5%]'>
        <div className='w-full flex gap-[5%] items-center'>
          <HandCoins />
          <p className='font-medium text-[4vw] md:text-[1.1vw]'>
            Minimum amount limit
          </p>
        </div>
        <p className='font-medium opacity-50 text-[3.5vw] md:text-[1vw]'>
          Minimum amount of ₹ 100 is required to place an order, you can add more products to place an order
        </p>
      </div>
    </div>
  )
}

export default SideInfo