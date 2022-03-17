import { Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { ProductList } from "../../components/products"
import FullScreeLoading from "../../components/ui/FullScreeLoading"
import { useProducts } from "../../hooks"

const WomenPage = () => {

  const { products, isLoading } = useProducts('/products?gender=women')

  return (
    <ShopLayout title='Teslo-Shop - Women' pageDescription='Encuenta los mejores productos para mujeres de Teslo'>
      <Typography variant='h1' component='h1'>Mujeres</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Productos para mujeres</Typography>
      {isLoading
        ? <FullScreeLoading />
        : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default WomenPage