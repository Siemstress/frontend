<template>
  <svg id="worldmap"></svg>
</template>
<script>
import * as d3 from "d3";
import _ from 'lodash';

export default {
  name: "worldmap",
  props: {
    //Raw data, should be in a {code, incidentCount} array
    rawData: {
      type: Array,
      required: false,
      default: function () {
        return [{code: 'RUS', incidentCount: 0}]
      }
    },

    //Width of the component
    componentWidth: {
      type: Number,
      default: 750
    },
    //Height of the component
    componentHeight: {
      type: Number,
      default: 600
    },
  },
  methods: {
    parseData() {
      //Map the country code to the object
      this.data = d3.map(this.configs.rawData, function (d) {
        return d.code
      })
      
    },

    initializeDimensions() {
      //Initialize the dimensions
      document.getElementById('worldmap').style.width = this.configs.componentWidth;
      document.getElementById('worldmap').style.height = this.configs.componentHeight;
    },
    init() {
      //Initialize variables
      this.svg = d3.select("#worldmap");
      this.configs = this._props;
      //Call initialization functions
      this.initializeDimensions();
      this.parseData()

    },
    draw(error, geodata) {
      //Localize the data for callback functions
      let data = this.data;
      //Initialize the color scale
      this.max_count = _.maxBy(data.values(), function(o) {return o.incidentCount}).incidentCount
      if (this.max_count == 0){
        this.max_count = 0.1
      }
      var colorScale = d3.scaleSequential(d3.interpolate("lightgrey", "red"))
          .domain([0, this.max_count]);
      //Add the countries and their fill
      this.svg.append("g")
          .selectAll("path")
          .data(geodata.features)
          .enter()
          .append("path")
          .attr("d", d3.geoPath()
              .projection(this.projection)
          )
          .attr("border-style", "country")
          .attr("fill", function (d) {
            d.incidentCount = typeof data.get(d.id) == "undefined" ? 0 : data.get(d.id).incidentCount;
            return colorScale(d.incidentCount);
          })
          .style('stroke', 'black')
          .style('stroke-width', '1');

    }
  },
  mounted() {
    this.init()
    //Localize width and height
    let width = this.svg.node().getBoundingClientRect().width
    let height = this.svg.node().getBoundingClientRect().height

    this.projection = d3.geoMercator()
        .scale(50 * (width / 350))
        .center([0, 0 + (height / 12)])
        .translate([width / 2, height / 2]);

    d3.queue()
        .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
        .await(this.draw);


  },
  watch: {
    data: function (value) {
      this.data = value;
      this.draw();
    }
  }
};
</script>
<style lang="scss">
</style>
