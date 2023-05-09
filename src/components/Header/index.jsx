import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {selectIsAuth} from "../../redux/slices/auth";
import {logAut} from "../../redux/slices/auth";

export const Header = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  const onClickLogout = () => {
    dispatch(logAut())
    window.localStorage.removeItem('token')
  };


  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>IT BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Add Post</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  LogOut
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
