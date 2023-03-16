import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";
import { useForm } from "react-hook-form";

function TodoForm({ handleCreate }) {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let todo = {
      ...data,
      completed: checked,
    };

    handleCreate(todo);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: "100%",
      }}
    >
      <Grid container direction="row" spacing={1} p={1}>
        <Grid item xs={6} md={3.5} mb={2}>
          <FormControl size="small">
            <TextField
              variant="outlined"
              label="Title"
              size="small"
              {...register("title")}
              name="title"
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} md={3.5} mb={2}>
          <FormControl size="small">
            <TextField
              variant="outlined"
              label="Description"
              size="small"
              {...register("description")}
              name="description"
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} md={3.5} mb={2}>
          <FormControl size="small">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    name="completed"
                  />
                }
                label="Completed"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} mb={2} container justifyContent="flex-end" ml={5}>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<SaveAsTwoToneIcon />}
              sx={{
                backgroundColor: "primaryGray.main",
                fontFamily: "Palanquin-Medium",
                fontWeight: 500,
                ":hover": {
                  backgroundColor: "primaryBlue.light",
                  color: "primaryGray.main",
                  fontFamily: "Palanquin-Regular",
                },
                textTransform: "none",
              }}
              type="submit"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default TodoForm;
