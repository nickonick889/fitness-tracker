import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createProgram } from "../services/workoutProgramStorage";

const createExercise = () => ({ name: "", sets: "", reps: "" });

const createDay = () => ({
  exercises: [createExercise()],
});

export default function BuildProgramPage() {
  const navigate = useNavigate();
  const [programName, setProgramName] = useState("");
  const [days, setDays] = useState([createDay()]);
  const [errorMessage, setErrorMessage] = useState("");

  const updateExercise = (dayIndex, exerciseIndex, field, value) => {
    setDays((current) => {
      const updated = [...current];
      updated[dayIndex] = {
        ...updated[dayIndex],
        exercises: updated[dayIndex].exercises.map((exercise, index) =>
          index === exerciseIndex ? { ...exercise, [field]: value } : exercise,
        ),
      };
      return updated;
    });
  };

  const addExercise = (dayIndex) => {
    setDays((current) => {
      const updated = [...current];
      updated[dayIndex] = {
        ...updated[dayIndex],
        exercises: [...updated[dayIndex].exercises, createExercise()],
      };
      return updated;
    });
  };

  const removeExercise = (dayIndex, exerciseIndex) => {
    setDays((current) => {
      const updated = [...current];
      const existing = updated[dayIndex].exercises;
      if (existing.length === 1) return current;

      updated[dayIndex] = {
        ...updated[dayIndex],
        exercises: existing.filter((_, index) => index !== exerciseIndex),
      };

      return updated;
    });
  };

  const addDay = () => {
    setDays((current) => [...current, createDay()]);
  };

  const removeDay = (dayIndex) => {
    setDays((current) => {
      if (current.length === 1) return current;
      return current.filter((_, index) => index !== dayIndex);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanDays = days
      .map((day) => ({
        exercises: day.exercises
          .filter((exercise) => exercise.name.trim())
          .map((exercise) => ({
            name: exercise.name.trim(),
            sets: Number(exercise.sets),
            reps: Number(exercise.reps),
          })),
      }))
      .filter((day) => day.exercises.length > 0);

    if (!programName.trim()) {
      setErrorMessage("Program name is required.");
      return;
    }

    if (cleanDays.length === 0) {
      setErrorMessage("Add at least one exercise before saving your workout.");
      return;
    }

    createProgram({
      name: programName.trim(),
      days: cleanDays,
    });

    navigate("/workouts");
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Card
        sx={{
          border: "1px solid rgba(234,255,0,0.2)",
          background: "linear-gradient(180deg, #111 0%, #0b0b0b 100%)",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            <Typography
              variant="h5"
              sx={{ color: "primary.main", fontWeight: 800 }}
            >
              Build Your Workout Program
            </Typography>

            <TextField
              label="Program Name"
              placeholder="e.g. Push Pull Legs"
              value={programName}
              onChange={(event) => setProgramName(event.target.value)}
              fullWidth
              required
            />

            {days.map((day, dayIndex) => (
              <Box
                key={`day-${dayIndex}`}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h6">Day {dayIndex + 1}</Typography>
                    <Button
                      variant="text"
                      color="warning"
                      onClick={() => removeDay(dayIndex)}
                      disabled={days.length === 1}
                    >
                      Remove Day
                    </Button>
                  </Stack>

                  {day.exercises.map((exercise, exerciseIndex) => (
                    <Stack
                      key={`day-${dayIndex}-exercise-${exerciseIndex}`}
                      direction={{ xs: "column", md: "row" }}
                      spacing={1.5}
                    >
                      <TextField
                        label={`Exercise ${exerciseIndex + 1}`}
                        placeholder="e.g. Barbell Squat"
                        value={exercise.name}
                        onChange={(event) =>
                          updateExercise(
                            dayIndex,
                            exerciseIndex,
                            "name",
                            event.target.value,
                          )
                        }
                        fullWidth
                        required
                      />
                      <TextField
                        label="Sets"
                        type="number"
                        value={exercise.sets}
                        onChange={(event) =>
                          updateExercise(
                            dayIndex,
                            exerciseIndex,
                            "sets",
                            event.target.value,
                          )
                        }
                        slotProps={{ htmlInput: { min: 1 } }}
                        sx={{ minWidth: { xs: "100%", md: 110 } }}
                        required
                      />
                      <TextField
                        label="Reps"
                        type="number"
                        value={exercise.reps}
                        onChange={(event) =>
                          updateExercise(
                            dayIndex,
                            exerciseIndex,
                            "reps",
                            event.target.value,
                          )
                        }
                        slotProps={{ htmlInput: { min: 1 } }}
                        sx={{ minWidth: { xs: "100%", md: 110 } }}
                        required
                      />
                      <Button
                        variant="text"
                        color="warning"
                        onClick={() => removeExercise(dayIndex, exerciseIndex)}
                        disabled={day.exercises.length === 1}
                      >
                        Remove
                      </Button>
                    </Stack>
                  ))}

                  <Button
                    variant="outlined"
                    onClick={() => addExercise(dayIndex)}
                  >
                    Add Exercise
                  </Button>
                </Stack>
              </Box>
            ))}

            <Button variant="outlined" onClick={addDay}>
              Add Day
            </Button>

            {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button variant="text" onClick={() => navigate("/workouts")}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" size="large">
                Save Workout
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
