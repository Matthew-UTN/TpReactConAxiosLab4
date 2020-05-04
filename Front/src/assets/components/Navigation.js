import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Navigation extends Component {
  render() {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Musical Hendrix
            </Typography>
            <Button color="inherit" style={{marginLeft: 20}} href="/home">Home</Button>
            <Button color="inherit" href="/mapa">Donde Estamos</Button>
            <Button color="inherit" href="/productos">Productos</Button>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default Navigation;