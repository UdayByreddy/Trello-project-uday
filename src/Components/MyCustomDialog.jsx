/* eslint-disable no-undef */
import { Dialog, DialogActions, DialogTitle, TextField,Button} from "@mui/material";
import PropTypes from "prop-types"; 
import React from "react";

export default function MyCustomDialog({ open, onClose, onChange,name='Create' }) {
    const [inputValue, setInputValue] = React.useState('');
  
    return (
      <Dialog fullWidth open={open} onClose={onClose}>
        <DialogTitle>{name}</DialogTitle>
        <TextField
          label="Your Label"
          variant="outlined"
          margin="normal"
          style={{ width: '60%', marginLeft: '20px' }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <DialogActions>
          <Button
            onClick={() => {
              if (inputValue.trim()) {
                onChange(inputValue);
                setInputValue('');
                onClose();
              }
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  MyCustomDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    name:PropTypes.string.isRequired
  };