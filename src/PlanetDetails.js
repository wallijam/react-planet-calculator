import { Box, Typography } from "@mui/material";
import { useState } from "react";

function PlanetDetails({ planet, onClose }) {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const handleMoreInfoClick = () => {
    setShowMoreInfo(true);
  };

  return (
    <div className="planet-details-overlay">
      <Box sx={{ position: "absolute", top: 20, right: 20 }}>
        <button onClick={onClose}>Close</button>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h6">{planet.name}</Typography>
        <Typography variant="body1">{planet.description}</Typography>
        <Typography variant="body1">Mass: {planet.mass} kg</Typography>
        <Typography variant="body1">Climate: {planet.climate}</Typography>
        <Typography variant="body1">
          Temperature: {planet.temperature}°C
        </Typography>
        {!showMoreInfo && (
          <Typography
            variant="body1"
            sx={{ mt: 1, textDecoration: "underline", cursor: "pointer" }}
            onClick={handleMoreInfoClick}
          >
            More info
          </Typography>
        )}
        {showMoreInfo && (
          <div>
            <Typography variant="body1">
              Oxygen levels: {planet.oxygen}
            </Typography>
            <Typography variant="body1">
              Gravity: {planet.gravity} m/s²
            </Typography>
          </div>
        )}
      </Box>
    </div>
  );
}

export default PlanetDetails;
