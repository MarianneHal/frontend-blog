import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import instance from "../axios";




export const FullPost = () => {
    const {id} = useParams();

    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        instance.get(`/posts/${id}`).then(res => {
            setData(res.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err);
            alert('ERROR')
        })
    }, [])

    if (isLoading) {
        return <Post isLoading={isLoading}/>
    }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={`http://localhost:4444${data.imageUrl}`}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text}/>
      </Post>
        <Index user={data}/>

    </>
  );
};
