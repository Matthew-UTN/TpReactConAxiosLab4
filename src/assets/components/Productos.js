import React, {Component} from 'react';
import Navigation from './Navigation';
import {instrumentos} from '../datos/instrumentos.json';
import Tarjeta from './Tarjeta';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';



class Home extends Component {
    constructor() {
        super();
        this.state = {
            instrumentos
        }
    }

    render() {
        const instrumentos = this.state.instrumentos.map((instrumentos, i) => {
            return ( 
            <Tarjeta 
                key = {
                    instrumentos.id
                }
                id = {
                    instrumentos.id
                }
                nombre = {
                    instrumentos.instrumento
                }
                marca = {
                    instrumentos.marca
                }
                modelo = {
                    instrumentos.modelo
                }
                imagen = {
                    instrumentos.imagen
                }
                precio = {
                    instrumentos.precio
                }
                costoEnvio = {
                    instrumentos.costoEnvio
                }
                cantidadVendida = {
                    instrumentos.cantidadVendida
                }
                descripcion = {
                    instrumentos.descripcion
                }> </Tarjeta>
            )
        })

        return(
            <React.Fragment>
                <Navigation></Navigation>
                <Container style={{maxWidth: '1800px'}}>
                    <Grid container>
                        {instrumentos}
                    </Grid>
                </Container>
            </React.Fragment>
        )
    }
}

export default Home;