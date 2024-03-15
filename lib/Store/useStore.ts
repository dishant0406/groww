import {create} from 'zustand';
import { toast } from 'sonner';

export const useStore = create<{
  store:StoreData,
  setStore:(store:StoreData)=>void
}>((set) => ({
  store: {
    paymentMethods:[],
    products:[],
  },
  setStore:(store:StoreData)=>set({store})
}));

export const useStoreActions = create<{
  increase:(id:number)=>void,
  decrease:(id:number)=>void,
  deleteProduct:(id:number)=>void,
  removeAllProducts:()=>void
}>((set) => ({
  increase:(id:number)=>{
    const store = useStore.getState().store;
    const product = store.products.find((product)=>product.id===id);
    if(product){
      product.quantity++;
      useStore.setState({store});
    }
    useStore.setState({store});
  },
  decrease:(id:number)=>{
    const store = useStore.getState().store;
    const product = store.products.find((product)=>product.id===id);
    if(product){
      if(product.quantity>1){
        product.quantity--;
      }else{
       const index = store.products.findIndex((product)=>product.id===id);
        if(index!==-1){
          store.products.splice(index,1);
        }
      }
      useStore.setState({store});
    }
    useStore.setState({store});
  },
  deleteProduct:(id:number)=>{
    const store = useStore.getState().store;
    const index = store.products.findIndex((product)=>product.id===id);
    if(index!==-1){
      const product = store.products[index];
      store.products.splice(index,1);
      useStore.setState({store});
      toast(`Product ${product.title} removed from cart`);
    }
    useStore.setState({store});
  },
  removeAllProducts:()=>{
    const store = useStore.getState().store;
    store.products = [];
    useStore.setState({store});
    toast(`All products removed from cart`);
  }
 
}));

export const useOrderData = create<{
  orderData:{
    [key:string]:{
      value:string,
      verified:boolean
    }
  },
  paymentMethod:string,
  setPaymentMethod:(paymentMethod:string)=>void,
  deliveryMethod:string,
  setDeliveryMethod:(deliveryMethod:string)=>void,
  setOrderData:(orderData:{
    [key:string]:{
      value:string,
      verified:boolean
    }
  })=>void ,
  totalAmount:number,
  setTotalAmount:(totalAmount:number)=>void,
}>((set) => ({
  orderData:{
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
  },
  setOrderData: (orderData)=>{
    set({
      orderData:{
        ...orderData,
        id:{
          value:new Date().getTime().toString(),
          verified:true
        }
      }
    });
  },
  paymentMethod:'',
  setPaymentMethod:(paymentMethod:string)=>{
    set({paymentMethod});
  },
  deliveryMethod:'',
  setDeliveryMethod:(deliveryMethod:string)=>{
    set({deliveryMethod});
  },
  totalAmount:0,
  setTotalAmount:(totalAmount:number)=>{
    set({totalAmount});
  }
}));