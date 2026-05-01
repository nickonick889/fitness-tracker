import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSessions, deleteSession } from "../services/sessionService";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function HistoryPage() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await getSessions();
        setSessions(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchSessions();
  }, []);


  // 🔥 duration helper
  const getDuration = (start, end) => {
    if (!end) return null;
    const diffMs = new Date(end) - new Date(start);
    const mins = Math.floor(diffMs / 60000);
    const secs = Math.floor((diffMs % 60000) / 1000);
    return `${mins}m ${secs}s`;
  };

  // 🔥 date format helper
  const formatDate = (date) =>
    new Date(date).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  // 🔥 delete handler
  const handleDelete = async (sessionId) => {
    if (!window.confirm("Delete this workout?")) return;

    try {
      await deleteSession(sessionId);
      setSessions((prev) => prev.filter((s) => s._id !== sessionId));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Workout History
      </Typography>

      <Stack spacing={2}>
        {sessions.map((session) => (
            <Card
                key={session._id}
                onClick={() => navigate(`/session/${session._id}`)}
                sx={{
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 0 12px rgba(234,255,0,0.25)",
                },
                }}
            >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {session.status === "completed" ? "Completed Workout" : "In Progress"}
                </Typography>

                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(session._id);
                  }}
                  sx={{
                    color: "#ff6b6b",
                    "&:hover": {
                      background: "rgba(255,0,0,0.1)",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                </Box>

              <Typography sx={{ color: "#aaa", mb: 1 }}>
                {formatDate(session.startTime)}
              </Typography>

              {/* 🔥 DURATION */}
              {session.endTime && (
                <Typography sx={{ color: "#aaa", mb: 2 }}>
                  Duration: {getDuration(session.startTime, session.endTime)}
                </Typography>
              )}
                
            
                <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.1)", mt: 2, pt: 2 }}>
                    
                    {session.exercises?.map((exercise) => (
                    <Box key={exercise._id} sx={{ mb: 2 }}>
                        <Typography sx={{ fontWeight: 600 }}>
                        {exercise.name}
                        </Typography>

                        {exercise.sets.map((set, index) => (
                        <Typography key={set._id} variant="body2" sx={{ color: "#ccc" }}>
                            Set {index + 1}: {set.weight}kg × {set.reps}
                        </Typography>
                        ))}
                    </Box>
                    ))}

                </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}