import { NextPage, GetServerSideProps } from "next"
import { Box, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { ProductList } from "../../components/products"
import { dbProduct } from "../../database"
import { IProduct } from "../../interfaces"
import { getAllProductSlugs } from '../../database/dbProducts';


interface Props {
  products: IProduct[],
  foundProducts: boolean,
  query: string
}


const HomePage: NextPage<Props> = ({ products, foundProducts, query }) => {

  // const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout title='Teslo-Shop - Search' pageDescription='Encuenta los mejores productos de Teslo'>
      <Typography variant='h1' component='h1'>Buscar producto</Typography>
      {foundProducts
        ? <Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize'>Término: {query}</Typography>
        : <Box display='flex'>
          <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningún producto</Typography>
          <Typography variant='h2' sx={{ mb: 1, ml: 1 }} color='secondary' textTransform='capitalize'>{query}</Typography>
        </Box>
      }

      <ProductList products={products} />

    </ShopLayout >
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { query = '' } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  let products = await dbProduct.getProductsByTerm(query)
  const foundProducts = products.length > 0;


  if (!foundProducts) {
    products = await dbProduct.getAllProducts();
  }



  return {
    props: {
      products,
      foundProducts,
      query
    }
  }
}



export default HomePage
