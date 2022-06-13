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
      
      <Grid numberOfCells={12} />
    </div>
  );
}
export default Cool;