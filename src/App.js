import React, { useState, useCallback, useRef } from 'react';
import breadthFirstTraversal from './algotithms/breadthFirstTraversal';
import './App.css';

const numRows = 25;
const numColumns = 25;

const generateEmptyGrid = () => {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    grid.push([]);
    for (let k = 0; k < numColumns; k++) {
      grid[i][k] = 0;
    }
  }
  return grid;
};

const App = () => {
  const [grid, setGrid] = useState(() => generateEmptyGrid());
  const [running, setRunning] = useState(false);
  const gridRef = useRef(grid);
  const startingNode = useRef();
  const stack = useRef([startingNode.current]);

  const runningReference = useRef(running);

  const runSimulation = useCallback(() => {
    if (!runningReference.current) return;
    if (!stack.current.length) {
      setRunning(false);
      return;
    }

    setGrid((g) => {
      let gridCopy = JSON.parse(JSON.stringify(g));

      breadthFirstTraversal(gridCopy, stack.current, getUnivsitedNeighbors);

      gridRef.current = gridCopy;
      return gridCopy;
    });

    let numberOfZeros = 0;
    for (let row = 0; row < numRows; row++) {
      for (let column = 0; column < numColumns; column++) {
        if (gridRef.current[row][column] === 1) {
          numberOfZeros++;
        }
      }
      if (numberOfZeros === numRows * numColumns) return setRunning(false);
    }

    setTimeout(runSimulation, 10);
  }, []);

  function getUnivsitedNeighbors(grid, i, j) {
    let neigh = [];
    if (i + 1 < grid.length && !grid[i + 1][j]) neigh.push([i + 1, j]);
    if (i - 1 >= 0 && !grid[i - 1][j]) neigh.push([i - 1, j]);
    if (j + 1 < grid[i].length && !grid[i][j + 1]) neigh.push([i, j + 1]);
    if (j - 1 >= 0 && !grid[i][j - 1]) neigh.push([i, j - 1]);
    return neigh;
  }

  const resetGrid = () => {
    runningReference.current = false;
    setGrid(() => generateEmptyGrid());
    gridRef.current = grid;
    stack.current = [];
    setRunning(false);
  };

  let gridRender = grid.map((row, i) => (
    <div className='row' key={i}>
      {row.map((col, k) => (
        <div
          key={`${i}-${k}`}
          onClick={() => {
            let gridCopy = JSON.parse(JSON.stringify(grid));
            gridCopy[i][k] = grid[i][k] ? 0 : 1;
            startingNode.current = [i, k];
            stack.current = [startingNode.current];
            setGrid(gridCopy);
          }}
          style={{
            width: 20,
            height: 20,
            border: '1px solid black',
            backgroundColor: grid[i][k] ? 'blue' : 'transparent',
          }}
          className='cell'
        ></div>
      ))}
    </div>
  ));

  return (
    <div>
      <button
        onClick={() => {
          if (!running) {
            runningReference.current = true;
            runSimulation();
          } else {
            runningReference.current = false;
          }
          setRunning(!running);
        }}
      >
        {running ? 'Stop' : 'Start'}
      </button>
      <button
        onClick={() => {
          resetGrid();
        }}
      >
        Reset
      </button>
      <div className='grid'>{gridRender}</div>
    </div>
  );
};

export default App;
