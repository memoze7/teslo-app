
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts"

import { ProductSlideshow } from '../../components/products/ProductSlideshow';
import { ItemCounter } from "../../components/ui";
import { SizeSelector } from "../../components/products";
import { dbProduct } from '../../database'

import { IProduct, ICartProduct, ISize } from "../../interfaces";
import { useState, useContext } from 'react';
import { CartContext } from '../../context';

interface Props {
  product: IProduct
}


const ProductPage: NextPage<Props> = ({ product }) => {

  const router = useRouter();

  const { addProductToCart } = useContext(CartContext)

  const [ tempCartProduct, setTempCartProduct ] = useState<ICartProduct>({
    _id: product._id,
    images: product.images[ 0 ],
    inStock: product.inStock,
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    type: product.type,
    gender: product.gender,
    quantity: 1,
  })

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct(prev => ({ ...prev, size }))
  }


  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct(prev => ({ ...prev, quantity }))
  }

  const onAddProduct = () => {
    if (!tempCartProduct.size) return
    addProductToCart(tempCartProduct)
    // llamar al context

    // router.push('/cart')
  }

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            {/* titulos */}
            <Typography variant="h1" component={'h1'}>{product.title}</Typography>
            <Typography variant="subtitle1" component={'h2'}>${product.price}</Typography>

            {/* Canttidod */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              {/* Item Conut */}
              <ItemCounter currentValue={tempCartProduct.quantity} maxValue={product.inStock} updateQuantity={onUpdateQuantity} />
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={onSelectedSize} />
            </Box>

            {/* Agregar al carrito */}
            {
              (product.inStock > 0)
                ? <Button color='secondary' className="circular-btn" onClick={onAddProduct}>
                  {!!tempCartProduct.size
                    ? 'Agregar al carrito'
                    : 'Seleccione una talla'}
                </Button>
                : <Chip label='No hay disponible' color='error' variant='outlined' />
            }


            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle1'>Description</Typography>
              <Typography variant='subtitle2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>

      </Grid>

    </ShopLayout >
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

//* no usar
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {

//   const { slug = '' } = params as { slug: string }
//   const product = await dbProduct.getProductBySlug(slug)

// if (!product) {
//   return {
//     redirect: {
//       destination: '/',
//       permanent: false
//     }
//   }
// }

// return {
//   props: {
//     product
//   }
// }
// }

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlug = await dbProduct.getAllProductSlugs();

  return {
    paths: productSlug.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: "blocking"
  }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }
  const product = await dbProduct.getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage