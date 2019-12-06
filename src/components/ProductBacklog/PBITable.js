import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, 
         DialogTitle, Table, TableBody, TableCell, TableHead, 
         TableRow, TextField, InputLabel, Select, MenuItem,
         Typography
} from '@material-ui/core';

const PBITable = (props) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [updateObj, setUpdateObj] = useState({
        name: '',
        description: '',
        storyPoint: '',
        priority: '',
        id: ''
    });
    const { pbis, deletePBI, updatePBI, priorityList, storyPointList, checker } = props;

    const handleClickOpen = () => {
        setDialogOpen(true);
    };
    
    const handleClose = () => {
        setDialogOpen(false);
    };
    
    return (
        <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Product Backlog
        </Typography>
        <Table size="small">
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Story Point</TableCell>
                <TableCell>Sprint ID</TableCell>
                <TableCell>Status</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {pbis.map(row => (
                <TableRow key={row.id}> 
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.priority}</TableCell>
                    <TableCell>{row.story_points}</TableCell>
                    {row.sprint_id ? <TableCell>{row.sprint_id}</TableCell> : <TableCell>Not Assigned</TableCell>}
                    <TableCell>{row.status}</TableCell>
                <TableCell>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => deletePBI(row.id)}
                        disabled={!checker || (row.sprint_id && row.status!=="Incomplete" && true)}
                    >
                        Delete
                    </Button> 
                </TableCell>
                <TableCell>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!checker || (row.sprint_id && row.status!=="Incomplete" && true)}
                        onClick={() => {
                            setUpdateObj(
                                {
                                    id: row.id,
                                    name: row.name,
                                    description: row.description,
                                    priority: row.priority,
                                    storyPoint: row.story_points
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
            <InputLabel>Story Point</InputLabel>
            <Select
                onChange={e => setUpdateObj({ ...updateObj, storyPoint: e.target.value })}
                value={updateObj.storyPoint}
            >
                {
                    storyPointList.map(storyPoint => (
                    <MenuItem value={storyPoint}>{storyPoint}</MenuItem>
                ))
                }
            </Select>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={() => {
                updatePBI(updateObj.id, updateObj.name, updateObj.description, updateObj.storyPoint, updateObj.priority);
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

export default PBITable;