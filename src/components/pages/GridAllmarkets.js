import React, { useState, useEffect, useRef } from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './GridAllmarkets.css'
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'grid', placeItems:'center',
 height:'180px',
  
}));

export default function ResponsiveGrid() {
  return (
     <div className="responsiveGrid">

      <Grid  container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 4, md: 12 }}>
    
          <Grid 
         xs={1}
          item>
            <Item style={{
                backgroundImage: 'url(https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-pro-12-2020-1.jpg)', 
                backgroundPosition: 'center',
                backgroundSize: '170px',
                backgroundRepeat: 'no-repeat'
            
                }}></Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>

          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>xs=2</Item>
          </Grid>
         
    
         

      </Grid>
 
      </div>
  );
}