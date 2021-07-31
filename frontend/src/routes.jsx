import {BrowserRouter, Route} from 'react-router-dom'
import React from 'react'
import {Home} from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Planner } from './pages/Planner'

export function Routes(){
    return(
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Login} path="/login" exact />
            <Route component={Register} path="/register" exact />
            <Route component={Planner} path="/planner" exact />
        </BrowserRouter>
    )
}