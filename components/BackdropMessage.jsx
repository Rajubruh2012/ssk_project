import { Box, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function BackdropMessage() {
    const theme = useTheme();
    const mobileView = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        position: "fixed",
        zIndex: "20",
        backgroundColor: "#0009",
        backdropFilter: "blur(4px)",
      }}
    >
      <Box
        sx={{
          fontSize: `${mobileView ? "2rem" : "3rem"}`,
          lineHeight: "1rem",
          letterSpacing: "1.5px",
          fontWeight: 600,
          color: "#fff",
        }}
      >
        <Box component="span">{"Please"}</Box>
        <Box component="span" ml={2}>
          <Link href="/">{"Login"}</Link>
        </Box>
        <Box component="span" ml={2}>
          {"First"}
        </Box>
      </Box>
    </Box>
  );
}
