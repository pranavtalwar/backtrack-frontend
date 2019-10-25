import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, 
            DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, TextField, InputLabel, Select, MenuItem
} from '@material-ui/core';
import Title from './Title';

const PBIList = (props) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [updateObj, setUpdateObj] = useState({
        name: '',
        description: '',
        estimate: '',
        priority: '',
        id: ''
    });
    const { pbis, deletePBI, updatePBI } = props;
    const priorityList = [1,2,3,4,5,6,7,8,9,10];

    const handleClickOpen = () => {
        setDialogOpen(true);
    };
    
    const handleClose = () => {
        setDialogOpen(false);
    };
    
    return (
        <React.Fragment>
        <Title>Product Backlog</Title>
        <Table size="small">
            <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {pbis.map(row => (
                <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>  
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.priority}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => deletePBI(row.id)}
                    >
                        Delete
                    </Button> 
                </TableCell>
                <TableCell>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setUpdateObj(
                                {
                                    id: row.id,
                                    name: row.name,
                                    description: row.description,
                                    priority: row.priority,
                                    estimate: row.estimate
                                }
                            );
                            handleClickOpen();
                        }}
                    >
                        Update
                    </Button> 
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        <Dialog open={dialogOpen} onClose={handleClose} maxWidth={"md"} fullWidth={true} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update PBI</DialogTitle>
            <DialogContent>
            <TextField
                value={updateObj.name}
                onChange={e => setUpdateObj({ ...updateObj, name: e.target.value })}
                autoFocus
                margin="dense" 
                fullWidth
                label="Name"
            />
            <br />
            <TextField 
                value={updateObj.description}
                onChange={e => setUpdateObj({ ...updateObj, description: e.target.value })}
                autoFocus
                margin="dense"
                fullWidth
                multiline
                label="Description"
            />
            <br />
            <br />
            <InputLabel>Priority</InputLabel>
            <Select
                onChange={e => setUpdateObj({ ...updateObj, priority: e.target.value })}
                value={updateObj.priority}
            >
                {
                priorityList.map(priorityItem => (
                    <MenuItem value={priorityItem}>{priorityItem}</MenuItem>
                ))
                }
            </Select> 
            <br />
            <br />
            <InputLabel>Estimate</InputLabel>
            <Select
                onChange={e => setUpdateObj({ ...updateObj, estimate: e.target.value })}
                value={updateObj.priority}
            >
                {
                priorityList.map(priorityItem => (
                    <MenuItem value={priorityItem}>{priorityItem}</MenuItem>
                ))
                }
            </Select>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={() => {
                updatePBI(updateObj.id, updateObj.name, updateObj.description, updateObj.estimate, updateObj.priority);
                handleClose();
                }
            } 
            color="primary">
                Update
            </Button>
            </DialogActions>
         </Dialog>
        </React.Fragment>
    );
}

export default PBIList;