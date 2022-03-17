import { Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { ProductList } from "../../components/products"
import FullScreeLoading from "../../components/ui/FullScreeLoading"
import { useProducts } from "../../hooks"

const MenPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men')

  return (
    <ShopLayout title='Teslo-Shop - Men' pageDescription='Encuenta los mejores productos para hombres de Teslo'>
      <Typography variant='h1' component='h1'>Hombres</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Productos para hombres</Typography>
      {isLoading
        ? <FullScreeLoading />
        : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default MenPage