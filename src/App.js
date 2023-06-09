import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import {fetchAuthMe, selectIsAuth} from "./redux/slices/auth";
import {Popular} from "./pages/Popular/Popular";


function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth)

    useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/posts/:id" element={<FullPost/>}/>
              <Route path="/:popular" element={<Popular/>}/>
              <Route path="/posts/:id/edit" element={<AddPost/>}/>
              <Route path="/add-post" element={<AddPost/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Registration/>}/>
          </Routes>
      </Container>
    </>
  );
}

export default App;
