import { ISize, IType } from "./";

export interface ICartProduct {

  _id: string
  images: string;
  inStock: number;
  price: number;
  size?: ISize;
  slug: string;
  title: string;
  type: IType;
  gender: 'men' | 'women' | 'kid' | 'unisex',
  quantity: number


}