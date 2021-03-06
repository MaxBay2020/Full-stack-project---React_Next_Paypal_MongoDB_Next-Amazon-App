import React, { useState, useContext} from 'react'
import Head from 'next/head'
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Link,
    createMuiTheme,
    ThemeProvider,
    CssBaseline,
    Switch,
    Badge,
    Button,
    Menu,
    MenuItem,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    Divider,
    ListItemText,
    InputBase,
} from '@material-ui/core'
import useStyles from "../utils/styles"
import NextLink from 'next/link'
import {Store} from '../utils/Store'
import Cookies from 'js-cookie'
import dynamic from "next/dynamic";
import {useRouter} from "next/router";

const Layout = ({title, description, children}) => {
    const {state, dispatch} = useContext(Store)
    const {darkMode, cart, userInfo}=state
    const router = useRouter()


    const classes=useStyles()
    const theme = createMuiTheme({
        typography: {
            h1: {
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            h2: {
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            body1: {
                fontWeight: 'normal',
            },
        },
        palette: {
            type: darkMode?'dark':'light',
            primary: {
                main: '#f0c000',
            },
            secondary: {
                main: '#208080',
            }
        }
    })

    const darkModeChangeHandler = () =>{
        dispatch({type: darkMode?'DARK_MODE_OFF':'DARK_MODE_ON'})
        const newDarkMode = !darkMode
        Cookies.set('darkMode', newDarkMode?'ON':'OFF')
    }

    const [anchorEl, setAnchorEl] = useState(null)

    const loginClickHandler = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const logoutClickHandler = () => {
        setAnchorEl(null)
        dispatch({type: 'USER_LOGOUT'})
        Cookies.remove('userInfo')
        Cookies.remove('cartItems')

        router.push('/')
    }

    const loginMenuCloseHandler = (e, redirect) => {
        setAnchorEl(null)
        if(redirect){
            router.push(redirect)
        }
    }

    return (
        <div>
            {/* Navbar */}
            <Head>
                <title>{title?`${title} | Next Amazon`: 'Next Amazon' }</title>
                {description && <meta name='description' content={description}/>}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" className={classes.navbar}>
                    <Toolbar>
                        <NextLink href='/' passHref>
                            <Link>
                                <Typography className={classes.brand}>amazon</Typography>
                            </Link>
                        </NextLink>
                        <div className={classes.grow} />
                        <div>
                            <Switch checked={darkMode} onChange={()=>darkModeChangeHandler()} />
                            <NextLink href='/cart' passHref>
                                <Link>
                                    {
                                        cart.cartItems?.length > 0 ?
                                        <Badge color='secondary' badgeContent={cart.cartItems.length}>Cart</Badge>
                                            : 'Cart'
                                    }

                                </Link>
                            </NextLink>
                            {
                                userInfo?
                                    (
                                        <>
                                            <Button
                                                aria-controls="simple-menu"
                                                aria-haspopup="true"
                                                className={classes.navbarButton}
                                                onClick={loginClickHandler}
                                            >
                                                {userInfo.name}
                                            </Button>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={loginMenuCloseHandler}
                                            >
                                                <MenuItem
                                                    onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                                                >
                                                    Profile
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={(e) =>
                                                        loginMenuCloseHandler(e, '/order-history')
                                                    }
                                                >
                                                    Order History
                                                </MenuItem>
                                                {userInfo.isAdmin && (
                                                    <MenuItem
                                                        onClick={(e) =>
                                                            loginMenuCloseHandler(e, '/admin/dashboard')
                                                        }
                                                    >
                                                        Admin Dashboard
                                                    </MenuItem>
                                                )}
                                                <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                                            </Menu>

                                        </>
                                    )
                                    :
                                    (
                                        <NextLink href='/login' passHref>
                                            <Link>Login</Link>
                                        </NextLink>
                                    )
                            }

                        </div>
                    </Toolbar>
                </AppBar>
                {/* main */}
                <Container className={classes.main}>
                    {children}
                </Container>

                {/* footer */}
                <footer className={classes.footer}>
                    <Typography>
                        All rights reserved. Next Amazon.
                    </Typography>
                </footer>
            </ThemeProvider>
        </div>
    );
};

export default dynamic(() => Promise.resolve(Layout), {ssr: false})

