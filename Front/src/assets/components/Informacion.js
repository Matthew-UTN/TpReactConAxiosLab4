import React, {Component} from 'react';
import Navigation from './Navigation';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { Grid } from '@material-ui/core';
import { confirmAlert } from 'react-confirm-alert';
import Modal from 'react-modal';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Service } from "./service";
import 'react-confirm-alert/src/react-confirm-alert.css';


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

const customStyles = {
    content : {
    top: '100px',
    left: '400px',
    right: '400px',
    bottom: 'auto',
    }
};

class Informacion extends Component{
    constructor() {
        super();
        this.state = {
            tempInstrumento: "",
            selectedimagen: null,
            FormGlobal: new FormData(),
            tempMarca: "",
            tempModelo: "",
            tempImagen: "blank.jpg",
            tempPrecio: "",
            tempCostoEnvio: "",
            tempCantidadVendida: "",
            tempDescripcion: "",
            instrumentoEncontrado:{ //Para iniciar la pagina
                "instrumento": "",
                "marca": "",
                "modelo": "",
                "imagen": "blank.jpg",
                "precio": "",
                "costoEnvio": "",
                "cantidadVendida": "",
                "descripcion": ""
            },
            
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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


    handleInputChange(event) {// para guardar lo que esta escribiendo el usuario
        const target = event.target;
        debugger;
        const value = target.value;

        this.setState({
            [target.name]: value
        });
        console.log(target.name);
    }

    confirm = () => {
        confirmAlert({ // un componente de react especial
          title: '¿Eliminar?',
          message: '¿Estas seguro de eliminar este producto?',
          buttons: [
            {
              label: 'Si',
              onClick: () => this.handleDelete()
            },
            {
              label: 'No',  
            }
          ]
        });
    };


    handleDelete = () => {
        console.log(this.state.instrumento) //to see if i have the right instrument
        const id =this.props.match.params.id;
        debugger;
        this.Service.delete(id)
        .then(
            alert("Producto eliminado exitosamente"),
            this.props.history.push("/home")
        )
    }

    handleSubmit = () => {

        debugger;
        this.Service.update(this.props.match.params.id,{
            "id": this.props.match.params.id,
             "instrumento":this.state.tempInstrumento,
             "marca": this.state.tempMarca,
             "modelo": this.state.tempModelo,
             "imagen": this.state.tempImagen,
             "precio": this.state.tempPrecio,
             "costoEnvio": this.state.tempCostoEnvio,
             "cantidadVendida": this.state.tempCantidadVendida,
             "descripcion": this.state.tempDescripcion
         }).then(res => {
            this.setState({ // esto actualiza la pagina sin hacer un refresh
                instrumentoEncontrado:{
                    instrumento:this.state.tempInstrumento,
                    marca: this.state.tempMarca,
                    modelo: this.state.tempModelo,
                    imagen: this.state.tempImagen,
                    precio: this.state.tempPrecio,
                    costoEnvio: this.state.tempCostoEnvio,
                    cantidadVendida: this.state.tempCantidadVendida,
                    descripcion: this.state.tempDescripcion
                },
            })
            alert("Producto modificado exitosamente");
        })
        this.Service.saveImage(this.state.FormGlobal)
            .then(res => {
                    console.log(res);
            })
        this.handleCloseModal();
    }

    uploadImagen = (e) => {
        e.preventDefault();
      
          const selectedFile= e.target.files[0];
      
          console.log(selectedFile)
        
          const formData = new FormData();
  
          formData.append('imagen', selectedFile);
  
          console.log(formData.get('imagen'))
  
          this.setState({
              selectedimagen: selectedFile.name,
              FormGlobal : formData
          })
  
          console.log(this.state.FormGlobal.get('imagen'))
      
      };

    componentDidMount() {
        this.Service.getOne(this.props.match.params.id)
            .then(res => {
                this.setState({
                    instrumentoEncontrado: res,
                    tempInstrumento: res.instrumento,
                    tempMarca: res.marca,
                    tempModelo: res.modelo,
                    tempImagen: res.imagen,
                    tempPrecio: res.precio,
                    tempCostoEnvio: res.costoEnvio,
                    tempCantidadVendida: res.cantidadVendida,
                    tempDescripcion: res.descripcion
                })
                console.log(this.state.instrumentoEncontrado);
                console.log(this.state.tempInstrumento);
        }) 
    }

    render(){
        let envio;
        if(this.state.instrumentoEncontrado.costoEnvio === 'G'){
          envio = <Typography style={{color:'green'}} ><LocalShippingIcon/> Envió gratis</Typography>; // uso el icono de react material
        }else{
          envio = `Costo de Envio Interior de Argentina $${this.state.instrumentoEncontrado.costoEnvio}`;
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
                                    image={require(`../../../../Back/imagenes/${this.state.instrumentoEncontrado.imagen}`)}
                                    alt={this.state.instrumentoEncontrado.nombre}
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid style={descripcion} item xs={6}>

                            
                            <Typography variant="h8" color="initial" component="p">
                            {this.state.instrumentoEncontrado.cantidadVendida} vendidos
                            </Typography>

                            <Typography gutterBottom variant="h4" component="overline">
                            {this.state.instrumentoEncontrado.instrumento}
                            </Typography>
          
                            <Typography variant="h2" color="h5" component="p" style={{marginTop:20}}>
                            $ {this.state.instrumentoEncontrado.precio}
                            </Typography>

                            <Typography variant="h7" color="h5" component="p" style={{marginTop:50}}>
                            Marca: {this.state.instrumentoEncontrado.marca}
                            </Typography>

                            <Typography variant="h7" color="h5" component="p" >
                            Modelo: {this.state.instrumentoEncontrado.modelo}
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
                                {this.state.instrumentoEncontrado.descripcion}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5} style={{marginTop:30}}>
                            <Button variant="outlined" color="primary">
                                Agregar al carrito
                            </Button>
                            <Button variant="outlined" style={{ background: 'rgb(63, 81, 181)', color:'white', marginLeft:'20px'}} onClick={this.confirm}> Eliminar </Button>
                            <Button variant="outlined" style={{ background: 'rgb(63, 81, 181)', color:'white', marginLeft:'20px'}} onClick={this.handleOpenModal}> Modificar </Button>

                            <Modal isOpen={this.state.showModal} contentLabel="modal" style={customStyles} onRequestClose={this.handleCloseModal}>
                                <Form>
                                    <FormGroup row>
                                        <Label for="exampleInstrumento" sm={2}>Nombre del instrumento:</Label>
                                        <Col sm={10}>
                                            <Input type="text" name="tempInstrumento" Value={this.state.instrumentoEncontrado.instrumento} onChange={this.handleInputChange} placeholder="Instrumento" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleMarca" sm={2}>Marca:</Label>
                                        <Col sm={10}>
                                            <Input type="text" name="tempMarca" defaultValue={this.state.instrumentoEncontrado.marca} onChange={this.handleInputChange} placeholder="Marca" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleModelo" sm={2}>Modelo:</Label>
                                        <Col sm={10}>
                                            <Input type="text" name="tempModelo" defaultValue={this.state.instrumentoEncontrado.modelo} onChange={this.handleInputChange} placeholder="Modelo" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row encType="multipart/form-data">
                                        <Label for="exampleimagen" sm={2}>Nombre del imagen:</Label>
                                        <Col sm={10}>
                                            <Col sm={8}>
                                                <Input type="file" name="imagen" id="imagen" onChange={this.uploadImagen} title="Seleccione una imagen:" />
                                            </Col>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="examplePrecio" sm={2}>Precio:</Label>
                                        <Col sm={10}>
                                            <Input type="text" name="tempPrecio" defaultValue={this.state.instrumentoEncontrado.precio} onChange={this.handleInputChange} placeholder="Precio" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleCosto" sm={2}>Costo de envio:</Label>
                                        <Col sm={10}>
                                            <Input type="text" name="tempCostoEnvio" defaultValue={this.state.instrumentoEncontrado.costoEnvio} onChange={this.handleInputChange} placeholder="Costo" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleVendidas" sm={2}>Cantidad de items vendidos:</Label>
                                        <Col sm={10}>
                                            <Input type="text" name="tempCantidadVendida" defaultValue={this.state.instrumentoEncontrado.cantidadVendida} onChange={this.handleInputChange} placeholder="Vendidas" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleDescripcion" sm={2}>Descripcion:</Label>
                                        <Col sm={10}>
                                            <textarea name="tempDescripcion" defaultValue={this.state.instrumentoEncontrado.descripcion} onChange={this.handleInputChange} placeholder="Descripcion" style={{width:'100%'}}/>
                                        </Col>
                                    </FormGroup>
                                </Form>
                                <Button variant="outlined" style={{ background: 'rgb(63, 81, 181)', color:'white'}} onClick={this.handleSubmit}> Submit </Button>
                                <Button variant="outlined" style={{ background: 'rgb(63, 81, 181)', color:'white', marginLeft:'20px'}} onClick={this.handleCloseModal}> Cerrar </Button>
                            </Modal>

                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment> 
        )
    }
}

export default Informacion;