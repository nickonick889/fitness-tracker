import { useEffect, useState } from "react";
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
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";

export default function ProgramPage() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

  const [program, setProgram] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/api/programs/${programId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error("Failed to fetch program:", errText);
          return;
        }

        const data = await res.json();
        console.log("PROGRAM DATA:", data);

        setProgram(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProgram();
  }, [programId]);

  useEffect(() => {
    if (program) {
      setNameInput(program.name);
    }
  }, [program]);

  const handleRenameProgram = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/programs/${programId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nameInput,
      }),
    });

    const text = await res.text(); //
    console.log("Rename response:", text);

    if (!res.ok) {
      console.error("Failed to rename program");
      return;
    }

    const updated = JSON.parse(text);
    setProgram(updated);
    setIsEditingName(false);
  };

  const handleAddDay = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/days/${programId}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await res.text();
      console.log("ADD DAY RESPONSE:", text);

      if (!res.ok) {
        console.error("Failed to add day");
        return;
      }

      const newDay = JSON.parse(text);

      setProgram((prev) => ({
        ...prev,
        days: [...(prev.days || []), newDay],
      }));
    } catch (err) {
      console.error("Failed to add day:", err);
    }
  };

  const handleDeleteDay = async (dayId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/days/${dayId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to delete day");
        return;
      }

      setProgram((prev) => ({
        ...prev,
        days: prev.days.filter((d) => d._id !== dayId),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (!program) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading program...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
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
                onBlur={handleRenameProgram}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRenameProgram();
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
                {program.name}
              </Typography>
            )}

            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.7)", mt: 0.5 }}
            >
              Click a day to edit it.
            </Typography>
          </Box>

          {/* RIGHT SIDE */}
          <IconButton
            onClick={() => navigate("/workouts")}
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

        {/* GRID */}
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
          {/* ADD DAY CARD */}
          <Card
            onClick={handleAddDay}
            sx={{
              cursor: "pointer",
              border: "2px dashed rgba(234,255,0,0.25)",
              background: "rgba(255,255,255,0.02)",
              minHeight: 140,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                background: "rgba(234,255,0,0.05)",
              },
            }}
          >
            <CardActionArea sx={{ height: "100%" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h3">+</Typography>
                <Typography sx={{ fontWeight: 700 }}>Add New Day</Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* DAY CARDS */}
          {program.days?.map((day) => (
            <Card
              key={day._id}
              sx={{
                position: "relative",
                cursor: "pointer",
                border: "1px solid rgba(234,255,0,0.2)",
                background: "rgba(255,255,255,0.03)",
                minHeight: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  background: "rgba(234,255,0,0.05)",
                  "& .delete-btn": {
                    opacity: 1,
                    transform: "scale(1)",
                  },
                },
              }}
            >
              {/* DELETE BUTTON */}
              <IconButton
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteDay(day._id);
                }}
                sx={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  zIndex: 10,
                  opacity: 0,
                  transform: "scale(0.8)",
                  transition: "0.2s",
                  color: "white",
                  backgroundColor: "rgba(0,0,0,0.4)",
                  "&:hover": {
                    backgroundColor: "rgba(255,0,0,0.2)",
                    color: "red",
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>

              <CardActionArea
                onClick={() =>
                  navigate(`/programs/${programId}/days/${day._id}`)
                }
                sx={{ height: "100%", width: "100%" }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography sx={{ fontWeight: 700 }}>{day.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Stack>
    </Container>
  );
}
