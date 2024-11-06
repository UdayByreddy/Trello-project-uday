/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Button, Grid, Paper } from '@mui/material';

import ResponsiveCardLayout from './ResponsiveCardLayout';
import MyCustomDialog from './MyCustomDialog';
import theme from './styles/theme';
import Loader from './ErrorHandler/Loader';
import toast from 'react-hot-toast';
import { useDispatch,useSelector } from 'react-redux';
import { fetchBoards,createBoards } from '../Features/BoardsSlice';

import backgroundImage from '../assets/backgroundImage.webp';

function Boards() {
  const [openDialog, setOpenDialog] = useState(false);

  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();

  const {boards} = useSelector((state)=>state.boards);


  const createHandler = async (inputValue) => {
    try {
      await dispatch(createBoards(inputValue));
      setOpenDialog(false);
      toast.success(`${inputValue} created successfully!`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    dispatch(fetchBoards());
    setLoader(false);
  }, [dispatch]);

  return (
    <Paper
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        maxWidth:'100vw',
        overflowX:'hidden',
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        sx={{
          fontWeight: "bold",
          borderRadius: "40px",
          py: 2,
          px: 6,
          m:5,
          backgroundColor: theme.palette.primary.accent,
          color: theme.palette.primary.dark,
          "&:hover": {
              backgroundColor:
                  theme.palette.primary.accent,
              color: theme.palette.primary.dark,
          },
      }}
      >
        Create Board
      </Button>
      <Grid container spacing={2} sx={{m:2}}>
        {boards.map((item) => (
          <Grid item xs={8} sm={6} md={4} key={item.id}>
            <Link
              to={`border/${item.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ResponsiveCardLayout item={item.name} />
            </Link>
          </Grid>
        ))}
      </Grid>
      <MyCustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onChange={createHandler}
        name={'Create Board'}
      />
         {loader && <Loader />}
    </Paper>
  );
}

export default Boards;
