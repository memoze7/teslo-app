import { FC, useEffect, useReducer } from 'react'
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './'
import Cookie from 'js-cookie'

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number,
  subTotal: number,
  tax: number,
  total: number,
}

const Cart_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
}


export const CartProvider: FC = ({ children }) => {

  const [ state, dispatch ] = useReducer(cartReducer, Cart_INITIAL_STATE)

  // efecto 
  useEffect(() => {
    try {

      const products = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []

      dispatch({ type: '[Cart] - Load from cookies | storage', payload: products })
    } catch (error) {
      dispatch({ type: '[Cart] - Load from cookies | storage', payload: [] })

    }
  }, [])

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart))
  }, [ state.cart ])

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, current) => prev + current.quantity, 0)
    const subTotal = state.cart.reduce((prev, current) => prev + (current.quantity * current.price), 0)
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);


    const orderSumary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1)
    }
    dispatch({ type: '[Cart] - Update order sumary', payload: orderSumary })

  }, [ state.cart ])


  const addProductToCart = (product: ICartProduct) => {

    const productsInCart = state.cart.some(p => p._id === product._id && p.size === product.size)
    if (!productsInCart)
      return dispatch({ type: '[Cart] - Update Product', payload: [ ...state.cart, product ] })

    const updateProduct = state.cart.map(p => {
      if (p._id !== product._id) return p
      if (p.size !== product.size) return p

      p.quantity += product.quantity
      return p;
    })
    dispatch({ type: '[Cart] - Update Product', payload: updateProduct })

  }

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Change product quantity', payload: product })
  }

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Remove product in cart', payload: product })
  }

  return (
    <CartContext.Provider value={{
      ...state,
      addProductToCart,
      updateCartQuantity,
      removeCartProduct
    }}>
      {children}
    </CartContext.Provider>
  )

}