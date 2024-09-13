import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Grid2,
} from "@mui/material";

export const Form = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    containerHeight: "",
    containerWidth: "",
    itemWidth: "",
    itemHeight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Formulário de Cadastro
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid2
            container
            spacing={2}
            justifyContent="center" // Centraliza horizontalmente
            alignItems="center"
          >
            <Grid2 item xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                id="containerHeight"
                label="Altura do container"
                name="containerHeight"
                autoComplete="containerHeight"
                autoFocus
                value={formData.containerHeight}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                id="containerWidth"
                label="Largura do container"
                name="containerWidth"
                autoComplete="containerWidth"
                autoFocus
                value={formData.containerWidth}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                id="itemHeight"
                label="Altura do item"
                name="itemHeight"
                autoComplete="itemHeight"
                autoFocus
                value={formData.itemHeight}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                id="itemWidth"
                label="Largura do item"
                name="itemWidth"
                autoComplete="itemWidth"
                autoFocus
                value={formData.itemWidth}
                onChange={handleChange}
              />
            </Grid2>
          </Grid2>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          >
            Gerar Mapa
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Form;
