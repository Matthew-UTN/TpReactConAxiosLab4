import React, {Component} from 'react';
import Navigation from './Navigation';
import axios from 'axios';
import Tarjeta from './Tarjeta';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';



class Home extends Component {

    constructor() {
        super();
        this.state = {
            instrumentosDB: [],
        }
    }

    componentDidMount() {
        let instrumentosData = [];
        axios.get(`http://localhost:9001/api/v1/instrumentos/`)
            .then(res => {
                console.log(res.data); // res.data has the info that was brought by the GET method
                instrumentosData = res.data.map((mover) => {// i use map as the for each to save array to a local variable to be used later
                    return mover
                });
                this.setState({
                    instrumentosDB: instrumentosData,// Once out of the component did mount instrumentoData will no longer exist
                })
                console.log(this.state.instrumentosDB);
            })
    }

    render() {

        const instrumentos = this.state.instrumentosDB.map((instrumentos, i) => { // this saves everything from the json to a local variable
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
        });
        
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