
import Layout from "../components/Layout";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Link,
    Typography
} from '@material-ui/core'
import NextLink from "next/link";
import {connect, convertDocToObj, disconnect} from "../db/config/mongoDB-config";
import Product from "../db/models/Product";
import axios from "axios";
import {useContext} from "react";
import {Store} from "../utils/Store";
import {useRouter} from "next/router"



const Home = ({products}) => {
    const {state, dispatch} = useContext(Store)
    const router = useRouter()

    const addToCartHandler = async (product) => {
        const { data } = await axios.get(`/api/products/${product._id}`)

        const existItem = state.cart.cartItems?.find(item => item._id===product._id)
        const quantity = existItem ? existItem.quantity+1 : 1

        if(quantity > data.countInStock){
            return window.alert("Sorry, this product is out of stock!😣")
        }

        dispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity}})

        router.push('/cart')
    }

  return (
      <Layout>
          <div>
              <h1>Products</h1>
              <Grid container spacing={3}>
                  {
                      products.map(product => (
                          <Grid item md={4} key={product.name}>

                              <Card>
                                  <NextLink href={`/product/${product.slug}`} passHref>
                                      <Link>
                                          <CardActionArea>
                                              <CardMedia component='img' image={product.image} title={product.name} />

                                              <CardContent>
                                                  <Typography>
                                                      {product.name}
                                                  </Typography>
                                              </CardContent>
                                          </CardActionArea>
                                      </Link>
                                  </NextLink>


                                  <CardActions>
                                      <Typography>${product.price}</Typography>
                                      <Button size='small' color='primary'
                                        onClick={() => addToCartHandler(product)}
                                      >Add to cart</Button>
                                  </CardActions>
                              </Card>
                          </Grid>
                      ))
                  }
              </Grid>
          </div>
      </Layout>
  )
}

export const getServerSideProps = async (context) => {
    await connect()
    const products = await Product.find({}).lean()
    // await disconnect()

    return {
        props: {
            products:products.map(convertDocToObj)
        }
    }
}


export default Home
