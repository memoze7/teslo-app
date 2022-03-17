import { Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { ProductList } from "../../components/products"
import FullScreeLoading from "../../components/ui/FullScreeLoading"
import { useProducts } from "../../hooks"


const KigPager = () => {
  const { products, isLoading } = useProducts('/products?gender=kid')

  return (
    <ShopLayout title='Teslo-Shop - Kid' pageDescription='Encuenta los mejores productos para Niños de Teslo'>
      <Typography variant='h1' component='h1'>Niños</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Productos para niños</Typography>
      {isLoading
        ? <FullScreeLoading />
        : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default KigPager