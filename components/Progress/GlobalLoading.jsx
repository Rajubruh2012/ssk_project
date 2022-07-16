import { Box, LinearProgress } from "@mui/material";

export default function GlobalLoading() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "transparent",
        position: "fixed",
        zIndex: 20,
      }}
    >
      <LinearProgress sx={{ 
        backgroundColor: "transparent",
        "& .MuiLinearProgress-bar": {
            backgroundColor: "#000",
        }
       }} />
    </Box>
  );
}
