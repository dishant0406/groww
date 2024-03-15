'use client'

import React, { useEffect, useState } from 'react'
import Input from '@/components/Micro/Input'
import Radio from '@/components/Micro/Radio'
import SideInfo from '@/components/Micro/SideInfo'
import Image from 'next/image'
import Button from '@/components/Micro/Button'
import { useOrderData, useStore } from '@/lib/Store/useStore'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Props = {}

const CheckoutComponent = (props: Props) => {
  const { store } = useStore()
  const router = useRouter()
  const { setDeliveryMethod, setOrderData, setTotalAmount, setPaymentMethod } = useOrderData()
  const [formData, setFormData] = useState({
    firstName: {
      value: '',
      verified: false
    },
    lastName: {
      value: '',
      verified: false
    },
    phoneNumber: {
      value: '',
      verified: false
    },
    email: {
      value: '',
      verified: false
    },
    country: {
      value: '',
      verified: false
    },
    city: {
      value: '',
      verified: false
    },
    address: {
      value: '',
      verified: false
    },
    zipcode: {
      value: '',
      verified: false
    },
    cardNumber: {
      value: '',
      verified: false
    },
    expiryDate: {
      value: '',
      verified: false
    },
    cvv: {
      value: '',
      verified: false
    },
    cardHolderName: {
      value: '',
      verified: false
    },
    upiId: {
      value: '',
      verified: false
    }
  })

  const [deliveryType, setDeliveryType] = useState([
    {
      title: 'Standard Delivery',
      subtitle: '3-5 days, Free for all orders',
      checked: true,
      sideText: 'Free'
    },
    {
      title: 'Express Delivery',
      subtitle: '1-2 days, Free for orders above ₹ 1000',
      checked: false,
      sideText: '₹ 100'
    }
  ])

  const [paymentType, setPaymentType] = useState([
    {
      title: 'Credit Card',
      subtitle: 'Pay with Visa, MasterCard, American Express',
      checked: false,
      sideText: '',
      value: 'CARDS'
    },
    {
      title: 'UPI',
      subtitle: 'Pay with Google Pay, PhonePe, Paytm',
      checked: false,
      sideText: '',
      value: 'UPI'
    }
  ])


  let totalPrice = store?.products?.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)
  let deliveryCharge = deliveryType[1].checked ? Number(totalPrice) > 1000 ? 0 : 100 : 0
  let priceWithDelivery = (Number(totalPrice) + deliveryCharge).toFixed(2)

  let verified = formData.firstName.verified && formData.lastName.verified && formData.phoneNumber.verified && formData.email.verified && formData.country.verified && formData.city.verified && formData.address.verified && formData.zipcode.verified
  if (paymentType[0].checked) {
    verified = verified && formData.cardNumber.verified && formData.expiryDate.verified && formData.cvv.verified && formData.cardHolderName.verified
  } else if (paymentType[1].checked) {
    verified = verified && formData.upiId.verified
  } else {
    verified = false
  }


  let disabled = store?.products?.length === 0 || !store?.products || Number(totalPrice) <= 100 || !verified

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: {
        ...prev[e.target.name as keyof typeof prev],
        value: e.target.value
      }
    }))
  }

  const valueObj = (name: string) => ({
    value: formData[name as keyof typeof formData].value,
    onChange: handleChange
  })

  const handleSetVerified = (name: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        verified: value
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (disabled) {
      toast.error('Please fill all the details correctly', {
        position: 'top-right'
      })
      return
    }

    if (!disabled) {
      const deliveryMethod = deliveryType.find((item) => item.checked)?.title || 'Standard Delivery'
      const paymentMethod = paymentType.find((item) => item.checked)?.title || 'Credit Card'
      setDeliveryMethod(deliveryMethod)
      setPaymentMethod(paymentMethod)
      setOrderData(formData)
      setTotalAmount(Number(priceWithDelivery))
      router.push('/status')
    }
  }

  useEffect(() => {
    if (store?.products?.length === 0 || !store?.products || Number(totalPrice) <= 100 || store?.paymentMethods?.length === 0) {
      router.push('/')
    }
  }, [])

  return (
    <div className='w-full px-[5%]'>
      <p className='w-full font-medium text-[5vw] md:text-[2vw] mt-[5vh] '>
        Checkout
      </p>
      <form onSubmit={handleSubmit} className='w-full my-[5vh] justify-between md:flex-row flex-col flex gap-[1rem]'>
        <div className='w-full md:w-[70%] bg-white rounded-xl border p-[7%] md:p-[3%]'>
          <p className=' font-medium text-[4vw] md:text-[1.5vw]'>
            General Information
          </p>
          <div className='w-full mt-[5vh] md:flex-row flex-col flex gap-[3%]'>
            <Input
              placeHolder='Enter your first name'
              name='firstName'
              setVerified={(value) => handleSetVerified('firstName', value)}
              verificationRegex={/^[a-zA-Z\s]*$/}
              label='First Name'
              {...valueObj('firstName')}
            />
            <Input
              placeHolder='Enter your last name'
              name='lastName'
              setVerified={(value) => handleSetVerified('lastName', value)}
              verificationRegex={/^[a-zA-Z\s]*$/}
              label='Last Name'
              {...valueObj('lastName')}
            />
          </div>
          <div className='w-full md:mt-[3vh] md:flex-row flex-col flex gap-[3%]'>
            <Input
              placeHolder='Enter Phone Number'
              name='phoneNumber'
              setVerified={(value) => handleSetVerified('phoneNumber', value)}
              verificationRegex={/^[0-9]*$/}
              label='Phone Number'
              {...valueObj('phoneNumber')}
              type='number'
            />
            <Input
              placeHolder='Enter Email'
              name='email'
              label='Email'
              setVerified={(value) => handleSetVerified('email', value)}
              errorString='Invalid Email'
              verificationRegex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
              type='email'
              {...valueObj('email')}
            />
          </div>

          <p className=' font-medium mt-[10vh] text-[4vw] md:text-[1.5vw]'>
            Delivery Information
          </p>
          <div className='w-full mt-[3vh] flex flex-col gap-[3vh]'>
            {
              deliveryType.map((delivery) => {
                return (
                  <Radio
                    key={delivery.title}
                    title={delivery.title}
                    subtitle={delivery.subtitle}
                    checked={delivery.checked}
                    onCheck={(e) => {
                      const newDeliveryType = deliveryType.map((item) => {
                        return {
                          ...item,
                          checked: item.title === delivery.title
                        }
                      })
                      setDeliveryType(newDeliveryType)
                    }}
                    sideText={delivery.sideText}
                  />
                )
              })
            }

          </div>
          <p className=' font-medium mt-[10vh] text-[4vw] md:text-[1.5vw]'>
            Delivery Address
          </p>
          <div className='w-full mt-[5vh] md:flex-row flex-col flex gap-[3%]'>
            <Input
              placeHolder='Enter your Country'
              name='country'
              setVerified={(value) => {
                handleSetVerified('country', value)
              }}
              verificationRegex={/^[a-zA-Z\s]*$/}
              label='Country'
              {...valueObj('country')}
            />
            <Input
              placeHolder='Enter your City'
              name='city'
              setVerified={(value) => handleSetVerified('city', value)}
              verificationRegex={/^[a-zA-Z\s]*$/}
              label='City'
              {...valueObj('city')}
            />
          </div>
          <div className='w-full md:mt-[3vh] md:flex-row flex-col flex gap-[3%]'>
            <Input
              placeHolder='Enter your Address'
              name='address'
              setVerified={(value) => handleSetVerified('address', value)}
              verificationRegex={/^[a-zA-Z0-9\s]*$/}
              label='Address'
              {...valueObj('address')}
              type='text'
            />
            <Input
              placeHolder='Enter your ZipCode'
              name='zipcode'
              setVerified={(value) => handleSetVerified('zipcode', value)}
              verificationRegex={/^[0-9]*$/}
              label='ZipCode'
              type='number'
              {...valueObj('zipcode')}
            />
          </div>

          <p className=' font-medium mt-[10vh] text-[4vw] md:text-[1.5vw]'>
            Payments
          </p>
          <div className='w-full mt-[5vh] flex-col flex gap-[3vh]'>
            {
              paymentType.map((payment) => {
                if (store.paymentMethods.indexOf(payment.value) === -1) {
                  return null
                }

                return (
                  <Radio
                    key={payment.title}
                    title={payment.title}
                    subtitle={payment.subtitle}
                    checked={payment.checked}
                    onCheck={(e) => {
                      const newPaymentType = paymentType.map((item) => {
                        return {
                          ...item,
                          checked: item.title === payment.title
                        }
                      })
                      setPaymentType(newPaymentType)
                    }}
                    sideText={payment.sideText}
                  />
                )
              })
            }
          </div>
          {
            paymentType[0].checked && (
              <div>
                <div className='w-full mt-[5vh] flex gap-[3%]'>
                  <Input
                    placeHolder='Enter Card Number'
                    name='cardNumber'
                    setVerified={(value) => handleSetVerified('cardNumber', value)}
                    errorString='Invalid Card Number'
                    verificationRegex={/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/}
                    label='Card Number'
                    {...valueObj('cardNumber')}

                    type='number'
                  />
                  <Input
                    placeHolder='Enter Expiry Date'
                    name='expiryDate'
                    label='MM/YY'
                    setVerified={(value) => handleSetVerified('expiryDate', value)}
                    errorString='Invalid Expiry Date'
                    verificationRegex={/^(0[1-9]|1[0-2])\/([0-9]{2})$/}
                    value={formData.expiryDate.value}
                    onChange={(e) => {
                      let value = e.target.value
                      if (e.target.value.length > 5) return
                      if (e.target.value.length === 5 && Number(e.target.value.slice(3)) < new Date().getFullYear() % 100) {
                        value = e.target.value.slice(0, 3) + new Date().getFullYear() % 100
                      }

                      if (e.target.value.length > 2 && e.target.value[2] !== '/') {
                        value = e.target.value.slice(0, 2) + '/' + e.target.value.slice(2)
                      }
                      setFormData(prev => ({
                        ...prev,
                        expiryDate: {
                          ...prev.expiryDate,
                          value
                        }
                      }))
                    }}
                    type='text'
                  />
                </div>
                <div className='w-full mt-[3vh] flex gap-[3%]'>
                  <Input
                    placeHolder='Enter CVV'
                    name='cvv'
                    errorString='Invalid CVV'
                    setVerified={(value) => handleSetVerified('cvv', value)}
                    verificationRegex={/^[0-9]{3,4}$/}
                    label='CVV'
                    {...valueObj('cvv')}
                    type='number'
                  />
                  <Input
                    placeHolder='Enter Card Holder Name'
                    name='cardHolderName'
                    setVerified={(value) => handleSetVerified('cardHolderName', value)}
                    errorString='Invalid Card Holder Name'
                    verificationRegex={/^[A-Za-z]+(?: [A-Za-z]+)*(?:-[A-Za-z]+)*(?:'[A-Za-z]+)*$/}
                    label='Card Holder Name'
                    {...valueObj('cardHolderName')}
                    type='text'
                  />
                </div>
              </div>
            )
          }
          {
            paymentType[1].checked && (
              <div className='w-full mt-[3vh]'>
                <div className='w-full items-center flex gap-[3%]'>
                  <Image
                    src='/google-pay.svg'
                    alt='Google Pay'
                    className='w-[40px] h-[40px] object-contain'
                    width={100}
                    height={100}
                  />
                  <Image
                    src='/phone-pe.svg'
                    alt='PhonePe'
                    className='w-[50px] h-[50px] object-contain'
                    width={100}
                    height={100}
                  />
                  <Image
                    src='/paytm.svg'
                    alt='Paytm'
                    className='w-[75px] h-[75px] object-contain'
                    width={100}
                    height={100}
                  />
                </div>
                <Input
                  placeHolder='Enter UPI ID'
                  name='upiId'
                  verificationRegex={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+$/}
                  setVerified={(value) => handleSetVerified('upiId', value)}
                  errorString='Invalid UPI ID'
                  className='w-full md:!w-[40%]'
                  label='UPI ID'
                  {...valueObj('upiId')}
                  type='text'
                />
              </div>
            )
          }
          <div className='w-full border border-t my-[5vh]' />
          <div className='w-full md:flex-row flex-col flex items-start md:gap-0 gap-[3vh] md:items-center justify-between'>
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
                ₹ {deliveryCharge}
              </p>
              <p className='font-medium opacity-50 text-[4vw] md:text-[1.1vw]'>
                Delivery Charges
              </p>
            </div>
            <div>
              <p className='font-medium text-pri text-[5vw] md:text-[1.5vw]'>
                ₹ {priceWithDelivery}
              </p>
              <p className='font-medium opacity-50 text-[4vw] md:text-[1.1vw]'>
                Total
              </p>
            </div>
            <Button type='submit' className='w-full md:!w-[40%]'>
              Submit Order
            </Button>
          </div>

        </div>

        <SideInfo />
      </form>

    </div>
  )
}

export default CheckoutComponent