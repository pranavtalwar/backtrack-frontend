import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Title from './Title';

const PBIList = (props) => {
  const { pbis, deletePBI } = props;
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
            <TableCell>Estimate</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default PBIList;