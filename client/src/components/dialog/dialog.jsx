import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import axios from "axios";
import "./dialog.css"

export default function FormDialog(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        nombre: props.nombre,
        costo: props.costo,
        categoria: props.categoria,
    });


    const handleEditValues = () => {
        console.log(props.baseUrl)
        axios.put(`http://localhost:3001/edit`, {
            id: editValues.id,
            nombre: editValues.nombre,
            costo: editValues.costo,
            categoria: editValues.categoria,
        });
        handleClose();

    }

    const handleDeleteGame = () => {
        axios.delete(`http://localhost:3001/delete/${editValues.id}`)
    }

    const handleChangeValues = (value)=>{
        setEditValues(prevValues=>({
                ...prevValues,
                [value.target.id]: value.target.value,
            })
        )
    }

    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <div>

            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nombre"
                        label="Title"
                        defaultValue={props.nombre}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="costo"
                        label="Costo"
                        defaultValue={props.costo}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="categoria"
                        label="Categoria"
                        defaultValue={props.categoria}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleEditValues}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
