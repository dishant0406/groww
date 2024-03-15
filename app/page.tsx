import Button from '@/components/Micro/Button'
import SideInfo from '@/components/Micro/SideInfo'
import OrderDetails from '@/components/PageComponents/OrderDetails'
import { Gift, HandCoins, Trash, Truck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'




const Home = async () => {
  const data: StoreData = await fetch('https://groww-intern-assignment.vercel.app/v1/api/order-details', {
    cache: 'default',
  }).then(e => e.json())

  return (
    <OrderDetails store={data} />
  )
}

export default Home