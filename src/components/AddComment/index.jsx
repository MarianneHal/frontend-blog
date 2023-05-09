import React, {useRef, useState} from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {CommentsBlock} from "../CommentsBlock";
import {useForm} from "react-hook-form";


export const Index = ({user}) => {
  const [comment, setComment] = useState([])
    const {register, handleSubmit, setError, formState: { errors, isValid} } = useForm({
        defaultValues: {
            comment: '',
        },
        mode: 'onChange'
    })
    const onSubmit = (values) => {
        setComment([...comment, values])
    };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Add comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            {...register('comment')}
          />
          <Button type="submit" variant="contained">Sent</Button>
      </form>
        </div>
      </div>
        <CommentsBlock comments={comment} user={user}/>
    </>
  );
};
