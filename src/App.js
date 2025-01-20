import Home from './components/Home'
import UserDetails from './components/UserDetails'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import React from 'react'
import SelectContext from './context/SelectContext'
import {Component} from 'react'

class App extends Component{
  state={isDark:false}
  toggleTheme=()=>{
    this.setState(prevState=>({isDark:!prevState.isDark}))
  }
  render(){
    const {isDark}=this.state
    return (
      <SelectContext.Provider
      value={{isDark,toggleTheme:this.toggleTheme}}
      >
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/userdetails/:id" element={<UserDetails/>}/>
        </Routes>
      </BrowserRouter>
      </SelectContext.Provider>
    );
  }
  
}

export default App;
