import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("Energy Simulator - App Component", () => {
  // Requirement 1: Input fields should allow users to adjust the mass, height, and velocity.
  test("allows user to input mass, height, and velocity", () => {
    render(<App />);

    const massInput = screen.getByLabelText(/mass \(kg\)/i);
    const heightInput = screen.getByLabelText(/height \(m\)/i);
    const velocityInput = screen.getByLabelText(/velocity \(m\/s\)/i);

    fireEvent.change(massInput, { target: { value: "5" } });
    fireEvent.change(heightInput, { target: { value: "10" } });
    fireEvent.change(velocityInput, { target: { value: "3" } });

    expect(massInput.value).toBe("5");
    expect(heightInput.value).toBe("10");
    expect(velocityInput.value).toBe("3");
  });

  // Requirement 2: Kinetic energy should update in real time when the velocity is changed.
  test("calculates kinetic energy in real time as velocity changes", () => {
    render(<App />);

    const velocityInput = screen.getByLabelText(/velocity \(m\/s\)/i);
    fireEvent.change(velocityInput, { target: { value: "4" } });

    const kineticEnergy = screen.getByText(/kinetic energy:/i);
    expect(kineticEnergy).toHaveTextContent("Kinetic Energy: 8.00 J");
  });

  // Requirement 3: Potential energy should update in real time when height is changed.
  test("calculates potential energy in real time as height changes", () => {
    render(<App />);

    const heightInput = screen.getByLabelText(/height \(m\)/i);
    fireEvent.change(heightInput, { target: { value: "5" } });

    const potentialEnergy = screen.getByText(/potential energy:/i);
    expect(potentialEnergy).toHaveTextContent("Potential Energy: 49.05 J");
  });

  // Requirement 4: Provides a reset button that resets all inputs.
  test("resets all inputs to default values when reset button is clicked", () => {
    render(<App />);

    const massInput = screen.getByLabelText(/mass \(kg\)/i);
    const heightInput = screen.getByLabelText(/height \(m\)/i);
    const velocityInput = screen.getByLabelText(/velocity \(m\/s\)/i);
    const resetButton = screen.getByText(/reset/i);

    fireEvent.change(massInput, { target: { value: "5" } });
    fireEvent.change(heightInput, { target: { value: "10" } });
    fireEvent.change(velocityInput, { target: { value: "3" } });

    fireEvent.click(resetButton);

    expect(massInput.value).toBe("1");
    expect(heightInput.value).toBe("1");
    expect(velocityInput.value).toBe("0");
  });

  // Requirement 5: Displays total mechanical energy by adding KE and PE.
  test("displays total mechanical energy (KE + PE) correctly", () => {
    render(<App />);

    const velocityInput = screen.getByLabelText(/velocity \(m\/s\)/i);
    const heightInput = screen.getByLabelText(/height \(m\)/i);

    fireEvent.change(velocityInput, { target: { value: "3" } });
    fireEvent.change(heightInput, { target: { value: "2" } });

    const totalEnergy = screen.getByText(/total energy/i);
    expect(totalEnergy).toHaveTextContent("Total Energy: 44.72 J");
  });

  // Requirement 6: Line chart to visually represent energy changes.
  test("displays a visual representation of energy changes", () => {
    render(<App />);
    const chart = screen.getByTestId("energy-chart"); // Assume chart has data-testid="energy-chart"
    expect(chart).toBeInTheDocument();
  });

  // Requirement 7: Allows users to select different gravitational constants.
  test("allows user to select different gravitational constants", () => {
    render(<App />);

    const gravityInput = screen.getByLabelText(/gravity \(m\/s²\)/i);
    fireEvent.change(gravityInput, { target: { value: "1.62" } }); // Moon's gravity

    const potentialEnergy = screen.getByText(/potential energy:/i);
    expect(potentialEnergy).toHaveTextContent("Potential Energy: 1.62 J");
  });

  // Requirement 8: Correctly displays units for all values.
  test("displays correct units for energy, mass, height, and velocity", () => {
    render(<App />);

    expect(screen.getByText(/kg/i)).toBeInTheDocument();
    expect(screen.getByText(/m/i)).toBeInTheDocument();
    expect(screen.getByText(/m\/s/i)).toBeInTheDocument();
    expect(screen.getByText(/j/i)).toBeInTheDocument();
  });

  // Requirement 9: Shows an error message for invalid/non-numeric inputs.
  test("shows error message if user enters invalid or non-numeric input", () => {
    render(<App />);

    const massInput = screen.getByLabelText(/mass \(kg\)/i);
    fireEvent.change(massInput, { target: { value: "-5" } });

    const errorMessage = screen.getByText(/invalid input/i); // Assume invalid input triggers an error message
    expect(errorMessage).toBeInTheDocument();
  });

  // Requirement 10: Allows users to pause and resume real-time calculations.
  test("allows pausing and resuming of real-time energy calculations", () => {
    render(<App />);

    const pauseButton = screen.getByText(/pause/i);
    const resumeButton = screen.getByText(/resume/i);
    const velocityInput = screen.getByLabelText(/velocity \(m\/s\)/i);

    fireEvent.click(pauseButton);
    fireEvent.change(velocityInput, { target: { value: "5" } });

    const kineticEnergy = screen.getByText(/kinetic energy:/i);
    expect(kineticEnergy).not.toHaveTextContent("12.50 J"); // Should not update while paused

    fireEvent.click(resumeButton);
    expect(kineticEnergy).toHaveTextContent("12.50 J"); // Updates after resume
  });

  // Requirement 11: Works offline and saves the most recent settings using local storage.
  test("saves input settings and loads them on page reload using local storage", () => {
    render(<App />);

    const massInput = screen.getByLabelText(/mass \(kg\)/i);
    fireEvent.change(massInput, { target: { value: "7" } });

    expect(localStorage.getItem("mass")).toBe("7");
  });

  // Requirement 12: Allows users to save and load simulations.
  test("allows users to save and load the simulation state", () => {
    render(<App />);

    const saveButton = screen.getByText(/save/i);
    const loadButton = screen.getByText(/load/i);

    const massInput = screen.getByLabelText(/mass \(kg\)/i);
    fireEvent.change(massInput, { target: { value: "5" } });

    fireEvent.click(saveButton);
    fireEvent.change(massInput, { target: { value: "3" } });

    fireEvent.click(loadButton);
    expect(massInput.value).toBe("5"); // Simulation is restored to previous state
  });
});
