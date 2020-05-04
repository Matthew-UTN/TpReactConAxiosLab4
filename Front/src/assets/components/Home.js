import React, {Component} from 'react';
import Navigation from './Navigation';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Home extends Component {

    render() {

        return(
            <React.Fragment>
                <Navigation></Navigation>
                <Container style={{marginTop:30}}>
                    <Paper>                  
                        <Typography variant="h4" color="initial" component="p" >
                            Musical Hendrix es una tienda de instrumentos 
                            musicales con ya más de 15 años de experiencia. 
                            Tenemos el conocimiento y la capacidad como para 
                            informarte acerca de las mejores elecciones para tu 
                            compra musical.
                        </Typography>
                    </Paper>
                </Container>
            </React.Fragment>
        )
    }
}

export default Home;