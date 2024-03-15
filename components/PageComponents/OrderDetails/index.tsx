'use client'

import Button from '@/components/Micro/Button'
import ProductItem from '@/components/Micro/ProductItem'
import SideInfo from '@/components/Micro/SideInfo'
import { useStore, useStoreActions } from '@/lib/Store/useStore'
import { RefreshCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'



const OrderDetails = () => {
  const { setStore, store: data } = useStore()
  const { removeAllProducts } = useStoreActions()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const handleRefreshData = async () => {
    try {
      setLoading(true)
      const data: StoreData = await fetch('https://groww-intern-assignment.vercel.app/v1/api/order-details').then(e => e.json())
      setStore(data)
      localStorage.setItem('store', JSON.stringify(data))
    } catch (e) {
      toast.error('Failed to refresh data, please try again later', {
        position: 'top-right',
        important: true
      })
    } finally {
      setLoading(false)
    }
  }

  const totalPrice = data?.products?.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)
  const disabled = data?.products?.length === 0 || !data?.products || Number(totalPrice) <= 100

  useEffect(() => {
    const localData = localStorage.getItem('store')
    if (localData) {
      setStore(JSON.parse(localData))
    } else {
      handleRefreshData()
    }
  }, [])

  return (
    <div className='w-full px-[5%]'>
      <button onClick={handleRefreshData} className='p-[0.8rem] fixed top-[2vh] right-[2vw] bg-pri text-white rounded-full'>
        <RefreshCcw className={
          loading ? 'animate-spin' : ''
        } />
      </button>
      <p className='w-full font-medium text-[5vw] md:text-[2vw] mt-[5vh] '>
        Cart
      </p>
      <div className='w-full my-[5vh] justify-between md:flex-row flex-col flex gap-[1rem]'>
        <div className='md:w-[70%] w-full bg-white rounded-xl border p-[7%] md:p-[3%]'>
          <div className='w-full flex items-center md:items-end justify-between'>
            <p className=' font-medium text-[4vw] md:text-[1.5vw]'>
              In your cart
              <span className='text-pri'> {data?.products?.length} products</span>
            </p>
            {data?.products?.length > 0 && <button onClick={removeAllProducts} className=' font-medium text-[3vw] md:text-[1vw]'>
              <span className='text-pri'>Remove all</span>
            </button>}
          </div>
          <div className='w-full flex flex-col gap-[3vh] mt-[5vh]'>
            {
              data?.products?.map((product) => {
                return (
                  <ProductItem key={product.id} product={product} />
                )
              })
            }
          </div>
          {
            data?.products?.length === 0 && (
              <p className='w-ful text-center font-medium text-[4vw] md:text-[1.5vw] my-[5vh] '>
                {
                  loading ? 'Loading products...' : 'No products in cart'
                }
              </p>
            )
          }
          <div className='w-full mt-[5vh] flex gap-[1vw] items-end'>
            <div className='w-full md:w-[50%]'>
              <p className='font-medium text-[3.5vw] md:text-[1.1vw]'>
                Do you have a coupon?
              </p>
              <input type='text' className='w-full focus:outline-none mt-[1vh] p-[0.8rem] border rounded-xl' />
            </div>
            <Button disabled >
              Apply
            </Button>
          </div>
          <div className='w-full border border-t my-[5vh]' />
          <div className='w-full md:gap-0 gap-[3vh] md:flex-row flex-col flex items-start md:items-center justify-between'>
            <div>
              <p className='font-medium text-[5vw] md:text-[1.5vw]'>
                ₹ {totalPrice}
              </p>
              <p className='font-medium opacity-50 text-[4vw] md:text-[1.1vw]'>
                Cost of products
              </p>
            </div>
            <div>
              <p className='font-medium text-[5vw] md:text-[1.5vw]'>
                - ₹ 0
              </p>
              <p className='font-medium opacity-50 text-[4vw] md:text-[1.1vw]'>
                Promo code
              </p>
            </div>
            <div>
              <p className='font-medium text-pri text-[5vw] md:text-[1.5vw]'>
                ₹ {totalPrice}
              </p>
              <p className='font-medium opacity-50 text-[4vw] md:text-[1.1vw]'>
                Total
              </p>
            </div>
            <Button onClick={() => {
              if (disabled) {
                toast.error('Minimum amount of ₹ 100 is required to place an order, you can add more products to place an order', {
                  position: 'top-right',
                  important: true
                })
                return
              }

              router.push('/checkout')
            }} className='w-full md:!w-[40%]'>
              Checkout
            </Button>
          </div>
        </div>
        <SideInfo />
      </div>
    </div>
  )
}

export default OrderDetails