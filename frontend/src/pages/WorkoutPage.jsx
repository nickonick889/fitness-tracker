import { useMemo } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { listPrograms } from "../services/workoutProgramStorage";

const countExercises = (program) =>
  program.days.reduce((total, day) => total + day.exercises.length, 0);

export default function WorkoutPage() {
  const navigate = useNavigate();
  const programs = useMemo(() => listPrograms(), []);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ color: "primary.main", fontWeight: 800 }}
            >
              Your Workout Programs
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
              Choose a program card to view and edit it.
            </Typography>
          </Box>

          <Button variant="contained" onClick={() => navigate("/workouts/new")}>
            Build Your Workout Program
          </Button>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          {programs.map((program) => (
            <Card
              key={program.id}
              sx={{
                border: "1px solid rgba(234,255,0,0.14)",
                background: "linear-gradient(180deg, #111 0%, #0b0b0b 100%)",
              }}
            >
              <CardActionArea
                onClick={() => navigate(`/programs/${program.id}`)}
              >
                <CardContent sx={{ minHeight: 168 }}>
                  <Stack spacing={1.25}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {program.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.72)" }}
                    >
                      {program.days.length} day
                      {program.days.length === 1 ? "" : "s"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.72)" }}
                    >
                      {countExercises(program)} exercise
                      {countExercises(program) === 1 ? "" : "s"}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}

          {programs.length === 0 && (
            <Card
              sx={{
                border: "2px dashed rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.02)",
                minHeight: 200,
              }}
            >
              <CardActionArea
                onClick={() => navigate("/workouts/new")}
                sx={{ height: "100%" }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography variant="h3" sx={{ lineHeight: 1 }}>
                    +
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Add New Workout
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.72)" }}
                  >
                    Create your first workout program.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )}

          {programs.length > 0 && (
            <Card
              sx={{
                border: "2px dashed rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.02)",
                minHeight: 168,
              }}
            >
              <CardActionArea
                onClick={() => navigate("/workouts/new")}
                sx={{ height: "100%" }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography variant="h4" sx={{ lineHeight: 1 }}>
                    +
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Build New Program
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )}
        </Box>
      </Stack>
    </Container>
  );
}
