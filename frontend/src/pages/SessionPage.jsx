import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateSession, endSession } from "../services/sessionService";
import { request } from "../services/apiService";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";

export default function SessionPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);

  // 🔥 load session
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await request(`/api/session/${sessionId}`);
        setSession(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchSession();
  }, [sessionId]);

  // 🔥 update input
  const updateField = (index, field, value) => {
    const newExercises = [...session.exercises];
    newExercises[index][field] = value;

    setSession({ ...session, exercises: newExercises });
  };

  // 🔥 finish workout
  const handleFinish = async () => {
    try {
      await updateSession(sessionId, session.exercises);
      await endSession(sessionId);

      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!session) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 3, color: "primary.main" }}
      >
        Workout Session
      </Typography>

      <Stack spacing={3}>
        {session.exercises.map((ex, i) => (
          <Card key={i}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {ex.name}
              </Typography>

              <Stack spacing={2}>
                <TextField
                  label="Sets"
                  type="number"
                  value={ex.sets}
                  onChange={(e) =>
                    updateField(i, "sets", e.target.value)
                  }
                />

                <TextField
                  label="Reps"
                  type="number"
                  value={ex.reps}
                  onChange={(e) =>
                    updateField(i, "reps", e.target.value)
                  }
                />

                <TextField
                  label="Weight"
                  type="number"
                  value={ex.weight}
                  onChange={(e) =>
                    updateField(i, "weight", e.target.value)
                  }
                />
              </Stack>
            </CardContent>
          </Card>
        ))}

        <Button
          variant="contained"
          size="large"
          onClick={handleFinish}
          sx={{ fontWeight: 700 }}
        >
          Finish Workout
        </Button>
      </Stack>
    </Container>
  );
}