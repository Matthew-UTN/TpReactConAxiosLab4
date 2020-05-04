import React, {Component} from 'react';
import Navigation from './Navigation';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { Grid } from '@material-ui/core';
import axios from 'axios';

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
            instrumentoEncontrado:[{
                "id":"0",
                "instrumento": "",
                "marca": "",
                "modelo": "",
                "imagen": "blank.jpg",
                "precio": "",
                "costoEnvio": "",
                "cantidadVendida": "",
                "descripcion": ""
            }]
        }
    }

    componentDidMount() {
        let instrumentosData = [];
        const parametroId = this.props.match.params.id;
        axios.get(`http://localhost:9001/api/v1/instrumentos/`)
            .then(res => {
                console.log(res.data); // res.data has the info that was brought by the GET method
                instrumentosData = res.data.map((mover) => {// i use map as the for each to save array to a local variable to be used later
                    return mover
                });
                console.log(parametroId);
                const temp = instrumentosData.filter(instrumento => instrumento.id.toString() === parametroId)
                this.setState({
                    instrumentoEncontrado: temp,// Once out of the component did mount instrumentoData will no longer exist
                })
                console.log(this.state.instrumentoEncontrado);
            })
    }

    render(){
        let envio;
        if(this.state.instrumentoEncontrado[0].costoEnvio === 'G'){
          envio = <Typography style={{color:'green'}} ><LocalShippingIcon/> Envió gratis</Typography>;
        }else{
          envio = `Costo de Envio Interior de Argentina $${this.state.instrumentoEncontrado[0].costoEnvio}`;
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
                                    image={require(`../img/${this.state.instrumentoEncontrado[0].imagen}`)}
                                    alt={this.state.instrumentoEncontrado[0].nombre}
                                    
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid style={descripcion} item xs={6}>
                            <Typography variant="h8" color="initial" component="p">
                            {this.state.instrumentoEncontrado[0].cantidadVendida} vendidos
                            </Typography>

                            <Typography gutterBottom variant="h4" component="overline">
                            {this.state.instrumentoEncontrado[0].instrumento}
                            </Typography>
          
                            <Typography variant="h2" color="h5" component="p" style={{marginTop:20}}>
                            $ {this.state.instrumentoEncontrado[0].precio}
                            </Typography>

                            <Typography variant="h7" color="h5" component="p" style={{marginTop:50}}>
                            Marca: {this.state.instrumentoEncontrado[0].marca}
                            </Typography>

                            <Typography variant="h7" color="h5" component="p" >
                            Modelo: {this.state.instrumentoEncontrado[0].modelo}
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
                                {this.state.instrumentoEncontrado[0].descripcion}
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