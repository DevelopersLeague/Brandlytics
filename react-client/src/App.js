import React from 'react'
import {useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import AuthGuard from './components/AuthGuard'
import UnAuthGuard from './components/UnAuthGuard';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Search from './pages/Search';
import LandingPage from './pages/LandingPage';
import {useAuthStore} from './stores'
import Saved from './pages/Saved';
// import Sidebar from './pages/Sidebar';


const theme = extendTheme({
  styles: {
    global :{
      body:{
        bg: "#dfe1f0",                
      }
    }
  }    
});


function App() {    
  return (    
    <ChakraProvider theme={theme}>           
      <Router>        
        <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>        
          <Route exact path="/login">
            <UnAuthGuard to="/">
              <Login/>        
            </UnAuthGuard>
          </Route>
          <Route exact path="/signup">
            <UnAuthGuard to="/">
              <Signup/>        
            </UnAuthGuard>            
          </Route>
          <Route exact path="/home">
            <AuthGuard to="/login">
              <Home/>
            </AuthGuard>
          </Route>
          <Route exact path="/search">
            <AuthGuard to="/login">
              <Search/>
            </AuthGuard>
          </Route>
          <Route exact path="/saved">
            <AuthGuard to="/login">
              <Saved/>
            </AuthGuard>
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  )
}

export default App
