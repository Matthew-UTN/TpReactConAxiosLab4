import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './assets/components/Home';
import Informacion from './assets/components/Informacion';
import Productos from './assets/components/Productos';
import Mapa from './assets/components/Mapa';
import './assets/css/App.css';

class App extends Component{
  render(){
    return (
      <Switch>
        <Route exact path ="/" component={Home}></Route>
        <Route exact path ="/home" component={Home}></Route>
        <Route path="/detalleInstrumento/:id" component={Informacion}></Route>
        <Route path="/productos" component={Productos}></Route>
        <Route path="/mapa" component={Mapa}></Route>
      </Switch>
    )
  }
}
  

export default App;
