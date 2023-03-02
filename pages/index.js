import * as React from "react";
import Copyright from "../src/Copyright";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useData from "../src/useData";

export default function Index() {
  const { isLoading, returnData } = useData("todos");

  if (isLoading) {
    return (
      <Typography variant="h4" component="h1" gutterBottom align="center">
        ...Loading
      </Typography>
    );
  }
  return (
    <>
      <Grid container m={2} justifyContent="center" alignContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Todos example
          </Typography>
        </Grid>
        <Grid container m={5} justifyContent="center">
          <Grid item xs={8}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Completed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {returnData.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row._id}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell> {row.completed ? "True" : "False"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
      <Grid container m={5} justifyContent="center">
        <Copyright />
      </Grid>
    </>
  );
}
