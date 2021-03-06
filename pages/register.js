import React, {useContext, useEffect} from 'react';
import Layout from "../components/Layout";
import {Button, Link, List, ListItem, TextField, Typography} from "@material-ui/core";
import useStyles from "../utils/styles"
import NextLink from 'next/link'
import dynamic from "next/dynamic";
import axios from "axios";
import {Store} from "../utils/Store";
import {useRouter} from "next/router";
import Cookies from 'js-cookie'
import {useSnackbar} from "notistack";
import {Controller, useForm} from "react-hook-form";
import {getError} from "../utils/error";

const Register = () => {
    const router = useRouter()
    const {redirect} = router.query
    const {state, dispatch} = useContext(Store)
    const {userInfo}=state
    const {handleSubmit, control, formState: {errors}} = useForm()
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()


    // useEffect(() => {
    //     if(userInfo){
    //         router.push('/')
    //     }
    // }, []);


    if(userInfo){
        router.push('/')
    }

    const classes = useStyles()


    const submitHandler = async ({name, email, password, confirmPassword}) => {
        closeSnackbar()

        if(password !== confirmPassword) return enqueueSnackbar('Passwords must match!', {
            variant: 'error'
        })

        try {
            const {data} = await axios.post('/api/users/register', {name, email, password})
            dispatch({type:'USER_LOGIN', payload: data})
            Cookies.set('userInfo', data)
            router.push(redirect || '/')


        }catch (err){
            enqueueSnackbar(getError(err), {
                variant: 'error'
            })
        }
    }

    return (
        <Layout title='Next Amazon | Register'>
            <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
                <Typography component='h1' variant='h1'>
                    Register
                </Typography>
                <List>
                    <ListItem>
                        <Controller
                            name='name'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 2
                            }}
                            render={({field}) =>
                                <TextField
                                    variant='outlined'
                                    fullWidth id='name'
                                    label='Name'
                                    inputProps={{type: 'name'}}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name?
                                        errors.name.type==='minLength' ?
                                            'Name is more than 2' : 'Name is required' : ''
                                    }
                                    {...field}
                                />
                            } />
                    </ListItem>

                    <ListItem>
                        <Controller
                            name='email'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            }}
                            render={({field}) =>
                                <TextField
                                    variant='outlined'
                                    fullWidth id='email'
                                    label='Email'
                                    inputProps={{type: 'email'}}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email?
                                        errors.email.type==='pattern' ?
                                            'Email is not valid' : 'Email is required' : ''
                                    }
                                    {...field}
                                />
                            } />
                    </ListItem>

                    <ListItem>
                        <Controller
                            name='password'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 6
                            }}
                            render={({field}) =>
                                <TextField
                                    variant='outlined'
                                    fullWidth id='password'
                                    label='Password'
                                    inputProps={{type: 'password'}}
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?
                                        errors.password.type==='minLength' ?
                                            'Password length is more than 6' : 'Password is required' : ''
                                    }
                                    {...field}
                                />
                            } />
                    </ListItem>

                    <ListItem>
                        <Controller
                            name='confirmPassword'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 6
                            }}
                            render={({field}) =>
                                <TextField
                                    variant='outlined'
                                    fullWidth id='confirmPassword'
                                    label='Confirm Password'
                                    inputProps={{type: 'password'}}
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={errors.confirmPassword?
                                        errors.confirmPassword.type==='minLength' ?
                                            'Confirm Password length is more than 6' : 'Confirm Password is required' : ''
                                    }
                                    {...field}
                                />
                            } />
                    </ListItem>

                    <ListItem>
                        <Button variant='contained' type='submit' fullWidth color='primary'>
                            Register
                        </Button>
                    </ListItem>
                    <ListItem>
                        Already have an account? &nbsp; <NextLink href={`/login?redirect=${redirect  || '/'}`} passHref><Link>Login</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    );
};

export default dynamic(() => Promise.resolve(Register), {ssr: false})

