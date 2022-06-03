import React from 'react';
import data from '../data/data.json';
import { VictoryBar, VictoryChart  } from 'victory';
import { Circle, Fill, Stroke, Style } from "ol/style";
import {connect} from 'react-redux'

function Bar (props){
    console.log(props)

    const features = data.features
    const featuresData = features.map(feature =>( 
        { id : feature.id ,quarter : feature.properties.name , earnings :feature.properties.fish.count , geo:feature.geometry.coordinates }
       

 ))


 console.log(props.popup)

const map = props
const popUp=(name)=>{
// const popupOverlay = props.popup
// return props.popup

let feature = map.map.getLayers().getArray()[1].getSource().getFeatures().find(feat=>{
  if(feat.values_.Name ===  name)
  return feat
  

}) 
console.log(map.map.getLayers().getArray()[1].getSource().getFeatures());
let gemo = feature.getGeometry()
console.log(gemo)

// console.log(map.map.getView().fit(featur.getGeometry(),{maxZoom :8 }))

let styles = {
Point: new Style({
  image: new Circle({
    fill: new Fill({
      color: 'blue',
    }),
    radius: 7,
    stroke: new Stroke({ color:"white",})
    // stroke: new Stroke({ color:"black",width:3})
  }) 
}),

};

feature.setStyle(styles[feature.getGeometry().getType()]);

}
const coloredFeature =(name)=>{
// debugger
  let feature = map.map.getLayers().getArray()[1].getSource().getFeatures().find(feat=>{
    if(feat.values_.Name ===  name)
    return feat
    
  
}) 
console.log(map.map.getLayers().getArray()[1].getSource().getFeatures());
let gemo = feature.getGeometry()
console.log(gemo)

// console.log(map.map.getView().fit(featur.getGeometry(),{maxZoom :8 }))

let styles = {
  Point: new Style({
    image: new Circle({
      fill: new Fill({
        color: 'white',
      }),
      radius: 7,
      stroke: new Stroke({ color:"black",width:3})
    }) 
  }),
  
};

feature.setStyle(styles[feature.getGeometry().getType()]);
  console.log(feature)
// map.map.getView().fit(feature.getGeometry(),{maxZoom :8 });



}

//  console.log(map.map.getLayers())
//  console.log(featuresData)

    return (
 <div className="row" style={{height:200 }}>
   <label>Total Production</label>
    <VictoryChart 
     domainPadding={{x:30}} 
     width={1200}
    
    
    >
        <VictoryBar
        data={featuresData}
        labels={({ datum }) => ``}
        type = {featuresData.earnings}
        x="quarter"
       y="earnings"
            style={{   
              labels: {fontSize: 20, fill: "white"} ,
            data: { fill: "#c43a31" , stroke: "white" , strokeWidth: 3,  }}}
            events={
              
              [{
                    target: "data",
                    eventHandlers: {
                      
                  onMouseOver: () => {
                    
                        return [{

                          target: "labels",
                          
                          mutation: ({datum}) => {
                            popUp(datum.quarter)
                            return datum === "clicked" ? null : { text: `${datum.quarter} :${datum.earnings}` }  
                            
                            
                          } , 
                          
                        }];
                      },
                      onMouseOut: () => {
                        // popUp()
                        return [{
                          target: "labels",
                          mutation: () => {
                            return null;

                          }
                        }];
                      },
                  
        onClick: () => {

     
          
          return [
            
            {
            
              target: "data",
              mutation: (props) => {
                const fillOpacity = props.style && props.style.fillOpacity;
                return fillOpacity ===  0.7 ? null : { style: { fill:  0.7 } }
              }
        } , 
        {
          target: "labels",
          mutation: ({ datum }) => {
            return datum === "clicked" ? null : { text: `${datum.earnings}`},
            coloredFeature(datum.quarter)
            

            
          },
          
        },
       
      ];
      
    }
  }
}]}
 
/>
</VictoryChart>
</div>
    );
}
function mapToprops(state){
return {
  map : state.map , 
  popup : state.pop
}
}
export default connect(mapToprops)(Bar);

// import React from 'react';
// import data from '../data/data.json';
// import { VictoryBar, VictoryChart  } from 'victory';


// function Bar (){
//     console.log(data.features)
//     const features = data.features
//     const handleClick =(name)=>{
//       console.log(this.props.Map);
//       // let feature = this.props.Map
//       let feature =this.props.Map.getLayers().getArray()[1].getSource().getFeatures().find(feat=>{
//         if(feat.values_.Name === name)
//         return feat
//       })
//       console.log(feature)
//     //   this.props.Map.getView().fit(feature.getGeometry(),{
//     //     maxZoom :8
//     // })
   
//     this.props.Map.getView().fit(feature.getGeometry(),{
//       maxZoom :8
//   })}
 
//     const featuresData = features.map(feature =>( 
//         { id : feature.id ,quarter : feature.properties.name , earnings :feature.properties.fish.count }

//  ))



//  console.log(featuresData)

//     return (
//  <div className="row" style={{height:200 }}>
//     <VictoryChart 
//      domainPadding={{x:30}} 
//      width={1000}
    
    
//     >
//         <VictoryBar
//         data={featuresData}
//         x="quarter"
//        y="earnings"
//             style={{ data: { fill: "#c43a31" , stroke: "white" , strokeWidth: 3,fontSize:30  }}}
//             events={[{
//                     target: "data",
//                     eventHandlers: {
//         onClick: () => {
//           handleClick('quarter')
//           return [
//             {
//               target: "data",
//               mutation: (props) => {
//                 const fillOpacity = props.style && props.style.fillOpacity;
//                 return fillOpacity ===  0.7 ? null : { style: { fill:  0.7 } };

//             }
//         }
//       ];
//     }
//   }
// }]}
 
// />
// </VictoryChart>


    
    
// </div>
//     );
// }

// export default Bar;