import React, { useState, useEffect } from "react";
import "./Rain.css"; // Import the CSS file

function Rain() {
  const ROWS = 15; // Number of rows
  const COLS = 20; // Number of columns
  const COLORS = ["#4287f5", "#42c5f5", "#42f5ef", "#42f5c5"]; // Colors for raindrops
  const SPEED = 100; // Speed of the animation in milliseconds

  // Create the initial grid with inactive cells
  const createInitialGrid = () => {
    let grid = [];
    for (let i = 0; i < ROWS; i++) {
      let row = [];
      for (let j = 0; j < COLS; j++) {
        row.push({
          isActive: false, // No raindrop in the cell
          color: COLORS[Math.floor(Math.random() * COLORS.length)], // Random color
        });
      }
      grid.push(row);
    }
    return grid;
  };

  const [grid, setGrid] = useState(createInitialGrid);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        let newGrid = createInitialGrid();

        // Move drops down by one row
        for (let i = ROWS - 1; i > 0; i--) {
          for (let j = 0; j < COLS; j++) {
            newGrid[i][j].isActive = prevGrid[i - 1][j].isActive;
            newGrid[i][j].color = prevGrid[i - 1][j].color;
          }
        }

        // Create new drops in the first row
        for (let j = 0; j < COLS; j++) {
          if (Math.random() < 0.3) {
            newGrid[0][j].isActive = true;
            newGrid[0][j].color =
              COLORS[Math.floor(Math.random() * COLORS.length)];
          }
        }

        return newGrid;
      });
    }, SPEED);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rain-container">
      <div
        className="rain-grid"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="rain-cell"
              style={{
                backgroundColor: cell.isActive ? cell.color : "transparent",
              }}
            ></div>
          ))
        )}
      </div>
    </div>
  );
}

export default Rain;
