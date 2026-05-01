import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Container,
  Stack,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate, useParams } from "react-router-dom";

export default function DayPage() {
  const { programId, dayId } = useParams();
  const [day, setDay] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [saveStatus, setSaveStatus] = useState("");

  const navigate = useNavigate();
  const BASE_URL = "http://localhost:3000";


  useEffect(() => {
    const fetchDay = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${BASE_URL}/api/days/${dayId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      setDay(data);
    };

    fetchDay();
  }, [dayId]);

  useEffect(() => {
    if (day) {
        setNameInput(day.name);
    }
    }, [day]);

  useEffect(() => {
  const fetchExercises = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/exercises`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("EXERCISE OPTIONS:", data);
      setExerciseOptions(data);
    } catch (err) {
      console.error("Failed to fetch exercises:", err);
    }
  };

  fetchExercises();
}, []);

  const handleRenameDay = async () => {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/api/days/${dayId}/name`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: nameInput,
        }),
        });

        const text = await res.text();
        console.log("Rename day response:", text);

        if (!res.ok) {
        console.error("Failed to rename day");
        return;
        }

        const updated = JSON.parse(text);
        setDay(updated);
        setIsEditingName(false);
    } catch (err) {
        console.error(err);
    }
    };

  const updateExercise = (index, field, value) => {
    setDay((prev) => {
        const updated = [...prev.exercises];

        updated[index] = {
        ...updated[index],
        [field]: value,
        };

        return { ...prev, exercises: updated };
    });
  };

  const handleAddExercise = () => {
    setDay((prev) => ({
        ...prev,
        exercises: [
        ...(prev.exercises || []),
        {
            exerciseId: "",
            name: "",
            sets: "",
            reps: "",
        },
        ],
    }));
  };

  const handleDeleteExercise = (index) => {
    setDay((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(
        `${BASE_URL}/api/days/${dayId}`,
        {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                exercises: day.exercises
                    .filter(ex => ex.exerciseId)
                    .map(ex => ({
                    exerciseId: ex.exerciseId,
                    name: ex.name,
                    sets: Number(ex.sets) || 0,
                    reps: Number(ex.reps) || 0,
                    weight: Number(ex.weight) || 0,
                    })),
                }),
        });

        if (!res.ok) {
            console.error("Failed to save day");
            setSaveStatus("Failed to save.");
            return;
        }

        setSaveStatus("Program saved.");
        setTimeout(() => {
            setSaveStatus("");
        }, 2000);

    }  catch (err) {

        console.error("Failed to save day:", err);
        setSaveStatus("Failed to save.");
    
    } 
  };

  if (!day) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Stack spacing={3}>

        {/* HEADER */}
        <Box
        sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
            gap: 2,
        }}
        >
        {/* LEFT SIDE */}
        <Box sx={{ minWidth: 0 }}>
            {isEditingName ? (
            <TextField
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onBlur={handleRenameDay}
                onKeyDown={(e) => {
                if (e.key === "Enter") handleRenameDay();
                }}
                autoFocus
                size="small"
            />
            ) : (
            <Typography
                variant="h5"
                sx={{
                fontWeight: 800,
                cursor: "pointer",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                }}
                onClick={() => setIsEditingName(true)}
            >
                {day?.name}
            </Typography>
            )}

            <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.7)", mt: 0.5 }}
            >
            Add or edit an exercise.
            </Typography>
        </Box>

        {/* RIGHT SIDE */}
        <IconButton
            onClick={() => navigate(`/programs/${programId}`)}
            sx={{
            flexShrink: 0,
            color: "white",
            backgroundColor: "rgba(255,255,255,0.05)",
            "&:hover": {
                backgroundColor: "rgba(234,255,0,0.15)",
                color: "#eaff00",
            },
            }}
        >
            <ArrowBackIcon />
        </IconButton>
        </Box>

        {/* EXERCISE LIST */}
        <Stack spacing={2}>
          {day.exercises?.map((ex, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Autocomplete
                sx={{ 
                    width: 450,
                    "& .MuiOutlinedInput-root": {
                        padding: 0,
                        minHeight: 56,
                        alignItems: "center",
                    },
                        "& .MuiInputBase-input": {
                        textAlign: "left",
                    },
                 }}
                options={exerciseOptions}
                getOptionLabel={(option) => option.name}
                value={
                    exerciseOptions.find((opt) => opt._id === ex.exerciseId) || null
                }
                onChange={(event, newValue) => {
                    updateExercise(index, "exerciseId", newValue?._id || "");
                    updateExercise(index, "name", newValue?.name || "");
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Exercise" size="small" />
                )}
            />

              <TextField
                placeholder="Sets"
                value={ex.sets}
                onChange={(e) =>
                  updateExercise(index, "sets", e.target.value)
                }
                sx={{ width: 80 }}
              />

              <TextField
                placeholder="Reps"
                value={ex.reps}
                onChange={(e) =>
                  updateExercise(index, "reps", e.target.value)
                }
                sx={{ width: 80 }}
              />

              <TextField
                placeholder="Weight (kg)"
                value={ex.weight || ""}
                onChange={(e) =>
                    updateExercise(index, "weight", e.target.value)
                }
                sx={{ width: 125 }}
              />

              <IconButton onClick={() => handleDeleteExercise(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Stack>

        {/* ACTIONS */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button onClick={handleAddExercise}>
            Add Exercise
          </Button>

          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>

          {saveStatus && (
            <Typography
                sx={{
                mt: 1,
                fontSize: 14,
                color: saveStatus === "Program saved." ? "#a6ff4d" : "#ff5c5c",
                }}
            >
                {saveStatus}
            </Typography>
          )}
        </Box>
      </Stack>
    </Container>
  );
}