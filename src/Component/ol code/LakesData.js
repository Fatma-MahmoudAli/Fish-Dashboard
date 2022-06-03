

import React, { Component } from 'react'
import 'ol/ol.css';
import data from '../data/data.json'
import View from 'ol/View';
import {easeIn, linear , inAndOut , upAndDown} from 'ol/easing';

import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

class Zooming extends Component {

    constructor(props) {
        super(props)
        this.state = {
        list : data.features
        } 
    
    }
    
    // componentDidMount(){

    //   console.log(props);
    // }
      
    handleClick =(name)=>{
      console.log(this.props.Map);
      // let feature = this.props.Map
      let feature =this.props.Map.getLayers().getArray()[1].getSource().getFeatures().find(feat=>{
        if(feat.values_.Name === name)
        return feat
      })
      // console.log(this.props.Map.getLayers().getArray()[1].getSource().getFeatures())
      console.log(feature)
      let styles = {
        Point: new Style({
          image: new CircleStyle({
            fill: new Fill({
              color: 'white',
            }),
            radius: 7,
            stroke: new Stroke({ color:"red",width:3})
          })
        }),
      };
      feature.setStyle(styles[feature.getGeometry().getType()]);
      
   console.log(styles[feature.getGeometry().getType()])
      //cut here
    this.props.Map.getView().fit(feature.getGeometry(),{
      maxZoom :8 , 
      // easing : linear( {t:0.9}) , 
      size : [100,100]
  })

// const view = this.props.Map.getView()

// console.log(this.props.Map.getView())
// this.props.Map.getView().animate({
//   duration: 2000,
//   easing: easeIn,
// }).fit(feature.getGeometry(),{
//   maxZoom :8
// })


    }

// this.setState({map:map})

                
    
    render() {
      console.log(this.state.list)
      let listData = this.state.list.map((item) => {
        return (
          //  console.log(item) ,
         <div className="list">
            <ol ><li key={item.properties.id} onClick={()=>this.handleClick(item.properties.name)}> 
            
            lake : {item.properties.name}
          <h6>{item.properties.location}</h6>
          
          </li></ol>
          
         </div>
        )
      })
      // console.log(listData)
        return (
            <div >
            {listData}
            </div>
    )
    }
}

export default Zooming

 // console.log(feature.getLayers().getArray()[1].getSource().getFeatures().find(feat=>{
      //   if(feat.values_.Name === name)
      //   return feat
      // }))
      // console.log(feature.getLayers().getArray()[1].getSource().getFeatures()[0].values_.Name)