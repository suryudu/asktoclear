import React from 'react';
import "./UpdateCard.css";
import axios from 'axios';
import download from 'downloadjs';
// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
      maxWidth: 500,
    },
    media: {
      height: 300,
      width:500,
    },
  });

export default function UpdateCard(props) {
    const event=props.event;
    const classes = useStyles();


    const downloadFile = async () => {
        await axios
                .get('https://asktoclearbackend.herokuapp.com/download/'+event._id,{responseType:'blob'})
                .then(res=>{
                    return download(res.data,event.name,event.mimetype)
                }).catch(err=>{
                    console.log('getting from error');
                })
       
      };

     

    return (
        <>
        <Grid item xs={12} sm={6}>
          
        
        <Card className={classes.root}>
      <CardActionArea>
      <div style={{display:'flex',justifyContent:'space-between',color:'#039be5 '}}>
      <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'left',marginLeft:'3%'}}>
      {event.postedBy.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'right',marginRight:'3%'}}>
            {event.date}
          </Typography>
      </div>
        
        <CardMedia
          className={classes.media}
          image={`https://asktoclearbackend.herokuapp.com/${event.file_path}`}
          title={event.name}
        />
        <CardContent>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'left'}}>
        {event.name}
      </Typography>
      <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'right'}}>
            {event.organizer}
          </Typography>
        </div>
          
          <Typography variant="body2" color="textSecondary" component="p" >
            {event.info}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" >
            Contacts : {event.contacts}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={()=>downloadFile()}>
          Download
        </Button>
      </CardActions>
    </Card>
    </Grid>
        </>
    )
}
