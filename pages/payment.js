import React, {useState, useEffect, useContext} from 'react';
import {Store} from "../utils/Store";
import {useRouter} from "next/router";
import Layout from "../components/Layout";
import CheckOutWizard from "../components/CheckOutWizard";
import useStyles from "../utils/styles";
import {Button, FormControl, FormControlLabel, List, ListItem, Radio, RadioGroup, Typography} from "@material-ui/core";
import Cookies from 'js-cookie'
import {useSnackbar} from "notistack";

const Payment = () => {
    const classes = useStyles()
    const {state, dispatch} = useContext(Store)
    const router = useRouter()
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()

    const {cart: {shippingAddress}} = state

    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        if(!shippingAddress){
            router.push('/shipping')
        }else{
            setPaymentMethod(Cookies.get('paymentMethod') || '')
        }
    }, [])

    const submitHandler = (e) => {
        closeSnackbar()
        e.preventDefault()
        if(!paymentMethod){
            enqueueSnackbar('Payment method is required', {variant: 'error'})
        }else{
            dispatch({type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod})
            Cookies.set('paymentMethod', paymentMethod)
            router.push('/placeOrder')
        }
    }

    return (
        <Layout title='Payment Method'>
            <CheckOutWizard activeStep={2} />
            <form className={classes.form} onSubmit={(e)=>submitHandler(e)}>
                <Typography component='h1' variant='h1'>
                    Payment Method
                </Typography>
                {/*<h1>Payment Method</h1>*/}
                <List>
                    <ListItem>
                        <FormControl component='fieldset'>
                            <RadioGroup
                                arial-label='Payment Method'
                                name='paymentMethod'
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <FormControlLabel
                                    label='Paypal'
                                    value='Paypal'
                                    control={<Radio />}
                                />

                                <FormControlLabel
                                    label='Stripe'
                                    value='Stripe'
                                    control={<Radio />}
                                />

                                <FormControlLabel
                                    label='Cash'
                                    value='Cash'
                                    control={<Radio />}
                                />

                            </RadioGroup>
                        </FormControl>
                    </ListItem>

                    <ListItem>
                        <Button  fullWidth type='submit' variant='contained' color='primary'>
                            Continue
                        </Button>
                    </ListItem>

                    <ListItem>
                        <Button  fullWidth type='button' variant='contained' onClick={()=>router.push('/shipping')}>
                            Back
                        </Button>
                    </ListItem>
                </List>

            </form>
        </Layout>
    );
};

export default Payment;
