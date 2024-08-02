import { useState } from 'react'
import './App.css'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Layout from './components/Layout'
import Admin from './components/Admin'
import Editor from './components/Editor'
import Home from './components/Home'
import LinkPage from './components/LinkPage'
import Missing from './components/Missing'
import Unauthorized from './components/Unauthorized'
import RequireAuth from './components/RequireAuth'
import {Routes, Route} from 'react-router-dom'

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}