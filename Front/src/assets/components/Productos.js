import React, {Component} from 'react';
import Navigation from './Navigation';
import Tarjeta from './Tarjeta';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Service } from "./service";

const customStyles = {
    content : {
    top: '100px',
    left: '400px',
    right: '400px',
    bottom: 'auto',
    }
};

class Home extends Component {

    constructor() {
        super();
        this.state = {
            instrumentosDB: [],
            showModal: false,
            isOpen: false,
            exampleInstrumento:"",
            instrumento : null,
            marca : null,
            modelo : null,
            imagen : null,
            precio : null,
            costoEnvio : null,
            cantidadVendida : null,
            descripcion :null   
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.Service = new Service();
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }
      
    handleCloseModal () {
        this.setState({ showModal: false });
        console.log(this.state.exampleInstrumento)
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({
            [target.name]: value
        });
        console.log(target.name);
    }

    handleSubmit = (event) => {

        event.preventDefault();
        this.Service.save({
            "instrumento":this.state.instrumento,
            "marca": this.state.marca,
            "modelo": this.state.modelo,
            "imagen": this.state.imagen,
            "precio": this.state.precio,
            "costoEnvio": this.state.costoEnvio,
            "cantidadVendida": this.state.cantidadVendida,
            "descripcion": this.state.descripcion
        }).then(res => {
            debugger;
            this.setState({ // actualiza la pagina sin hacer un refresh
                instrumentosDB: this.state.instrumentosDB.concat({
                    "id": res.id,
                    "instrumento": this.state.instrumento,
                    "marca": this.state.marca,
                    "modelo": this.state.modelo,
                    "imagen": this.state.imagen,
                    "precio": this.state.precio,
                    "costoEnvio": this.state.costoEnvio,
                    "cantidadVendida": this.state.cantidadVendida,
                    "descripcion": this.state.descripcion
                })
              })
            alert("Producto agregado");
        })
        this.handleCloseModal();
    }

      

    componentDidMount() {
        this.Service.getAll()
            .then(res => {
                this.setState({
                    instrumentosDB: res,// Once out of the component did mount instrumentoData will no longer exist
                })
                console.log(this.state.instrumentosDB);
            })
    }

    render() {

        const instrumentos = this.state.instrumentosDB.map((instrumentos, i) => { // this saves everything from the mysql request to a local variable
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

//<Input type="text" name="descripcion" value={this.state.descripcion} onChange={this.handleInputChange} placeholder="Descripcion" />
        return(
            <React.Fragment>
                <Navigation></Navigation>

                <Container style={{maxWidth: '1800px'}}>
                    <Grid container>
                        <Button variant="outlined" style={{marginTop: '30px', background: 'rgb(63, 81, 181)', color:'white'}} onClick={this.handleOpenModal}>
                            Agregar nuevo producto
                        </Button>
                        <Modal isOpen={this.state.showModal} contentLabel="modal" style={customStyles} onRequestClose={this.handleCloseModal}>
                        <Form>
                            <FormGroup row>
                                <Label for="exampleInstrumento" sm={2}>Nombre del instrumento:</Label>
                                <Col sm={10}>
                                    <Input type="text" name="instrumento" value={this.state.instrumento} onChange={this.handleInputChange} placeholder="Instrumento" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleMarca" sm={2}>Marca:</Label>
                                <Col sm={10}>
                                    <Input type="text" name="marca" value={this.state.marca} onChange={this.handleInputChange} placeholder="Marca" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleModelo" sm={2}>Modelo:</Label>
                                <Col sm={10}>
                                    <Input type="text" name="modelo" value={this.state.modelo} onChange={this.handleInputChange} placeholder="Modelo" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleimagen" sm={2}>Nombre del imagen:</Label>
                                <Col sm={10}>
                                    <Input type="text" name="imagen" value={this.state.imagen} onChange={this.handleInputChange} placeholder="Nombre del imagen" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="examplePrecio" sm={2}>Precio:</Label>
                                <Col sm={10}>
                                    <Input type="text" name="precio" value={this.state.precio} onChange={this.handleInputChange} placeholder="Precio" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleCosto" sm={2}>Costo de envio:</Label>
                                <Col sm={10}>
                                    <Input type="text" name="costoEnvio" value={this.state.costoEnvio} onChange={this.handleInputChange} placeholder="Costo" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleVendidas" sm={2}>Cantidad de items vendidos:</Label>
                                <Col sm={10}>
                                    <Input type="text" name="cantidadVendida" value={this.state.cantidadVendida} onChange={this.handleInputChange} placeholder="Vendidas" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleDescripcion" sm={2}>Descripcion:</Label>
                                <Col sm={10}>
                                    <textarea name="descripcion" value={this.state.descripcion} onChange={this.handleInputChange} placeholder="Descripcion" style={{width:'100%'}}/>
                                </Col>
                            </FormGroup>
                        </Form>
                            <Button variant="outlined" style={{ background: 'rgb(63, 81, 181)', color:'white'}} onClick={this.handleSubmit}> Submit </Button>
                            <Button variant="outlined" style={{ background: 'rgb(63, 81, 181)', color:'white', marginLeft:'20px'}} onClick={this.handleCloseModal}> Close </Button>
                        </Modal>
                         
                    </Grid>
                    <Grid container>
                        {instrumentos}
                    </Grid>
                
                </Container>
            </React.Fragment>
        )
    }
}

export default Home;