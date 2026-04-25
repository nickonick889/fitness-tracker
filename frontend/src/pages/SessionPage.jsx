import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function SessionPage() {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h4" sx={{ color: "#eaff00" }}>
        Session
      </Typography>
      <Typography sx={{ mt: 1, color: "#ddd" }}>
        Track your workout session details here.
      </Typography>
    </Box>
  );
}
