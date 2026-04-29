import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { getSessions } from "../services/sessionService";

export default function SessionPage() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchSessions() {
      const data = await getSessions();
      setSessions(data || []);
    }

    fetchSessions();
  }, []);

  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h4" sx={{ color: "#eaff00" }}>
        Session
      </Typography>

      {/* ✅ If no sessions */}
      {sessions.length === 0 ? (
        <Typography sx={{ mt: 1, color: "#ddd" }}>
          Track your workout session details here.
        </Typography>
      ) : (
        <>
          <Typography sx={{ mt: 1, color: "#ddd" }}>
            Your session history:
          </Typography>

          {sessions.map((session) => (
            <Box key={session._id} sx={{ mt: 2 }}>
              <Typography sx={{ color: "#fff" }}>
                Status: {session.status}
              </Typography>
              <Typography sx={{ color: "#aaa" }}>
                Duration: {session.duration || "In progress"}
              </Typography>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
}