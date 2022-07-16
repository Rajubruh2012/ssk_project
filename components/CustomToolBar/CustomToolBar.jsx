import { Box } from "@mui/material";

export default function CustomToolbar(props) {
  return (
    <Box
      component="div"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        WebkitBoxPack: "justify",
        justifyContent: "center",
        padding: "0.3rem 3rem 0rem 3rem",
      }}
    >
      <Box
        component="span"
        style={{
          margin: 0,
          fontSize: "0.75rem",
          fontWeight: "400",
          lineHeight: "2.66",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          color: "rgba(0, 0, 0, 0.6)",
        }}
      >
        {`${props.text}`}
      </Box>
    </Box>
  );
}