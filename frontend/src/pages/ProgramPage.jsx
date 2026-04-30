import { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { startSession } from "../services/sessionService";

const createExercise = () => ({ name: "", sets: "", reps: "" });
//const createDay = () => ({ exercises: [createExercise()] });

export default function ProgramPage() {
  const { programId } = useParams();
  const navigate = useNavigate();

  const [program, setProgram] = useState(null);
  const [dayName, setDayName] = useState("");

  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateProgram = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/programs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const newProgram = await res.json();

  navigate(`/programs/${newProgram._id}`);
};

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`/api/programs/${programId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setProgram(data);
      } catch (err) {
        console.error("Failed to load program:", err);
      }
    };
    fetchProgram();
  }, [programId]);

  const updateExercise = (dayIndex, exerciseIndex, field, value) => {
    setProgram((current) => {
      const updatedDays = current.days.map((day, index) => {
        if (index !== dayIndex) return day;

        return {
          ...day,
          exercises: day.exercises.map((exercise, exIndex) =>
            exIndex === exerciseIndex
              ? { ...exercise, [field]: value }
              : exercise,
          ),
        };
      });

      return { ...current, days: updatedDays };
    });
  };

  const addExercise = (dayIndex) => {
    setProgram((current) => ({
      ...current,
      days: current.days.map((day, index) =>
        index === dayIndex
          ? { ...day, exercises: [...day.exercises, createExercise()] }
          : day,
      ),
    }));
  };

  const removeExercise = (dayIndex, exerciseIndex) => {
    setProgram((current) => ({
      ...current,
      days: current.days.map((day, index) => {
        if (index !== dayIndex || day.exercises.length === 1) return day;

        return {
          ...day,
          exercises: day.exercises.filter(
            (_, exIndex) => exIndex !== exerciseIndex,
          ),
        };
      }),
    }));
  };

  const handleAddDay = async () => {
    if (!dayName.trim()) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/programs/${programId}/addDay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: dayName,
        }),
      });

      const newDay = await res.json();

      setProgram((prev) => ({
        ...prev,
        days: [...prev.days, newDay],
      }));

      setDayName("");
    } catch (err) {
      console.error(err);
    }
  };

  const removeDay = (dayIndex) => {
    setProgram((current) => {
      if (current.days.length === 1) return current;

      return {
        ...current,
        days: current.days.filter((_, index) => index !== dayIndex),
      };
    });
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`/api/programs/${program.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/workouts");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!program.name.trim()) {
      setErrorMessage("Program name is required.");
      setStatusMessage("");
      return;
    }

    const token = localStorage.getItem("token");

    const cleanDays = program.days
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

    if (cleanDays.length === 0) {
      setErrorMessage("At least one exercise is required.");
      setStatusMessage("");
      return;
    }

    const updated = await fetch(`/api/programs/${program.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: program.name,
       }),
    });

    setProgram(updated);
    setErrorMessage("");
    setStatusMessage("Program updated.");
  };

  if (!program) {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">Program not found.</Typography>
              <Button variant="contained" onClick={() => navigate("/workouts")}>
                Back to Workouts
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Card
        sx={{
          border: "1px solid rgba(234,255,0,0.2)",
          background: "linear-gradient(180deg, #111 0%, #0b0b0b 100%)",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={3} component="form" onSubmit={handleSave}>
            <Typography
              variant="h5"
              sx={{ color: "primary.main", fontWeight: 800 }}
            >
              Program Details
            </Typography>

            <TextField
              label="Program Name"
              value={program.name}
              onChange={(event) =>
                setProgram((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              fullWidth
              required
            />

            {program.days.map((day, dayIndex) => (
              <Box
                key={`program-day-${dayIndex}`}
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
                      disabled={program.days.length === 1}
                    >
                      Remove Day
                    </Button>
                  </Stack>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ alignSelf: "flex-start" }}
                    onClick={async () => {
                      try {
                        const session = await startSession({
                          programId: program._id,
                          dayId: day._id,
                        });

                        navigate(`/session/${session._id}`);
                      } catch (err) {
                        console.error(err.message);
                      }
                    }}
                  >
                    Start Workout
                  </Button>

                  {day.exercises.map((exercise, exerciseIndex) => (
                    <Stack
                      key={`program-day-${dayIndex}-exercise-${exerciseIndex}`}
                      direction={{ xs: "column", md: "row" }}
                      spacing={1.5}
                    >
                      <TextField
                        label={`Exercise ${exerciseIndex + 1}`}
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

            <Button variant="outlined" onClick={handleAddDay}>
              Add Day
            </Button>

            {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
            {statusMessage && <Alert severity="success">{statusMessage}</Alert>}

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button variant="text" onClick={() => navigate("/workouts")}>
                Back to Workouts
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete Program
              </Button>
              <Button type="submit" variant="contained" size="large">
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
