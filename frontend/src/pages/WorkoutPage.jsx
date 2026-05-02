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
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function WorkoutPage() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

  // Load programs for user
  useEffect(() => {
    const fetchPrograms = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/programs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("PROGRAM DAYS:", data.days);
      setPrograms(Array.isArray(data) ? data : []);
    };

    fetchPrograms();
  }, []);

  // Create new program → backend generates + returns program
  const handleCreateProgram = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/programs/new`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to create program");
      return;
    }

    const text = await res.text(); // safer first
    const newProgram = text ? JSON.parse(text) : null;

    if (!newProgram) {
      console.error("No program returned from backend");
      return;
    }

    setPrograms((prev) => [newProgram, ...prev]);
  };

  const handleDeleteProgram = async (programId) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/programs/${programId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Failed to delete program: ", errorText);
      return;
    }

    // Remove the deleted program from the state
    setPrograms(programs.filter((p) => p._id !== programId));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack spacing={3}>
        {/* HEADER */}
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
              Click a program to edit it.
            </Typography>
          </Box>
        </Stack>

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
          {/* CREATE NEW PROGRAM CARD */}
          <Card
            sx={{
              cursor: "pointer",
              border: "2px dashed rgba(234,255,0,0.25)",
              background: "rgba(255,255,255,0.02)",
              minHeight: 140,
              "&:hover": {
                background: "rgba(234,255,0,0.05)",
              },
            }}
          >
            <CardActionArea
              onClick={() => {
                console.log("open modal clicked");
                setOpenCreateModal(true);
              }}
              sx={{
                height: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h3">+</Typography>
                <Typography sx={{ fontWeight: 700 }}>
                  Add New Program
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* PROGRAM CARD */}
          {programs.map((program) => (
            <Card
              key={program._id}
              sx={{
                position: "relative",
                cursor: "pointer",
                border: "1px solid rgba(234,255,0,0.2)",
                background: "rgba(255,255,255,0.03)",
                minHeight: 140,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  background: "rgba(234,255,0,0.05)",
                },

                // show delete button on hover
                "&:hover .delete-btn": {
                  opacity: 1,
                  transform: "scale(1)",
                },
              }}
            >
              {/* DELETE BUTTON */}
              <IconButton
                className="delete-btn"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProgram(program._id);
                }}
                sx={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  zIndex: 10, // IMPORTANT
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.4)",
                  opacity: 0,
                  transform: "scale(0.8)",
                  transition: "all 0.15s ease-in-out",
                  "&:hover": {
                    backgroundColor: "rgba(255,0,0,0.2)",
                    color: "red",
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>

              {/* CLICKABLE AREA (NO OVERLAY ISSUES) */}
              <CardActionArea
                onClick={() => navigate(`/programs/${program._id}`)}
                sx={{
                  height: "100%",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: "#eaff00" }}>
                    {program.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Stack>

      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <DialogTitle>Create Program</DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: 250 }}>
            <Button
              variant="contained"
              onClick={async () => {
                await handleCreateProgram(); // your existing function
                setOpenCreateModal(false);
              }}
            >
              Custom
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                setOpenCreateModal(false);
                navigate("/templates"); // or template picker page
              }}
            >
              Template
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
