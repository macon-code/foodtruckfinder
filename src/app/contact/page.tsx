"use client";

import { Box, Container, Typography, Button, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import AppBarHeader from "../components/AppBarHeader";
//import ContactForm from "./ContactForm";

const ContactPage: React.FC = () => {
  const router = useRouter();

  const navMaconCode = () => {
    router.push("https://maconcode.com/");
  };

  const navGithub = () => {
    router.push("https://github.com/macon-code/foodtruckfinder");
  };

  const handleSuccess = () => {
    alert("Your message was sent successfully!");
  };

  const handleError = (message: string) => {
    alert(`There was an error sending your message: ${message}`);
  };

  return (
    <div>
      <AppBarHeader />
      <Container maxWidth="md">
        <Box
          sx={{
            mt: 8,
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
            textAlign: "center",
            color: "text.primary",
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
            Get in Touch
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: "1.2rem" }}>
            The site is brought to you by <strong>Macon Code</strong>. You can
            find more about us on our official website at{" "}
            <Link
              href="https://maconcode.com/"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              maconcode.com
            </Link>
            .
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={navMaconCode}
            sx={{
              mt: 3,
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
          >
            Visit Macon Code
          </Button>

          <Typography
            variant="body1"
            paragraph
            sx={{ mt: 3, fontSize: "1.1rem" }}
          >
            This site is a product of volunteer efforts aimed at benefiting
            local businesses. We would love for you to contribute if you're
            interested. You can view the latest build on our GitHub repository.
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={navGithub}
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
          >
            View on GitHub
          </Button>

          {/* Contact Form 
          <ContactForm onSuccess={handleSuccess} onError={handleError} />
          */}

          {/* Contact by Email Section */}
          <Box
            sx={{
              mt: 4,
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: 3,
              p: 4,
              textAlign: "center",
              color: "text.primary",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Contact Us Directly
            </Typography>
            <Typography variant="body1" paragraph>
              You can also reach us by email at{" "}
              <Link href="mailto:hello@maconcode.com" color="primary">
                hello@maconcode.com
              </Link>
              .
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Feel free to drop us an email for any inquiries, feedback, or
              suggestions. We look forward to hearing from you!
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default ContactPage;
