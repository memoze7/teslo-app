import { CartState } from './';
import { ICartProduct } from '../../interfaces';

type CartActionType =
  | { type: '[Cart] - Load from cookies | storage', payload: ICartProduct[] }
  | { type: '[Cart] - Update Product', payload: ICartProduct[] }
  | { type: '[Cart] - Change product quantity', payload: ICartProduct }
  | { type: '[Cart] - Remove product in cart', payload: ICartProduct }
  | { 
    type: '[Cart] - Update order sumary', 
    payload: {
      numberOfItems: number,
      subTotal: number,
      tax: number,
      total: number,
    } 
  }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {

  switch (action.type) {
    case '[Cart] - Load from cookies | storage':
      return {
        ...state,
        cart: [ ...action.payload ]
      }
    case '[Cart] - Update Product':
      return {
        ...state,
        cart: [ ...action.payload ]
      }
    case '[Cart] - Change product quantity':
      return {
        ...state,
        cart: state.cart
          .reduce<ICartProduct[]>((acc, el) =>
          ([ ...acc, 
             el._id === action.payload._id && el.size === action.payload.size // if product same size and id
             ? action.payload
             : el ])
            , [])
      }

      case '[Cart] - Remove product in cart':
        return {
          ...state,
          cart: state.cart.filter(p => !(p._id === action.payload._id && p.size === action.payload.size))
        }
        case '[Cart] - Update order sumary':
          return {
            ...state,
           ...action.payload
          }
    default:
      return state
  }
}

// return {
//   ...state,
//   cart: state.cart
//     .reduce<ICartProduct[]>((acc, el) =>
//     ([ ...acc, 
      
      
//       {
//       ...el,
//       quantity: el._id === action.payload._id && el.size === action.payload.size
//         ? action.payload.quantity
//         : el.quantity
//     } ])
//       , [])
// }