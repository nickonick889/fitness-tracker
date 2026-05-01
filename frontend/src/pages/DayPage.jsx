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
import { startSession } from "../services/sessionService";

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
          exerciseId: null,
          name: "",
          sets: [],
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

  const addSet = (exerciseIndex) => {
    setDay((prev) => {
      const updated = structuredClone(prev); // or deep copy

      updated.exercises[exerciseIndex].sets = [
        ...updated.exercises[exerciseIndex].sets,
        { weight: "", reps: "" },
      ];

      return updated;
    });
  };

  const updateSet = (exerciseIndex, setIndex, field, value) => {
    setDay((prev) => {
      const updated = [...prev.exercises];

      updated[exerciseIndex].sets[setIndex][field] = value;

      return { ...prev, exercises: updated };
    });
  };

  const deleteSet = (exerciseIndex, setIndex) => {
    setDay((prev) => {
      const updated = structuredClone(prev);

      updated.exercises[exerciseIndex].sets.splice(setIndex, 1);

      return updated;
    });
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
                exercises: day.exercises.map((ex) => ({
                  exerciseId: ex.exerciseId,
                  name: ex.name,
                  sets: ex.sets.map((s) => ({
                    weight: Number(s.weight),
                    reps: Number(s.reps),
                  })),
                }))
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

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

          {/* EXERCISE LIST */}
        <Stack spacing={3}>
          {day.exercises?.map((ex, index) => (
            <Box key={index} sx={{ mb: 2 }}>

              {/* HEADER ROW: dropdown + delete */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                <Autocomplete
                  sx={{ width: 450 }}
                  options={exerciseOptions}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    exerciseOptions.find((opt) => opt._id === ex.exerciseId) ?? null
                  }
                  onChange={(event, newValue) => {
                    updateExercise(index, "exerciseId", newValue?._id || null);
                    updateExercise(index, "name", newValue?.name || "");
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Exercise" size="small" />
                  )}
                />

                <IconButton
                  onClick={() => handleDeleteExercise(index)}
                  size="small"
                  sx={{
                    color: "rgba(255,255,255,0.6)",
                    "&:hover": { color: "red" },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>

              </Box>

              {/* SETS */}
              <Stack spacing={1} sx={{ mt: 1 }}>
                {ex.sets?.map((set, setIndex) => (
                  <Box
                    key={setIndex}
                    sx={{ display: "flex", gap: 1, alignItems: "center" }}
                  >
                    <Typography sx={{ width: 60 }}>
                      Set {setIndex + 1}
                    </Typography>

                    <TextField
                      size="small"
                      placeholder="reps"
                      value={set.reps}
                      onChange={(e) =>
                        updateSet(index, setIndex, "reps", e.target.value)
                      }
                      sx={{ width: 100 }}
                    />

                    <Typography>x</Typography>

                    <TextField
                      size="small"
                      placeholder="kg"
                      value={set.weight}
                      onChange={(e) =>
                        updateSet(index, setIndex, "weight", e.target.value)
                      }
                      sx={{ width: 100 }}
                    />

                    <IconButton
                      onClick={() => deleteSet(index, setIndex)}
                      size="small"
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        "&:hover": { color: "red" },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Stack>

              {/* ADD SET */}
              <Button
                size="small"
                onClick={() => addSet(index)}
                sx={{ mt: 1 }}
              >
                + Add Set
              </Button>

            </Box>
          ))}
        </Stack>
        </Box>

        {/* ACTIONS */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button onClick={handleAddExercise}>
            Add Exercise
          </Button>

          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
            {/* Existing Save Button */}
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          
          <Button
            variant="outlined"
            onClick={async () => {
              try {
                console.log("Starting session with:", {
                programId: day.program,
                dayId: day._id,
});
                const session = await startSession({
                  programId: day.program,
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
        </Stack>

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