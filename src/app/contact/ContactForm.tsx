"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

interface ContactFormProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, onError }) => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    // Simple regex for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    setLoading(true); // Show loading indicator
    setStatus(null); // Reset status before making request

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to: email, subject, text: message }),
    });

    const data = await response.json();
    setLoading(false); // Hide loading indicator

    if (response.ok) {
      setStatus("Email sent successfully!");
      onSuccess(); // Notify parent on success
      // Optionally clear the form
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      setStatus(`Error: ${data.message}`);
      onError(data.message); // Notify parent on error
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <TextField
        label="Your Email"
        variant="outlined"
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Subject"
        variant="outlined"
        fullWidth
        required
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Message"
        variant="outlined"
        fullWidth
        multiline
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ mb: 3 }}
        rows={4}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          mt: 2,
          py: 1.5,
          px: 4,
          fontSize: "1rem",
          borderRadius: 3,
          boxShadow: 2,
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-2px)",
          },
        }}
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Send Message"
        )}
      </Button>

      {status && (
        <Typography
          variant="body2"
          sx={{ mt: 3, color: status.includes("Error") ? "red" : "green" }}
        >
          {status}
        </Typography>
      )}
    </Box>
  );
};

export default ContactForm;
