import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import styles from "./Login.module.scss";
import {fetchUserData, selectIsAuth} from "../../redux/slices/auth";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth)

    const {register, handleSubmit, setError, formState: { errors, isValid} } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchUserData(values))

        if(!data.payload) {
            return  alert('Something wrong!')
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    };

    if(isAuth){
        return <Navigate to="/"/>
    }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
           <TextField
             className={styles.field}
             label="E-Mail"
             type="email"
             error = {Boolean(errors.email?.message)}
             helperText={errors.email?.message}
             {...register('email', {required: 'Write your email'})}
             fullWidth
           />
           <TextField className={styles.field} label="Пароль" helperText={errors.password?.message} {...register('password',
          {required: 'Write your password'})}  fullWidth />
          <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
           Login
          </Button>
        </form>
    </Paper>
  );
};