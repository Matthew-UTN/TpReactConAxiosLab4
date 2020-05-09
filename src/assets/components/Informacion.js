import React, {Component} from 'react';
import Navigation from './Navigation';
import {instrumentos} from '../datos/instrumentos.json';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { Grid } from '@material-ui/core';

var imagen = {
    width: '400px', 
    marginTop: '20px', 
    marginBottom:'20px',
    marginLeft:'150px',
  }

  var descripcion = {
    width: '400px',  
    marginTop: '100px',
    marginBottom:'20px',
  }

class Informacion extends Component{
    constructor() {
        super();
        this.state = {
            instrumentos
        }
    }

    render(){
        const parametroId = this.props.match.params.id;
        const instrumentoEncontrado = instrumentos.filter(instrumento => instrumento.id === parametroId);

        let envio;
        if(instrumentoEncontrado[0].costoEnvio === 'G'){
          envio = <Typography><LocalShippingIcon/> Envió gratis</Typography>;
        }else{
          envio = `Costo de Envio Interior de Argentina $${instrumentoEncontrado[0].costoEnvio}`;
        }

        return(
            <React.Fragment>
                <Navigation></Navigation>
                <Container>                   
                    <Grid container>
                        <Grid item xs={5}>
                            <Card style={{imagen}}>
                                <CardMedia
                                    component="img"
                                    alt={instrumentoEncontrado[0].nombre}
                                    image={require(`../img/${instrumentoEncontrado[0].imagen}`)}
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid style={descripcion} item xs={6}>
                            <Typography variant="h8" color="initial" component="p">
                            {instrumentoEncontrado[0].cantidadVendida} vendidos
                            </Typography>

                            <Typography gutterBottom variant="h4" component="overline">
                            {instrumentoEncontrado[0].instrumento}
                            </Typography>
          
                            <Typography variant="h2" color="h5" component="p" style={{marginTop:20}}>
                            $ {instrumentoEncontrado[0].precio}
                            </Typography>

                            <Typography variant="h7" color="h5" component="p" style={{marginTop:50}}>
                            Marca: {instrumentoEncontrado[0].marca}
                            </Typography>

                            <Typography variant="h7" color="h5" component="p" >
                            Modelo: {instrumentoEncontrado[0].modelo}
                            </Typography>

                            <Typography variant="h8" color="initial" component="p" style={{marginTop:30}}>
                            Costo Envio:
                            </Typography>
                            <Typography variant="h8" color="initial" component="p"> 
                            {envio}
                            </Typography>

                            
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="h9" color="h5" component="p">
                                Descripcion:
                            </Typography>
                            <Typography variant="h9" color="h5" component="p">
                                {instrumentoEncontrado[0].descripcion}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5} style={{marginTop:30}}>
                            <Button variant="outlined" color="primary">
                                Agregar al carrito
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment> 
        )
    }
}

export default Informacion;