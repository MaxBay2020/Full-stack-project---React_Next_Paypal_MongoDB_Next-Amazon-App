import React, {useContext, useEffect} from 'react';
import Layout from "../components/Layout";
import {Button, Link, List, ListItem, TextField, Typography} from "@material-ui/core";
import useStyles from "../utils/styles"
import NextLink from 'next/link'
import dynamic from "next/dynamic";
import {Store} from "../utils/Store";
import {useRouter} from "next/router";
import Cookies from 'js-cookie'
import {Controller, useForm} from "react-hook-form";
import CheckOutWizard from "../components/CheckOutWizard";

const Shipping = () => {
    const router = useRouter()
    const {state, dispatch} = useContext(Store)
    const {userInfo, cart: {shippingAddress}} = state
    const {handleSubmit, control, formState: {errors}, setValue} = useForm()



    useEffect(() => {
        // if(userInfo){
        //     router.push('/')
        // }
        setValue('fullName', shippingAddress.fullName)
        setValue('address', shippingAddress.address)
        setValue('postalCode', shippingAddress.postalCode)
        setValue('city', shippingAddress.city)
        setValue('country', shippingAddress.country)
    }, []);


    if(!userInfo){
        router.push('/login?redirect=/shipping')
    }

    const classes = useStyles()


    const submitHandler = ({
                                     fullName,
                                     address,
                                     city,
                                     postalCode,
                                     country}) => {


        dispatch({type:'SAVE_SHIPPING_ADDRESS', payload: {
                fullName,
                address,
                city,
                postalCode,
                country}})
        Cookies.set('shippingAddress', {
            fullName,
            address,
            city,
            postalCode,
            country})
        router.push('payment')

    }

    return (
        <Layout title='Next Amazon | Shipping Address'>
            <CheckOutWizard activeStep={1} />
            <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
                <Typography component='h1' variant='h1'>
                    Shipping Address
                </Typography>
                <List>
                    <ListItem>
                        <Controller
                            name='fullName'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 2
                            }}
                            render={({field}) =>
                                <TextField
                                    variant='outlined'
                                    fullWidth id='fullName'
                                    label='Full Name'
                                    error={Boolean(errors.fullName)}
                                    helperText={errors.fullName?
                                        errors.fullName.type==='minLength' ?
                                            'Full Name is more than 2' : 'Full Name is required' : ''
                                    }
                                    {...field}
                                />
                            } />
                    </ListItem>

                    <ListItem>
                        <Controller
                            name='address'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 2
                            }}
                            render={({field}) =>
                                <TextField
                                    variant='outlined'
                                    fullWidth id='address'
                                    label='Address'
                                    error={Boolean(errors.address)}
                                    helperText={errors.address?
                                        errors.address.type==='minLength' ?
                                            'Address is more than 2' : 'Address is required' : ''
                                    }
                                    {...field}
                                />
                            } />
                    </ListItem>

                    <ListItem>
                        <Controller
                            name='city'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 2
                            }}
                            render={({field}) =>
                                <TextField
                                    variant='outlined'
                                    fullWidth id='city'
                                    label='City'
                                    error={Boolean(errors.city)}
                                    helperText={errors.city?
                                        errors.city.type==='minLength' ?
                                            'City is more than 2' : 'City is required' : ''
                                    }
                                    {...field}
                                />
                            } />
                    </ListItem>

                    <ListItem>
                        <Controller
                            name='postalCode'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 2
                            }}
                            render={({field}) =>
                                <TextField
                                    variant='outlined'
                                    fullWidth id='postalCode'
                                    label='Postal Code'
                                    error={Boolean(errors.postalCode)}
                                    helperText={errors.postalCode?
                                        errors.postalCode.type==='minLength' ?
                                            'Postal Code is more than 2' : 'Postal Code is required' : ''
                                    }
                                    {...field}
                                />
                            } />
                    </ListItem>

                    <ListItem>
                        <Controller
                            name='country'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 2
                            }}
                            render={({field}) =>
                                <TextField
                                    variant='outlined'
                                    fullWidth id='country'
                                    label='Country'
                                    error={Boolean(errors.country)}
                                    helperText={errors.country?
                                        errors.country.type==='minLength' ?
                                            'Country is more than 2' : 'Country is required' : ''
                                    }
                                    {...field}
                                />
                            } />
                    </ListItem>

                    <ListItem>
                        <Button variant='contained' type='submit' fullWidth color='primary'>
                            Continue
                        </Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    );
};

export default dynamic(() => Promise.resolve(Shipping), {ssr: false})

