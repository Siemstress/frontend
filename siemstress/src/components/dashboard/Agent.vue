<template>
  <div class="card" :data-agent-id="agent.id">
    <div class="card-header">
      <div class="row">
        <div class="col-8 text-start">
          {{this.agentObj.hostname ?? "Unknown Hostname"}}
          <small class="text-muted">&nbsp;- {{this.agentObj.os ?? "Unknown OS"}} ({{this.agentObj.kernel ?? "Unknown Kernel"}})</small>
        </div>
        <div class="col-4 text-end"><em>{{this.agentObj.externalIp ?? "Unknown IP"}}</em>&nbsp;<i class="bi bi-gear-fill"></i></div>
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
    <div class="card-footer">
      <div class="d-flex flex-row flex-nowrap justify-content-end">
        <!-- ping button -->
        <button type="button" class="btn btn-sm btn-outline-primary btn-ping me-2">Ping</button>
        <!-- report dropdown/input -->
        <div class="input-group w-auto">
          <select name="report-select" class="form-select form-select-sm">
            <option value=0 disabled selected>Choose a report...</option>
            <option value="report_id">report name</option>
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