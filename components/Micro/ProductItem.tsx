import { useStoreActions } from '@/lib/Store/useStore'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {
  product: Product
}

const ProductItem = ({
  product
}: Props) => {
  const { decrease, deleteProduct, increase } = useStoreActions()

  return (
    <div key={product.id} className='w-full md:gap-0 gap-[2vh] md:flex-row flex-col flex border rounded-xl p-[1rem]'>
      <div className='flex w-full md:w-[60%] items-center gap-[1rem]'>
        <Image src={
          product.image
        } alt={product.title} className={
          'w-[20%] h-[7vh] object-contain '
        } width={100} height={100} />
        <div className='flex w-[80%] gap-[0.5rem] flex-col justify-between'>
          <p className='font-medium text-[3.5vw] md:text-[1.1vw]'>
            {product.title}
          </p>
          <p className={`font-medium ${product.price > 100 ? 'text-pri' : 'text-[#dd1a59]'
            } text-[4vw] md:text-[1.3vw]`}>
            ₹ {product.price}
          </p>
        </div>
      </div>
      <div className='md:w-[40%] w-full md:gap-[5%] gap-[1vh] flex justify-end items-center'>
        <div className='md:w-[40%] w-full flex p-[0.8rem] border rounded-xl'>
          <button onClick={() => {
            decrease(product.id)
          }} className='w-[20%] font-medium text-[3.5vw] md:text-[1.2vw]'>-</button>
          <p className='w-[60%] font-medium text-[3.5vw] md:text-[1.2vw] text-center'>
            {product.quantity}
          </p>
          <button onClick={() => {
            increase(product.id)
          }} className='w-[20%] font-medium text-[3.5vw] md:text-[1.2vw]'>+</button>
        </div>
        <button onClick={() => {
          deleteProduct(product.id)
        }} className='p-[0.8rem] bg-pri text-white rounded-xl'>
          <Trash />
        </button>
      </div>
    </div>
  )
}

export default ProductItem