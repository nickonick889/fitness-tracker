import { useEffect, useState } from "react";
import { getSessions } from "../services/sessionService";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
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
              <Typography variant="h6">
                Session ID: {session._id}
              </Typography>

              <Typography>
                {session.status}
              </Typography>

              <Typography>
                {new Date(session.startTime).toLocaleString()}
              </Typography>

              {session.endTime && (
                <Typography>
                  {new Date(session.endTime).toLocaleString()}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}