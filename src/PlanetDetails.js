import React from "react";
import { Box, Typography } from "@mui/material";

export function PlanetDetails({ planet }) {
  return (
    <Box>
      <Typography variant="h6" align="center" gutterBottom>
        {planet.name}
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Mass: {planet.mass}
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Temperature: {planet.temperature}
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Climate: {planet.climate}
      </Typography>
      <Typography variant="body1" align="center">
        Oxygen Level: {planet.oxygenLevel}
      </Typography>
    </Box>
  );
}
