<template>
  <div class="card" :data-agent-id="`${id}`">
    <div class="card-header">
      <div class="row">
        <div class="col text-start">${hostname} <small class="text-muted">- ${os} (${os_version})</small></div>
        <div class="col text-end"><i class="bi bi-gear-fill"></i></div>
      </div>
    </div>
    <div class="card-body">
      <!-- progress charts -->
      <div class="row">
        <div class="col-3 chart" :id="`chart-cpu-${id}`"></div>
        <div class="col-3 chart" :id="`chart-mem-${id}`"></div>
        <div class="col-3 chart" :id="`chart-net-${id}`"></div>
        <div class="col-3 chart" :id="`chart-dsk-${id}`"></div>
      </div>
    </div>
    <div class="card-footer">
      <div class="d-flex flex-row flex-nowrap justify-content-end">
        <!-- ping button -->
        <button type="button" class="btn btn-sm btn-outline-primary btn-ping me-2">Ping</button>
        <!-- report dropdown/input -->
        <div class="input-group w-auto">
          <select name="report-select" class="form-select form-select-sm">
            <option value=0 disabled selected>Choose a report...</option>
            <option value="report_id">{{REPORT_NAME}}</option>
          </select>
          <button type="button" class="btn btn-sm btn-success btn-generate">Generate Report</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "AgentCard",
  props: {
    agentID: Number,
    updateInterval: Number,
  },
  data() {
    return {
      id: null,
      intervalCallback: null
    };
  },
  methods:{
    regenerateProgressCharts(){
      this.generateProgressChart("CPU");
      this.generateProgressChart("Memory");
      this.generateProgressChart("Network")
      this.generateProgressChart("Disk");
    },
    generateProgressChart(title) {
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
.btn-ping, .btn-generate, .form-select {
  width: max-content !important;
  max-width: 200px !important;
}
</style>