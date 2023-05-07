import { useState } from "react";
import { Box, Container, Grid, Slider, Typography } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { SolarSystem } from "./SolarSystem";
import { PlanetDetails } from "./PlanetDetails";

function App() {
  const [date, setDate] = useState(new Date());
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const handleSliderChange = (_, value) => {
    const newDate = new Date();
    newDate.setMonth(newDate.getMonth() + value);
    setDate(newDate);
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h5" align="center">
          {date.toLocaleDateString()}
        </Typography>
      </Box>
      <SolarSystem date={date} onPlanetClick={setSelectedPlanet} />
      {selectedPlanet && (
        <Box my={4}>
          <PlanetDetails planet={selectedPlanet} />
        </Box>
      )}
      <Box my={4}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Select date"
                value={date}
                onChange={(newDate) => {
                  setDate(newDate);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Slider
              valueLabelDisplay="auto"
              defaultValue={0}
              min={-12}
              max={12}
              onChange={handleSliderChange}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
