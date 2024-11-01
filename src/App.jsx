/* eslint-disable no-unused-vars */
import React,{lazy, Suspense} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const HomePage = lazy(()=>import('./Pages/HomePage'))
const BoardPage = lazy(()=>import('./Pages/BoardPage'))
const ErrorPage = lazy(()=>import('./Pages/ErrorPage'))

export default function App() {


  return (
    <>
      <BrowserRouter>
      <Suspense fallback={<div>...Loading</div>}>
      <Routes>
          <Route element={<HomePage  />} path='/' />
          <Route element={<BoardPage />} path='/border/:id' />
          <Route element={<ErrorPage />} path='*' />
        </Routes>

      </Suspense>
      </BrowserRouter>
    </>
  );
}
