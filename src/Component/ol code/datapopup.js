
import React, { Component } from 'react'
import 'ol/ol.css';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import Overlay from 'ol/Overlay';
import XYZ from 'ol/source/XYZ';
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import Zooming from './LakesData';
import { connect } from 'react-redux';


class Datamap extends Component {

    constructor(props) {
        super(props)
        this.state = {
            map: undefined , 
            error: null,
            isLoaded: false,
            PopUp : undefined,
            lake: [] , 
            lakeList : []
            
        } 
        this.inputRef = React.createRef()
        this.contentRef = React.createRef()
        this.closeRef = React.createRef()
    }
    
    componentDidMount(){

    
  
//popup 
const container = this.inputRef.current
const content = this.contentRef.current
const closer = this.closeRef.current

const overlay = new Overlay({
 element: container,
 autoPan: {
   animation: {
     duration: 250,
   },
 },
}); 
/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
 closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
  };
  
  const key = 'get_your_own_D6rA4zTHduk6KOKTXzGB';
  const attributions =
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

    let layer =   new TileLayer({
        source: new XYZ({
            attributions: attributions,
            url: 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=' + key,
            tileSize: 512,  })
   })
   
    const map = new Map({
    layers: [layer],
    overlays: [overlay],
    target: 'map',
    view: new View({
        center: [3414594.9, 3209132.2],
        zoom: 5,
    }),
  });

  const url = 'http://localhost:8000/features';
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(lakes=>{
			
      
 this.setState({lakeList:lakes})
 // json data 
for (var index = 0; index < lakes.length; index++) {
	this.state.lake.push(
		{
			"type": "Feature",
      'crs': {
        'type': 'name',
        'properties': {
          'name': 'EPSG:3857',
        },
      },
			"geometry": {
				"type": "Point",
				"coordinates": [
					lakes[index].geometry.coordinates.latitude,
					lakes[index].geometry.coordinates.longitude
        ] , 
        
		},
        "properties": {
        "Name":lakes[index].properties.name,
				"fishName" : lakes[index].properties.fish.fishType,
        "fishCount" : lakes[index].properties.fish.count,
        "City" :lakes[index].properties.City,
        "Totalproduction" : lakes[index].properties.Totalproduction,
        "Gear":lakes[index].properties.Gear
			}
})
}
   
    //  })  ; //endfiile


    var geojson = {
        "type":"FeatureCollection",
        "features":this.state.lake  
    } 

    
// style

  //you can use feature data in if conditions if you want 
  const styleFunction = function (feature, color) {
  // let image = new CircleStyle({
  //   fill: new Fill({
  //     color: color,
  //   }),
  //   radius: 5,
  //   stroke: new Stroke({ color:"white",})
  // });
  let image
  if(feature.values_.fishName === 'Tilapia'){
    
     image = new CircleStyle({
      fill: new Fill({
        color: 'blue',
      }),
      radius: 7,
      stroke: new Stroke({ color:"white",})
    });
    
  } else if (feature.values_.fishName === 'Crab'){
     image = new CircleStyle({
      fill: new Fill({
        color: 'yellow',
      }),
      radius: 7,
      stroke: new Stroke({ color:"white",})
    });
  }else if (feature.values_.fishName === 'Oyster'){
     image = new CircleStyle({
      fill: new Fill({
        color: '#7948DB',
      }),
      radius: 7,
      stroke: new Stroke({ color:"white",
    // width:3
    })
    });
  }else { 
     image = new CircleStyle({
    fill: new Fill({
      color: '#148B40',
    }),
    radius: 7,
    stroke: new Stroke({ color:"white",})
  }); }
  let styles = {
    Point: new Style({
      image: image,
    }),
    
  };
  feature.setStyle(styles[feature.getGeometry().getType()]);
  return styles[feature.getGeometry().getType()];}
  
    const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojson),
      });
       const DataFile = new VectorLayer ({
        source : vectorSource ,  
        style: (feature)=>styleFunction (feature, "blue")
      })
     
      // console.log(defaultStyle)
      console.log(styleFunction)

      //  console.log(geojson.features)
      //fly to
      console.log(vectorSource.getFeatures())
      const features = vectorSource.getFeatures()
      function findName(features){
        return features.values_.Name === 'Nasser'
      }
       console.log(features.find(findName))
      console.log(features.find(findName).getGeometry())
      map.addLayer(DataFile); 
      







// map.on('singleclick', function (evt) {
// const coordinate = evt.coordinate;
// content.innerHTML = 'You clicked here: '
// overlay.setPosition(coordinate);
// });

// DataFile.on('singleclick', function (evt) {
//     const coordinate = evt.coordinate;
//     content.innerHTML = 'You clicked here: '
//     overlay.setPosition(coordinate);
//     });
const popUp = map.on('pointermove',(e)=>{
  console.log(e);
  let pixel = e.pixel;
  let feature = map.forEachFeatureAtPixel(pixel, function (feature) {
    return feature;
  });
  

if(feature){
  console.log(feature.values_)

  content.innerHTML = `<ul> <h5>Lake Data</h5>
  <li> <h6> <span> Name : </span> ${feature.values_.Name}</h6></li>
  <li> <h6> <span> City : </span> ${feature.values_.City}</h6></li>
  <li> <h6> <span> Total Production : </span> ${feature.values_.Totalproduction}</h6></li>
  <li> <h6> <span> Common Fish : </span> ${feature.values_.fishName}</h6></li>
  <li> <h6> <span> Fish Count : </span> ${feature.values_.fishCount}</h6></li>
  <li> <h6> <span> Gear : </span>${feature.values_.Gear}</h6></li>
  </ul>`
  overlay.setPosition(e.coordinate);
}else{
  content.innerHTML = "";
  overlay.setPosition (undefined);
}
})
this.setState({PopUp:popUp})
this.props.setPOP(popUp);
// console.log(popUp)
 })
 this.props.setMap(map);
this.setState({map:map})
// console.log(this.state.PopUp)
// this.setState({PopUp:popUp})
//  this.props.setColor(this.state.defaultStyle)
//  console.log(this.state.defaultStyle)
//  this.setState({defaultStyle:})
    }
    render() {
     
      // let listData = this.state.lakeList.map((item) => {
      //   return (
       
      //    <div className="list">
      //       <ol ><li key={item.properties.id}> lake : {item.properties.name}
      //     <h6>{item.properties.location}</h6>
      //     </li></ol>
      //    </div>
         
      //   )
      // })
      // console.log(listData)
        return (
            <div className="row">
                <section id='map' className='col-8' ></section>
                {/* <section className='col-0'></section> */}
                <section className='col-4' id='list'> 
                <h4>Lakes : </h4>
                <Zooming Map={this.state.map}/>
                </section>
                <div ref={this.inputRef} className="ol-popup" >
                <div ref={this.contentRef} id="popup" ></div>
                <div ref={this.closeRef} className="ol-popup-closer"></div>
                </div>
                
            </div>
    )
    }
}
const mapDispatchToProps =(dispatch)=>{
  return{
    setMap:(data)=>dispatch({type:"SET_MAP", data}), 
     setPop:(popup)=>dispatch({type:"SET_POP", popup})
  }
}

export default connect(null, mapDispatchToProps)(Datamap)

