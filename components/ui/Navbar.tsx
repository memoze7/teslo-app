import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import NextLink from 'next/link'
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UiContext, CartContext } from '../../context/';

const nav = [
  { name: 'Hombres', path: '/category/men' },
  { name: 'Mujeres', path: '/category/women' },
  { name: 'Niños', path: '/category/kid' },
]

export const Navbar = () => {

  const { toggleSideMenu } = useContext(UiContext);
  const { cart } = useContext(CartContext)


  const { pathname } = useRouter()

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref>
          <Link display='flex' alignItems='baseline' style={{ textDecoration: 'none' }}>
            <Typography variant='h6'>Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

          {nav.map(({ name, path }) => (
            <NextLink href={path} passHref key={name}>
              <Link>
                <Button color={pathname === path ? 'secondary' : 'primary'}>{name}</Button>
              </Link>
            </NextLink>
          ))}


        </Box>

        <Box flex={1} />
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={cart.reduce((acc, el) => acc + el.quantity, 0) > 9 ? '+9' : cart.reduce((acc, el) => acc + el.quantity, 0)} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button onClick={toggleSideMenu}>Menu</Button>

      </Toolbar>
    </AppBar >
  )
}
