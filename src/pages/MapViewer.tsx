import React from 'react';
import * as d3 from 'd3'
//@ts-ignore
import * as d3tile from 'd3-tile'

const HTTP_SERVER = 'http://192.168.1.252:8080'
function MapViewer() {
    let width = 200 //Math.max(960, window.innerWidth)
    let height = 200 //Math.max(500, window.innerHeight) 

    // to build tiles manually, not used 
    function createTiles(){
        let res = 1024//512//256//128
        //let zz = 0//1//2//3
        let sca = 1024

        let projection = d3.geoMercator().scale(sca).translate([res, res])
        let t = projection.translate(),
        s = projection.scale(),
        z = Math.max(Math.log(res)/Math.log(2) - 8, 0 ),
        rz = Math.floor(z),
        ts = res * Math.pow(2, z-rz)

        
        let tile_origin = [s/2-t[0], s/2-t[1]]
        let myTiles:any = []
        let cols = d3.range(
            Math.max(0, Math.floor((tile_origin[0]-width)/ts)),
            Math.max(0, Math.ceil((tile_origin[0]+width)/ts))
        );
        let rows = d3.range(
            Math.max(0, Math.floor((tile_origin[1]-height)/ts)),
            Math.max(0, Math.ceil((tile_origin[1]+height)/ts))
        );
        
    

        cols.forEach(function(x:any){
            rows.forEach(function(y:any){
                myTiles.push([Math.floor(z), x, y])
            })
        })
        console.log("myTiles.length ", myTiles.length)
     return myTiles

    }


    //const tilesMap = () => {
        const svg = d3.select("body")
                        .append("svg")
        //@ts-ignore
                        .attr("viewBox", [0, 0, width, height]);
      
        const tile = d3tile.tile()
            //.extent([[0, 0], [width, height]])
            //.tileSize(512)
            //.clampX(false);
            .size([width, height])
      
        const zoom = d3.zoom()
            .scaleExtent([1 << 7, 1 << 11])
            //.extent([[0, 0], [width, height]])
            .on("zoom", () => zoomed(d3.event.transform));
      
        let image = svg.append("g")
            .attr("pointer-events", "none")
          .selectAll("image");
      
        svg
            .call(zoom)
            .call(zoom.transform, d3.zoomIdentity
              .translate(width/2, height/2)
              .scale(1 << 7));
      
        function zoomed(transform:any) {
          const tiles = tile(transform);
      
          image = image.data(tiles, (d:any) => d).join("image")
              .attr("xlink:href", (d:any) => {
                  console.log("what is my d ", d)
                    return `${HTTP_SERVER}/src/assets/tiled/${d[2]}/${d[0]}/${d[1]}.jpg `
              })
              //@ts-ignore
              .attr("x", ([x]) => (x + tiles.translate[0]) * tiles.scale)
              //@ts-ignore
              .attr("y", ([, y]) => (y + tiles.translate[1]) * tiles.scale)
              .attr("width", tiles.scale)
              .attr("height", tiles.scale);
        }
      
        //return svg.node();
      //}
                
  return (
      <div>
          <h1>Welcome to view Tiled Map</h1>
          <p> View detailed map by zooming in and panning</p>
      </div>
     )
}

export default MapViewer;
