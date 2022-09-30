//Defines the Dropdown in UserView to update favorite color
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { User } from '../libs/Types'


const Dropdown = ({ _id, fullname, color, connections }: User) => {
    const [usercolor, setColor] = React.useState(color);
    const [open, setOpen] = React.useState(false);

    //method to update user favorite color in data through API call
    const updateColor = (event: SelectChangeEvent) => {
        const newColor = (event.target.value as string);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullname: fullname, color: newColor, connections: connections })
        };
        fetch(`http://localhost:8000/api/projects/${_id}`, requestOptions)
            .then(response => response.json())
            .then(data => { setColor(newColor); setOpen(true) });
    }

    //method to handle close button click in the snackbar message component
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    //UI component to display close button in the snackbar message component
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <>
        {/* Dropdown select UI component to enable user update favorite color */}
            <Box sx={{ minWidth: 30 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Color</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={usercolor}
                        label="Color"
                        onChange={updateColor}
                        style={{ color: usercolor }}
                    >
                        <MenuItem value={'red'} style={{ color: 'red' }}>Red</MenuItem>
                        <MenuItem value={'green'} style={{ color: 'green' }}>Green</MenuItem>
                        <MenuItem value={'blue'} style={{ color: 'blue' }}>Blue</MenuItem>
                        <MenuItem value={'black'} style={{ color: 'black' }}>Black</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {/* Snackbar UI component to display color update message at bottom center of the User View page */}
            <Snackbar
                open={open}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                autoHideDuration={1000}
                message="Favorite color updated"
                action={action}
            />
        </>
    );
}
export default Dropdown;