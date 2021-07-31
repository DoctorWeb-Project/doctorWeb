import {BrowserRouter, Route} from 'react-router-dom'
import React from 'react'
import {Home} from './pages/Home'
import { Login } from './pages/Login'

export function Routes(){
    return(
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Login} path="/login" exact />
        </BrowserRouter>
    )
}