import { useRef, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getPlanetPositions } from "./planetaryModel";
import PlanetDetails from "./PlanetDetails";

export function SolarSystem({ date }) {
  const canvasRef = useRef();
  const [planetDetails, setPlanetDetails] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Clear canvas and set black background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    const numStars = 100;
    for (let i = 0; i < numStars; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
    }

    const positions = getPlanetPositions(date);

    positions.forEach(({ planet, x, y }) => {
      // Draw orbital path
      ctx.beginPath();
      ctx.ellipse(
        centerX,
        centerY,
        planet.a * 80,
        planet.a * 80 * Math.sqrt(1 - planet.e * planet.e),
        0,
        0,
        2 * Math.PI
      );
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.stroke();

      // Draw planet
      const xPos = centerX + x * 80;
      const yPos = centerY + y * 80;

      ctx.beginPath();
      ctx.arc(xPos, yPos, 5, 0, 2 * Math.PI);
      ctx.fillStyle = planet.color;
      ctx.fill();
      ctx.stroke();
    });

    // Draw Sun
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.stroke();

    // Add event listener to the canvas to close the planet details popup
    canvas.addEventListener("click", () => {
      setPlanetDetails(null);
    });
  }, [date]);

  return (
    <Box my={4} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h5" align="center">
        {date.toLocaleDateString()}
      </Typography>
      {planetDetails && (
        <PlanetDetails
          planet={planetDetails.planet}
          onClose={() => setPlanetDetails(null)}
        />
      )}
      <Box my={2} display="flex" justifyContent="center">
        <canvas
          ref={canvasRef}
          width="400"
          height="400"
          style={{ border: "1px solid white" }}
          onClick={(e) => {
            e.stopPropagation();
            setPlanetDetails(null);
          }}
        />
      </Box>
    </Box>
  );
}
