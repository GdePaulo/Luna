import React from 'react';
import rabbit from "../images/rabbit.png"
import Title from "../components/Title";
import Grid from "../components/Grid"

function Cool() {
  return (
    <div>
      <Title title="Cool">
        Dijkstra's algorithm implemented with JavaScript
      </Title>
      <div className="luna-body">
        <p>This page contains a host of items which I thought would be fun to implement but which might not necessarily be directly useful.
          Below you can find an implementation of the classic Dijkstra's pathfinding algorithm using JavaScript.</p>
        <Grid numberOfCells={12} />
      </div>
    </div>
  );
}
export default Cool;