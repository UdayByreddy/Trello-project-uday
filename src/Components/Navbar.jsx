/* eslint-disable no-unused-vars */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Trello from '../assets/Trello.gif'

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'black', color: 'white' }}>
        <Toolbar>
          <Link to={'/'}>
          <img src={Trello}
           alt={'trello logo'}
           style={{
            width:'auto',
            height:'30px',
            margin:'8px'
           }}
          
          />
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
