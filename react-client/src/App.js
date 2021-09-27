import React from 'react'
import {useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react';
import AuthGuard from './components/AuthGuard'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import {useAuthStore} from './stores'

function App() {    
  return (    
    <ChakraProvider>
      {(()=>{
        console.log('render');
      })()}
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/signup">
            <Signup/>
          </Route>
          <Route exact path="/">
            <AuthGuard to="/login">
              <Home/>
            </AuthGuard>
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  )
}

export default App
