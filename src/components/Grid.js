import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import GridCell from './GridCell';
function Grid(props) {

    const getNeighbors = (id) => {
        var size = 3;
        return [id - size, id + size, id - 1, id + 1].filter(x => x >= 0 && x < props.numberOfCells);
    };

    const [route, setRoute] = useState([]);

    const cells = [...Array(props.numberOfCells).keys()].map(x => {
        let neighbors = getNeighbors(x);
        let weights = neighbors.map(x => x);
        return <GridCell id={x} neighbors={neighbors} weights={weights} className={route.includes(x) ? "grid-cell visited" : "grid-cell"} />
    });

    const Dijkstra = (source) => {
        let d = new Array(cells.length);
        let p = new Array(cells.length);
        let q = [];
        cells.forEach(x => {
            d[x.props.id] = Number.MAX_VALUE;
            p[x.props.id] = -1;
            q.push(x);
        });
        d[source] = 0;

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
        return [d, p];
    };
    const getRoute = (end, p) => {
        let x = p[end];
        let result = [end];
        while (x !== -1) {
            result.push(x);
            x = p[x];
        }
        setRoute(result);
    };
    useEffect(()=>{
        // do stuff here...
        let p = Dijkstra(0)[1];
        getRoute(9, p);
    }, []) // <-- empty dependency array
    return (
        <div className="container">
      {cells}
      {cells[0].props.id}
      {/* {Dijkstra(0)} */}
      
    </div>
    );
}
export default Grid;