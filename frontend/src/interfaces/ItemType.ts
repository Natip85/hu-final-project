export interface Item {
  _id?: string;
  name?: string;
  slug?: string;
  description: string;
  price: number;
  category: any;
  quantity: number;
  size: string;
  favorites?: [] | null;
  shipping: boolean
  error?: string
  message?: string
  photo: string
  success?: string
  products?: any
  checked?: any
  radio?: any
  total?: any
  status?: any
}