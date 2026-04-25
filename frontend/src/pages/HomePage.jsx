import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Card
        sx={{
          border: "1px solid rgba(234,255,0,0.2)",
          background: "linear-gradient(180deg, #111 0%, #0b0b0b 100%)",
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Stack spacing={2.5}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, color: "primary.main" }}
            >
              Welcome to Fitness Tracker
            </Typography>

            <Typography sx={{ color: "rgba(255,255,255,0.85)" }}>
              Plan your weekly programs, organize exercises by day, and keep
              your training structure clear from one place.
            </Typography>

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <Stack spacing={1}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  How to use it
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.72)" }}
                >
                  1. Open Workouts and create a new program.
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.72)" }}
                >
                  2. Add exercises for Day 1, Day 2, and more.
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.72)" }}
                >
                  3. Save, then open the program card to edit anytime.
                </Typography>
              </Stack>
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button variant="contained" component={RouterLink} to="/workouts">
                Go to Workouts
              </Button>
              <Button variant="outlined" component={RouterLink} to="/calendar">
                Open Calendar
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
