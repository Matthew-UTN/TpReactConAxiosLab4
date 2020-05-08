import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

var cardStyle = { // Fix this so there is only one style
  width: '400px', 
  marginTop: '20px', 
  marginBottom:'20px',
  marginRight:'20px',
}
var cardStyle2 = {
  maxHeight:'500px',
  width: '400px', 
  marginTop: '20px', 
  marginBottom:'20px',
}

class Tarjeta extends Component {

  render(){
    let envio;
    if( this.props.costoEnvio === 'G'){
      envio = <Typography style={{ color: 'green'}}><LocalShippingIcon/> Envió gratis a todo el país</Typography>; // uso el icono de react material
    }else{
      envio = `Costo de Envio Interior de Argentina $${this.props.costoEnvio}`;
    }

    //CardActionArea is the clickable part

    return(
    <React.Fragment>
      <Grid item xs={3}>
      <Card style={cardStyle2}>
        <CardActionArea style={cardStyle} href={`detalleInstrumento/${this.props.id}`}> 
          <CardMedia
            component="img"
            alt={this.props.nombre}
            image={require(`../../../../Back/imagenes/${this.props.imagen}`)}

          />
        </CardActionArea>
      </Card>
      </Grid>
      
      <Grid item xs={3}>
      <Card style={cardStyle}>
        <CardContent style={{height: 440}}>

          <Typography gutterBottom variant="h5" component="h2" style={{marginTop:50}}>
          {this.props.nombre}
          </Typography>
          
          <Typography variant="h4" color="primary" component="p" style={{marginTop:20}}>
          ${this.props.precio}
          </Typography>

          <Typography variant="h6" color="initial" component="p" style={{marginTop:20}}>
          {envio}
          </Typography>

          <Typography variant="h6" color="secondary" component="p" style={{marginTop:20}}>
          {this.props.cantidadVendida} vendidos
          </Typography>

        </CardContent>

    </Card>
    </Grid>
    
    </React.Fragment>
  );
  }
}

export default Tarjeta;