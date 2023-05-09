import React, {useEffect, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import {useSelector} from "react-redux";
import {Navigate, useNavigate, useParams} from "react-router-dom";

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {selectIsAuth} from "../../redux/slices/auth";
import instance from "../../axios";

export const AddPost = () => {
    const {id} = useParams();
  const isAuth = useSelector(selectIsAuth)
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');
    const [text, setText] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [tags, setTags] = React.useState('');
    const inputRef = useRef(null)
    const isEditing = Boolean(id)

  const handleChangeFile = async (event) => {
        try{
            const formData = new FormData();
            formData.append('image', event.target.files[0])
            const {data} = await instance.post('/upload', formData)
            setImageUrl(data.url)
        }catch (err) {
            console.log(err);
            alert('Something Wrong!')
        }
  };

  const onClickRemoveImage = () => {
      setImageUrl('')
  };

  const onSubmit = async () => {
      try{
          setIsLoading(true);

          const fields = {
              title,
              imageUrl,
              tags,
              text
          }

          const {data} = isEditing
              ? await instance.patch(`/posts/${id}`, fields)
              : await instance.post('/posts', fields)
          const _id = isEditing ? id: data._id

          navigate(`/posts/${_id}`)

      }catch (err){
          console.warn(err)
          alert('Something Wrong!')
      }
  }

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  useEffect(()=> {
      if (id){
          instance.get(`/posts/${id}`).then(({data}) => {
              setTitle(data.title)
              setText(data.text)
              setTags(data.tags.join(','))
              setImageUrl(data.imageUrl)
          })
      }
  },[])

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Write something...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if( !window.localStorage.getItem('token') && !isAuth) {
      return <Navigate to='/'/>
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputRef.current.click()} variant="outlined" size="large">
        Add photo
      </Button>
      <input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField classes={{ root: styles.tags }} variant="standard" placeholder="Tags" value={tags}
                 onChange={(e) => setTags(e.target.value)} fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
            {isEditing? "Save": "Add"}
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
