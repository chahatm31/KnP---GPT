import React, { useState } from "react";
import "./App.css";

function App() {
  // Define constants
  const GRAVITY = 9.81; // Earth's gravity in m/s^2

  // State variables to store mass, height, velocity, and energy values
  const [mass, setMass] = useState(1); // in kilograms
  const [height, setHeight] = useState(1); // in meters
  const [velocity, setVelocity] = useState(0); // in m/s

  // Function to calculate Potential Energy: PE = m * g * h
  const calculatePotentialEnergy = () => {
    return mass * GRAVITY * height;
  };

  // Function to calculate Kinetic Energy: KE = 0.5 * m * v^2
  const calculateKineticEnergy = () => {
    return 0.5 * mass * velocity * velocity;
  };

  // Reset function to set values back to defaults
  const resetValues = () => {
    setMass(1);
    setHeight(1);
    setVelocity(0);
  };

  return (
    <div className="App">
      <h1>Energy Simulator</h1>
      <div className="inputs">
        <div className="input-group">
          <label htmlFor="mass">Mass (kg):</label>
          <input
            type="number"
            id="mass"
            value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            min="0"
            step="0.1"
          />
        </div>

        <div className="input-group">
          <label htmlFor="height">Height (m):</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            min="0"
            step="0.1"
          />
        </div>

        <div className="input-group">
          <label htmlFor="velocity">Velocity (m/s):</label>
          <input
            type="number"
            id="velocity"
            value={velocity}
            onChange={(e) => setVelocity(Number(e.target.value))}
            min="0"
            step="0.1"
          />
        </div>
      </div>

      <div className="results">
        <h2>Energy Calculations:</h2>
        <p>Potential Energy (PE): {calculatePotentialEnergy().toFixed(2)} J</p>
        <p>Kinetic Energy (KE): {calculateKineticEnergy().toFixed(2)} J</p>
        <p>
          Total Energy (PE + KE):{" "}
          {(calculatePotentialEnergy() + calculateKineticEnergy()).toFixed(2)} J
        </p>
      </div>

      <button className="reset-btn" onClick={resetValues}>
        Reset
      </button>
    </div>
  );
}

export default App;
