import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TemplatePage() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

  // Load templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/api/templates`, {
          headers: {
            method: "GET",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("TEMPLATES RESPONSE:", data);
        setTemplates(data);
      } catch (err) {
        console.error("Failed to fetch templates:", err);
      }
    };

    fetchTemplates();
  }, []);

  // Create program from template
  const handleUseTemplate = async (templateId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/programs/fromTemplate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ templateId }),
      });

      if (!res.ok) {
        console.error("Failed to create program from template");
        return;
      }

      const newProgram = await res.json();

      console.log("NEW PROGRAM:", newProgram);

      navigate(`/programs/${newProgram._id}`);
    } catch (err) {
      console.error("Error using template:", err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack spacing={3}>
        {/* HEADER */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#eaff00" }}>
            Choose a Template
          </Typography>

          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
            Start from a pre-made program structure.
          </Typography>
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
          {templates.map((template) => (
            <Card
              key={template._id}
              sx={{
                border: "1px solid rgba(234,255,0,0.2)",
                background: "rgba(255,255,255,0.03)",
                minHeight: 140,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography sx={{ fontWeight: 700 }}>
                  {template.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.6)", mt: 1 }}
                >
                  {template.days?.length || 0} days
                </Typography>
              </CardContent>

              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleUseTemplate(template._id)}
                  sx={{
                    backgroundColor: "#eaff00",
                    color: "#000",
                    fontWeight: 700,
                    "&:hover": {
                      backgroundColor: "#d4ff00",
                    },
                  }}
                >
                  Use Template
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      </Stack>
    </Container>
  );
}
