import type { NextPage } from 'next'

import { Typography } from '@mui/material';
import { useProducts } from '../hooks';

import { ShopLayout } from '../components/layouts/ShopLayout';
import { ProductList } from '../components/products';
import FullScreeLoading from '../components/ui/FullScreeLoading';




const HomePage: NextPage = () => {

  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout title='Teslo-Shop - Home' pageDescription='Encuenta los mejores productos de Teslo'>
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>
      {isLoading
        ? <FullScreeLoading />
        : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default HomePage
