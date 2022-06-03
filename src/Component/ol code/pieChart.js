import React from 'react';
import {VictoryPie} from "victory-pie" ; 
import Bar from './dataChart';

function Chart (){
const myData = [
    { id : 1 ,x : "Nile River" , y :84648 }, 
    { id : 2 ,x : "Red sea" , y : 43978} , 
    {id : 3 ,x : "Mediterranean Sea" , y : 73888},
    {  id : 4 , x : "lakes" , y : 179199} ,
    {  id : 5 ,x : "Aquaculture" , y : 919585} 
]



    return (
 <div className="row">
          <section  style={{height:230}} className='col-lg-4'>
            <VictoryPie 
                style={{
                    data: {
                      fillOpacity: 0.9, stroke: "white", strokeWidth: 1
                    },
                    labels: {
                      fontSize: 24, fill: "white"
                    }
                  }}

                  
            data = {myData} 
            // labels={({ datum }) => `${datum.x}: ${datum.y}`}
            labels={({ datum }) => `${datum.x}`}
            labelPosition={({ index }) => index ? "centroid": "startAngle" }
             colorScale = {["rgb(134, 170, 238)" , "rgb(63, 124, 236)" , "rgb(8, 68, 179)" , "rgb(59, 100, 177)" , "rgb(27, 61, 124)"]}
             radius = {120}
             events={[{
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        target: "data",
                        mutation: ({ style }) => {
                          return style.fill === "rgb(127, 173, 194)" ? null : { style: { fill: "rgb(127, 173, 194)" } };
                        }
                      },{
                      target: "labels",
                      mutation: ({datum}) => {
                        return datum === "clicked" ? null : { text: `${datum.x} :${datum.y}` }  
                      } , 
                    }];
                  },
                  onMouseOut: () => {
                    return [{
                      target: "labels",
                      mutation: ({datum}) => {
                        return datum === "clicked" ? null : { text: `${datum.x}`};

                      }
                    }];
                  },
       
                }
              }]}

            />
        </section>
     
        <section className='col-lg-8' >

        <Bar />

        </section>
 </div>
      );
}
 
export default Chart;