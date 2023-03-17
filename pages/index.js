import React, { useState } from "react";
import Copyright from "../src/components/Copyright";
import {
  Button,
  Dialog,
  DialogTitle,
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
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import UndoIcon from "@mui/icons-material/Undo";
import DoneIcon from "@mui/icons-material/Done";
import useData from "../src/useData";
import TodoForm from "../src/components/TodoForm";

export default function Index() {
  const { isLoading, returnData, getData, createData, updateData, deleteData } =
    useData("todos");
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = () => {
    setOpenDialog(false);
    getData("todos");
  };

  const handleCreate = async (formData) => {
    await createData("todos", formData);
    handleDialogClose();
  };

  const handleUpdate = async (id) => {
    await updateData("todos", id);
  };

  const handleDelete = async (id) => {
    await deleteData("todos", id);
  };

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
          <Grid item xs={8} container justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{ margin: 3 }}
              onClick={() => setOpenDialog(true)}
            >
              Add Todo
            </Button>
          </Grid>
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
                      <TableCell
                        sx={
                          row.completed
                            ? { textDecoration: "line-through" }
                            : {}
                        }
                      >
                        {row.title}
                      </TableCell>
                      <TableCell
                        sx={
                          row.completed
                            ? { textDecoration: "line-through" }
                            : {}
                        }
                      >
                        {row.description}
                      </TableCell>
                      <TableCell>{row.completed ? "True" : "False"}</TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <Grid container spacing={3}>
                          <Grid item>
                            {row.completed ? (
                              <UndoIcon
                                onClick={() => handleUpdate(row._id)}
                                sx={{
                                  color: "lightblue",
                                  ":hover": { color: "blue" },
                                }}
                              />
                            ) : (
                              <DoneIcon
                                onClick={() => handleUpdate(row._id)}
                                sx={{
                                  color: "lightgreen",
                                  ":hover": { color: "green" },
                                }}
                              />
                            )}
                          </Grid>
                          <Grid item>
                            <DeleteOutlinedIcon
                              onClick={() => handleDelete(row._id)}
                              sx={{
                                color: "pink",
                                ":hover": { color: "red" },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        onClose={handleDialogClose}
        open={openDialog}
        sx={{ padding: 1 }}
        maxWidth="md"
        fullWidth={true}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={10}>
            <DialogTitle
              sx={{
                fontWeight: 700,
              }}
            >
              Create Todo
            </DialogTitle>
          </Grid>
          <Grid
            item
            xs={2}
            container
            justifyContent="flex-end"
            onClick={() => handleDialogClose()}
            sx={{
              padding: 1,

              fontWeight: 500,
              ":hover": {
                color: "primaryGray.main",

                cursor: "pointer",
              },
              textTransform: "none",
            }}
          >
            <CloseIcon />
          </Grid>
        </Grid>
        <TodoForm handleCreate={handleCreate} />
      </Dialog>
      <Grid container m={5} justifyContent="center">
        <Copyright />
      </Grid>
    </>
  );
}
