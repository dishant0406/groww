type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type PaymentMethod = ;

type StoreData = {
  products: Product[];
  paymentMethods: PaymentMethod[];
};
