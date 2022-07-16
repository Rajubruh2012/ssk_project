import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia, Grid, Paper, Stack } from "@mui/material";

export default function Cards({ ticket }) {
  let img =
    `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=` +
    `Ticket Number: ${ticket.id} \n Name:  ${ticket.fields.Name} \n Gender : ${
      ticket.fields.Gender
    } (${ticket.fields.Child ? "Child" : "Adult"})`;
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Paper variant="outlined" sx={{ backgroundColor: "rgb(221,221,221)" }}>
        <Stack spacing={1} padding={2}>
          <Box sx={{ fontSize: 14, fontWeight: "500" }}>
            Name: {ticket.fields.Name}
          </Box>
          <Box sx={{ fontSize: 14, fontWeight: "500" }}>
            Gender: {ticket.fields.Gender}{" "}
            {ticket.fields.Child ? "(child)" : "(adult)"}
          </Box>
          <Box sx={{ fontSize: 14, fontWeight: "500" }}>
            Ticket ID: {ticket.id}
          </Box>
        </Stack>
        <Box>
          <Box
            component="img"
            src={img}
            alt="Bar Code"
            sx={{ padding: "10px", height: "100px", width: "100px" }}
          />
        </Box>
      </Paper>
    </Grid>
  );
}
