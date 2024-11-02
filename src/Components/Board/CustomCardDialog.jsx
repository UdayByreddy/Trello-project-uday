/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import toast from 'react-hot-toast';
import { Box, Button, IconButton, Modal, Paper, InputBase, Typography } from '@mui/material';

import Checklist from './CheckList';
import { getChecklists, createChecklist, deleteChecklist } from '../../CrudOperation';
import theme from '../styles/theme';

export default function CustomCardDialog({ isOpen, setModalState, cardData, setLoaderState }) {
  const [checklists, setChecklists] = useState([]);
  const checklistInputRef = useRef(null);

  useEffect(() => {
    const fetchChecklists = async () => {
      try {
        setLoaderState(true);
        const lists = await getChecklists(cardData.id);
        setChecklists(lists);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoaderState(false);
      }
    };

    if (isOpen) {
      fetchChecklists();
    }
  }, [cardData.id, isOpen, setLoaderState]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const checklistName = checklistInputRef.current.value.trim();

    if (checklistName.length <= 2) {
      toast.error("Checklist name should be more than 2 characters.");
      return;
    }

    try {
      setLoaderState(true);
      const createdChecklist = await createChecklist(checklistName, cardData.id);
      setChecklists((prevChecklists) => [...prevChecklists, createdChecklist]);
      toast.success(`${checklistName} created successfully!`);
      checklistInputRef.current.value = "";
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoaderState(false);
    }
  };

  const handleDeleteChecklist = async (checklistId) => {
    const originalChecklists = [...checklists];
    const updatedChecklists = checklists.filter((checklist) => checklist.id !== checklistId);

    setChecklists(updatedChecklists);

    try {
      setLoaderState(true);
      await deleteChecklist(checklistId);
    } catch (error) {
      toast.error(error.message);
      setChecklists(originalChecklists);
    } finally {
      setLoaderState(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setModalState(false)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(5px)',
      }}
    >
      <Paper
        sx={{
          position: 'relative',
          width: { md: '60%', xs: "90%" },
          maxHeight: '90%',
          maxWidth: "800px",
          overflow: 'auto',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: theme.palette.primary.main,
          border: 1,
          borderColor: theme.palette.primary.main,
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            color: theme.palette.secondary.main,
            width: "48px",
            height: "48px",
          }}
          onClick={() => setModalState(false)}
        >
          <FontAwesomeIcon icon={faXmark} style={{ color: theme.palette.secondary.main }} />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            pb: 1,
            mb: 2,
            color: theme.palette.secondary.main
          }}
        >
          {cardData.name}
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <InputBase
            placeholder="Checklist"
            inputRef={checklistInputRef}
            sx={{
              backgroundColor: '#22272B',
              color: theme.palette.secondary.main,
              px: 4,
              py: 1,
              borderRadius: '5px',
              flex: 1,
              minHeight: "32px",
              width: "100px"
            }}
            autoFocus
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ minWidth: '40px', minHeight: '48px' }}
          >
            ADD
          </Button>
        </form>
        <Box
          sx={{
            mt: 2,
            overflowY: 'auto',
            maxHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {checklists.map((checklist) => (
            <Checklist
              data={checklist}
              key={checklist.id}
              deleteChecklist={() => handleDeleteChecklist(checklist.id)}
              setLoaderState={setLoaderState}
            />
          ))}
        </Box>
      </Paper>
    </Modal>
  );
}

