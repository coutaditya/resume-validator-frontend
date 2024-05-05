import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
        light: blue[300],
        main: blue[500],
        dark: blue[700],
        darker: blue[900],
        },
    },
});

export default function ButtonAppBar() {
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" sx={{ width: 1, height: 100, backgroundColor: theme.palette.primary.darker, justifyContent: 'space-around'}}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center'}} onClick={()=>{
            navigate("/")
          }}>
            <Button color="inherit" sx={{ fontSize: '1.2rem', textTransform: 'none' }} onClick={()=>{
                navigate("/") 
            }}>Description</Button>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Button color="inherit" sx={{ fontSize: '1.2rem', textTransform: 'none' }} onClick={()=>{
                navigate("/resume-query") 
            }}>Resume Query</Button>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center'}}>
            <Button color="inherit" sx={{ fontSize: '1.2rem', textTransform: 'none' }} onClick={()=>{
                navigate("/resume-jd-comparison") 
            }}>Resume JD Comparator</Button>
          </Typography>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
    </Box>
  );
}
