const breadthFirstTraversal = (gridCopy, stack, getUnivsitedNeighbors) => {
  if (stack.length) {
    let currentVertex = stack.pop();
    let i = currentVertex[0];
    let j = currentVertex[1];
    let univsitedNeighbors = getUnivsitedNeighbors(gridCopy, i, j);

    univsitedNeighbors.forEach((neighbor) => {
      stack.push(neighbor);
      gridCopy[neighbor[0]][neighbor[1]] = 1;
    });
  }
};

export default breadthFirstTraversal;

//
// if (stack.current.length) {
//   currentVertex = stack.current.pop();
//   i = currentVertex[0];
//   j = currentVertex[1];
//   let univsitedNeighbors = getUnivsitedNeighbors(gridCopy, i, j);

//   univsitedNeighbors.forEach((neighbor) => {
//     stack.current.push(neighbor);
//     gridCopy[neighbor[0]][neighbor[1]] = 1;
//   });
// }
