import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import GridCell from './GridCell';
function Grid(props) {

    const getNeighbors = (id) => {
        var size = 3;
        return [id - size, id + size, id - 1, id + 1].filter(x => x >= 0 && x < props.numberOfCells);
    };
    // const cells = [...Array(props.numberOfCells).keys()].map(x =>
    //     <div>
    //         {x}:{getNeighbors(x)}
    //     </div>

    // )
    const cells = [...Array(props.numberOfCells).keys()].map(x => {
        let neighbors = getNeighbors(x);
        let weights = neighbors.map(x => x);
        return <GridCell id={x} neighbors={neighbors} weights={weights} />
    });

    const Dijkstra = (source) => {
        let d = new Array(cells.length);
        let p = new Array(cells.length);
        let q = [];
        cells.map(x => {
            d[x.props.id] = Number.MAX_VALUE;
            p[x.props.id] = -1;
            q.push(x);
        });
        d[source] = 0;
        console.log("i'm here")

        while (q.length) {
            q.sort((a, b) => d[b.props.id] - d[a.props.id]);
            let u = q.pop();

            u.props.neighbors.forEach((x, i) => {
                let alt = d[u.props.id] + u.props.weights[i];
                if (alt < d[x]) {
                    d[x] = alt;
                    p[x] = u.props.id;
                }
            });
        }
        console.log(p)
        return d, p;
    };
    return (
        <div className="container">
      {cells}
      {cells[0].props.id}
      {Dijkstra(0)[1]}
    </div>
    );
}
export default Grid;