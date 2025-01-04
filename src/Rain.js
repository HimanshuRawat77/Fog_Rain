import React, { useState, useEffect } from "react";
import "./Rain.css";

function Rain() {
  const ROWS = 15;
  const COLS = 20;
  const COLORS = ["red", "green", "blue", "purple", "pink"];

  const SPEED = 100;

  const createInitialGrid = () => {
    let grid = [];
    for (let i = 0; i < ROWS; i++) {
      let row = [];
      for (let j = 0; j < COLS; j++) {
        row.push({
          isActive: false,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
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

        for (let i = ROWS - 1; i > 0; i--) {
          for (let j = 0; j < COLS; j++) {
            newGrid[i][j].isActive = prevGrid[i - 1][j].isActive;
            newGrid[i][j].color = prevGrid[i - 1][j].color;
          }
        }

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
