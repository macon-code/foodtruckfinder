"use client";

import { Box, Container, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import AppBarHeader from "../components/AppBarHeader";

const AboutPage: React.FC = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/create-food-truck");
  };

  return (
    <div>
      <AppBarHeader />
      <Container>
        <Box mt={8}>
          <Typography variant="h4">About Us</Typography>
          <Typography variant="body1" mt={2}>
            Welcome to the Macon Food Truck Finder. Here you can discover all
            the best food trucks in the area!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNavigate}
            sx={{ mt: 2 }}
          >
            Go to Create New Truck Page
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default AboutPage;
