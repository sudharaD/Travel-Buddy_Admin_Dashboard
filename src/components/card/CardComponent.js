import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function CardComponent(props) {

  const { dis, id, editHandler, pic, mainHeader} = props

  return (
    <Card onClick={()=>editHandler(id)}  sx={{ display: 'flex' ,  width: '350px', height: '11rem' , cursor:'pointer'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {mainHeader}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            { dis}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          
        </Box>
      </Box>
      <CardMedia
        style={{flex:1}}
        component="img"
        sx={{ width: 151 }}
        image={pic}
        alt="Live from space album cover"
      />
    </Card>
  );
}
