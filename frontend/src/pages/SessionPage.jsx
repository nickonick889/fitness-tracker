import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getSession, updateSession, endSession } from "../services/sessionService";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Divider,
} from "@mui/material";

export default function SessionPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);

  useEffect(() => {
    if (sessionId) {
      localStorage.setItem("activeSessionId", sessionId);
    }
    const fetchSession = async () => {
      const data = await getSession(sessionId);
      setSession(data);
    };

    fetchSession();
  }, [sessionId]);

  const isCompleted = session?.status === "completed";

  const updateSet = (exerciseIndex, setIndex, field, value) => {
    const updated = { ...session };
    updated.exercises[exerciseIndex].sets[setIndex][field] = value;
    setSession(updated);
  };

  const handleFinish = async () => {
    await updateSession(sessionId, session.exercises);
    await endSession(sessionId);

    localStorage.removeItem("activeSessionId");

    navigate("/history");
  };

  if (!session) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
        Workout Session
      </Typography>

      <Stack spacing={3}>
        {session.exercises.map((ex, i) => (
          <Card key={i}>
            <CardContent>
              <Typography variant="h6">{ex.name}</Typography>

              <Stack spacing={2} sx={{ mt: 2 }}>
                {ex.sets.map((set, j) => (
                  <Stack key={j} direction="row" spacing={2}>
                    <TextField
                      label={`Set ${j + 1} Weight`}
                      type="number"
                      value={set.weight}
                      onChange={(e) =>
                        updateSet(i, j, "weight", e.target.value) 
                      }
                      disabled={isCompleted}
                    />

                    <TextField
                      label={`Set ${j + 1} Reps`}
                      type="number"
                      value={set.reps}
                      onChange={(e) =>
                        updateSet(i, j, "reps", e.target.value)
                      }
                      disabled={isCompleted}
                    />
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        ))}

        <Divider />

        <Button variant="contained" size="large" onClick={handleFinish} disabled={isCompleted}>
          {isCompleted ? "Completed" : "Finish Workout"}
        </Button>
      </Stack>
    </Container>
  );
}