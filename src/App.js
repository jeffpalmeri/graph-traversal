import React, { useState, useCallback, useRef } from 'react';
import './App.css';

const numRows = 3;
const numColumns = 3;

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

// function getUnivsitedNeighbors(grid, i, j) {
//   let neigh = [];
//   if (i + 1 < grid.length && !grid[i + 1][j]) neigh.push([i + 1, j]);
//   if (i - 1 >= 0 && !grid[i - 1][j]) neigh.push([i - 1, j]);
//   if (j + 1 < grid[i].length && !grid[i][j + 1]) neigh.push([i, j + 1]);
//   if (j - 1 >= 0 && !grid[i][j - 1]) neigh.push([i, j - 1]);
//   return neigh;
// }

// let testGrid = generateEmptyGrid();
// testGrid[2][1] = 1;
// // testGrid[2][3] = 1;
// testGrid[1][2] = 1;
// // testGrid[3][2] = 0;
// console.log('TESTGRID: ', testGrid);
// // console.log(getUnivsitedNeighbors(testGrid, 2, 2));

// let numberOfZeros = 0;
// for (let row = 0; row < numRows; row++) {
//   for (let column = 0; column < numColumns; column++) {
//     if (testGrid[row][column] === 0) {
//       numberOfZeros++;
//     }
//     console.log('grid[row][column]', grid[row][column]);
//     console.log('NUMBEROFZEROS', numberOfZeros);
//   }
// }

let start = [2, 2];
const stack = [start];
const result = [];
let currentVertex;
let i;
let j;

const App = () => {
  const [grid, setGrid] = useState(() => generateEmptyGrid());
  const [running, setRunning] = useState(false);
  const stack = useRef([[1, 1]]);
  // console.log('pre-pop', stack.current);
  // let test = stack.current.pop();
  // console.log('test', test);

  console.log('rerender*****************');

  const runningReference = useRef(running);
  // runningReference.current = running;
  // console.log('what is this', runningReference.current);

  const runSimulation = useCallback(() => {
    if (!runningReference.current) return;
    if (!stack.current.length) {
      setRunning(false);
      return;
    }

    // console.log(grid);
    // let numberOfZeros = 0;
    // for (let row = 0; row < numRows; row++) {
    //   for (let column = 0; column < numColumns; column++) {
    //     if (grid[row][column] === 0) {
    //       numberOfZeros++;
    //       console.log(numberOfZeros);
    //     }
    //   }
    //   if (numberOfZeros === 0) return;
    // }

    setGrid((g) => {
      let gridCopy = JSON.parse(JSON.stringify(g));

      if (stack.current.length) {
        currentVertex = stack.current.pop();
        i = currentVertex[0];
        j = currentVertex[1];
        let univsitedNeighbors = getUnivsitedNeighbors(gridCopy, i, j);
        console.log(
          'UNVISITEDnEIGHBORS: ',
          JSON.parse(JSON.stringify(univsitedNeighbors))
        );

        univsitedNeighbors.forEach((neighbor) => {
          stack.current.push(neighbor);
          // gridCopy[neighbor[0]][neighbor[1]] = 1;
        });

        gridCopy[i][j] = 1;
        console.log(JSON.parse(JSON.stringify(stack.current)));
        console.log('current: ', JSON.parse(JSON.stringify(currentVertex)));
      }

      return gridCopy;
    });

    function getUnivsitedNeighbors(grid, i, j) {
      let neigh = [];
      if (i + 1 < grid.length && !grid[i + 1][j]) neigh.push([i + 1, j]);
      if (i - 1 >= 0 && !grid[i - 1][j]) neigh.push([i - 1, j]);
      if (j + 1 < grid[i].length && !grid[i][j + 1]) neigh.push([i, j + 1]);
      if (j - 1 >= 0 && !grid[i][j - 1]) neigh.push([i, j - 1]);
      return neigh;
    }

    console.log(JSON.parse(JSON.stringify(grid)));
    // let numberOfZeros = 0;
    // for (let row = 0; row < numRows; row++) {
    //   for (let column = 0; column < numColumns; column++) {
    //     if (grid[row][column] === 0) {
    //       numberOfZeros++;
    //       console.log(numberOfZeros);
    //     }
    //   }
    //   if (numberOfZeros === 0) return;
    // }

    setTimeout(runSimulation, 1000);
  }, []);

  function getUnivsitedNeighbors(grid, i, j) {
    let neigh = [];
    if (i + 1 < grid.length && !grid[i + 1][j]) neigh.push([i + 1, j]);
    if (i - 1 >= 0 && !grid[i - 1][j]) neigh.push([i - 1, j]);
    if (j + 1 < grid[i].length && !grid[i][j + 1]) neigh.push([i, j + 1]);
    if (j - 1 >= 0 && !grid[i][j - 1]) neigh.push([i, j - 1]);
    return neigh;
  }

  // console.log(getUnivsitedNeighbors(grid, 5, 5));

  let gridRender = grid.map((row, i) => (
    <div className='row' key={i}>
      {row.map((col, k) => (
        <div
          key={`${i}-${k}`}
          onClick={() => {
            let gridCopy = JSON.parse(JSON.stringify(grid));
            gridCopy[i][k] = grid[i][k] ? 0 : 1;
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
      <div className='grid'>{gridRender}</div>
    </div>
  );
};

export default App;

//get the neighboring cells
//change the state of each of those cells to 1
// add each of those cells to the stack
