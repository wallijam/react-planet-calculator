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

const planetModel = document.getElementById("planetary-model");
const planetKey = document.getElementById("planet-key");

const planetPositions = getPlanetPositions(new Date());

planetPositions.forEach(({ planet, x, y }) => {
  const planetElement = document.createElement("div");
  planetElement.classList.add("planet");
  planetElement.style.backgroundColor = planet.color;
  planetElement.style.left = `${50 + x * 100}%`;
  planetElement.style.top = `${50 + y * 100}%`;
  planetElement.title = planet.name;
  planetModel.appendChild(planetElement);
});

planets.forEach((planet) => {
  const planetKeyElement = document.createElement("div");
  planetKeyElement.classList.add("planet-key-row");
  planetKeyElement.innerHTML = `
    <div class="planet-key-color" style="background-color: ${planet.color}"></div>
    <div class="planet-key-label">${planet.name}</div>
  `;
  planetKey.appendChild(planetKeyElement);
});