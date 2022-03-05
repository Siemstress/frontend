<template>
  <div class="card">
    <div class="card-header">
      Hostname
    </div>
    <div class="card-body">
      <div class="row">
        <div style="height: 150px" :id="`cpu${id}`" class="col-3"></div>
        <div style="height: 150px" :id="`memory${id}`" class="col-3"></div>
        <div style="height: 150px" :id="`network${id}`" class="col-3"></div>
        <div style="height: 150px" :id="`disk${id}`" class="col-3"></div>
      </div>
    </div>
    <div class="card-footer">

    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "AgentCard",
  props: {
    agentId: Number
  },
  data() {
    return {
      id: null,
      intervalId: null
    }
  },
  beforeMount() {
    this.id = this._uid;
  },
  mounted() {
    let cpuChart = echarts.init(document.getElementById(`cpu${this.id}`));
    let memoryChart = echarts.init(document.getElementById(`memory${this.id}`));
    let networkChart = echarts.init(document.getElementById(`network${this.id}`));
    let diskChart = echarts.init(document.getElementById(`disk${this.id}`));

    function generateOptions(title) {
      return {
        title: {
          text: title,
          left: "center",
          top: "center"
        },
        series: [{
          type: "pie",
          radius: ["70%", "100%"]
        }]
      };
    }

    cpuChart.setOption(generateOptions("CPU"));
    memoryChart.setOption(generateOptions("RAM"));
    networkChart.setOption(generateOptions("Net"));
    diskChart.setOption(generateOptions("Disk"));

    this.intervalId = setInterval(async () => {
      let data = this.$apiCall("GET","/api/getStatus/"+this.agentId);

    }, 1000);


  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  }
}
</script>

<style scoped>

</style>
