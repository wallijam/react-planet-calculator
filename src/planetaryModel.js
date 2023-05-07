import { planets } from "./planets";

function getMeanAnomaly(M0, n, t) {
  return (M0 + n * t) % 360;
}

function getEccentricAnomaly(M, e) {
  let E = M;
  for (let i = 0; i < 10; i++) {
    E = M + e * Math.sin((E * Math.PI) / 180);
  }
  return E;
}

function getPosition(a, E, e) {
  const x = a * (Math.cos((E * Math.PI) / 180) - e);
  const y = a * Math.sqrt(1 - e * e) * Math.sin((E * Math.PI) / 180);
  return { x, y };
}

export function getPlanetPositions(date) {
  const currentDate = new Date();
  const t = (date - currentDate) / (1000 * 60 * 60 * 24); // Time in days

  return planets.map((planet) => {
    const n = 360 / planet.period; // Mean motion (degrees per day)
    const M = getMeanAnomaly(planet.M0, n, t);
    const E = getEccentricAnomaly(M, planet.e);
    const position = getPosition(planet.a, E, planet.e);

    return {
      planet,
      x: position.x,
      y: position.y
    };
  });
}
