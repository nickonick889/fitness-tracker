import { useEffect, useState } from "react";
import { getSessions } from "../services/sessionService";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Box,
} from "@mui/material";

export default function HistoryPage() {
  const [sessions, setSessions] = useState([]);

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

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Workout History
      </Typography>

      <Stack spacing={2}>
        {sessions.map((session) => (
          <Card key={session._id}>
            <CardContent>
                {/* Header */}
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {session.status === "completed" ? "Completed Workout" : "In Progress"}
                </Typography>

                <Typography variant="body2" sx={{ color: "#aaa", mb: 2 }}>
                    {new Date(session.startTime).toLocaleString()}
                </Typography>

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