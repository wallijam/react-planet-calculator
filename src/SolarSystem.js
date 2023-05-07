import { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { getPlanetPositions } from "./planetaryModel";

export function SolarSystem({ date, onPlanetClick }) {
  const canvasRef = useRef();

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

      // Check if the mouse is over the planet
      canvas.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (
          mouseX > xPos - 5 &&
          mouseX < xPos + 5 &&
          mouseY > yPos - 5 &&
          mouseY < yPos + 5
        ) {
          canvas.style.cursor = "pointer";
        } else {
          canvas.style.cursor = "default";
        }
      });

      // Handle click on planet
      canvas.addEventListener("click", (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (
          mouseX > xPos - 5 &&
          mouseX < xPos + 5 &&
          mouseY > yPos - 5 &&
          mouseY < yPos + 5
        ) {
          onPlanetClick(planet);
        }
      });
    });

    // Draw Sun
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.stroke();
  }, [date, onPlanetClick]);

  return (
    <Box my={4} display="flex" justifyContent="center">
      <canvas
        ref={canvasRef}
        width="400"
        height="400"
        style={{ border: "1px solid white" }}
      />
    </Box>
  );
}
