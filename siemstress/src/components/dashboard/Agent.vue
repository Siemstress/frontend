<template>
  <div class="card" :data-agent-id="agent.id">
    <div class="card-header">
      <div class="row">
        <div class="col-8 text-start">
          {{this.agentObj.hostname || "Unknown Hostname"}}
          <small class="text-muted">&nbsp;- {{this.agentObj.operatingSystem || "Unknown OS"}}</small>
        </div>
        <a class="col-4 text-end"><i class="bi bi-gear-fill"></i></a>
      </div>
    </div>
    <div class="card-body">
      <!-- progress charts -->
      <div class="row">
        <div class="col-3 chart" :id="`chart-cpu-${this.agentObj.id}`"></div>
        <div class="col-3 chart" :id="`chart-mem-${this.agentObj.id}`"></div>
        <div class="col-3 chart" :id="`chart-net-${this.agentObj.id}`"></div>
        <div class="col-3 chart" :id="`chart-dsk-${this.agentObj.id}`"></div>
      </div>
    </div>
    <div class="card-footer d-flex flex-row flex-nowrap justify-content-between">
      <em>{{this.agentObj.externalIp || "Unknown IP"}}</em>
      <div>
        <!-- refresh agent -->
        <button type="button" class="btn btn-sm btn-info btn-refresh me-2">
          <i class="bi bi-arrow-clockwise"></i>
          Refresh
        </button>
        <!-- generate report -->
        <button type="button" class="btn btn-sm btn-success btn-generate">
          <i class="bi bi-clipboard-pulse"></i>
          Generate Report
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "AgentCard",
  props: {
    agent: Object,
    updateInterval: Number,
  },
  data() {
    return {
      agentObj: this.agent,
      intervalCallback: null,
    };
  },
  beforeCreate() {
    this.agentObj = this.agent;
  },
  mounted() {
    // update interval (in ms)
    const UPDATE_INTERVAL = this.updateInterval ?? 1000;
    // charts
    const CHART_CPU = echarts.init(document.getElementById(`chart-cpu-${this.id}`));
    const CHART_MEM = echarts.init(document.getElementById(`chart-mem-${this.id}`));
    const CHART_NET = echarts.init(document.getElementById(`chart-net-${this.id}`));
    const CHART_DSK = echarts.init(document.getElementById(`chart-dsk-${this.id}`));

    // register the charts
    CHART_CPU.setOption(generateProgressChart("CPU"));
    CHART_MEM.setOption(generateProgressChart("Memory"));
    CHART_NET.setOption(generateProgressChart("Network"));
    CHART_DSK.setOption(generateProgressChart("Disk"));

    /**
    this.intervalCallback = setInterval(async () => {
      let data = this.$apiCall("GET", `/api/getStatus/${this.agentID}`);
      // update the charts with data
      console.log(data);
    }, UPDATE_INTERVAL);
    */

    function generateProgressChart(title) {
      return {
        title: {
          text: title,
          left: "center",
          top: "center",
          textStyle: {
            fontSize: 16,
          },
        },
        series: [{
          type: "pie",
          radius: ["70%", "100%"],
          itemStyle: {
            borderRadius: 8,
          },
        }],
      };
    }
  }, 
  created() {
    window.addEventListener("resize", this.regenerateProgressCharts);
  },
  beforeMount() {
    this.id = this._uid;
  },
  mounted() {
    // update interval (in ms)
    const UPDATE_INTERVAL = this.updateInterval ?? 1000;
    // charts
    const CHART_CPU = echarts.init(document.getElementById(`chart-cpu-${this.id}`));
    const CHART_MEM = echarts.init(document.getElementById(`chart-mem-${this.id}`));
    const CHART_NET = echarts.init(document.getElementById(`chart-net-${this.id}`));
    const CHART_DSK = echarts.init(document.getElementById(`chart-dsk-${this.id}`));
    // register the charts
    CHART_CPU.setOption(this.generateProgressChart("CPU"));
    CHART_MEM.setOption(this.generateProgressChart("Memory"));
    CHART_NET.setOption(this.generateProgressChart("Network"));
    CHART_DSK.setOption(this.generateProgressChart("Disk"));

    /**
    this.intervalCallback = setInterval(async () => {
      let data = this.$apiCall("GET", `/api/getStatus/${this.agentID}`);
      // update the charts with data
      console.log(data);
    }, UPDATE_INTERVAL);
    */

    
  },
  beforeDestroy() {
    clearInterval(this.intervalCallback);
  }
}
</script>

<style>
.chart {
  height: 10vw;
}
.btn-delete, .btn-generate, .btn-refresh {
  width: max-content !important;
  max-width: 200px !important;
}
</style>