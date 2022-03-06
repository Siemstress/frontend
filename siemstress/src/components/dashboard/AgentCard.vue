<template>
  <div class="card" :data-agent-id="agent.id">
    <div class="card-header">
      <div class="row">
        <div class="col-8 text-start">
          {{ this.agentObj.hostname || "Unknown Hostname" }}
          <small class="text-muted">&nbsp;- {{ this.agentObj.operatingSystem || "Unknown OS" }}</small>
        </div>
        <a class="col-4 text-end" v-on:click="openOptionsDialog"><i class="bi bi-gear-fill"></i></a>
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
      <em>{{ this.agentObj.externalIp || "Unknown IP" }}</em>
      <div>
        <!-- refresh agent -->
        <button type="button" class="btn btn-sm btn-info btn-refresh me-2">
          <i class="bi bi-arrow-clockwise"></i>
          Refresh
        </button>
        <!-- generate report -->
        <a target="_blank" :href="'http://siemstress.tech/report?id='+this.agentObj.id" type="button"
           class="btn btn-sm btn-success btn-generate">
          <i class="bi bi-clipboard-pulse"></i>
          Generate Report
        </a>
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
  async mounted() {
    // update interval (in ms)
    const UPDATE_INTERVAL = this.updateInterval ?? 1000;
    // charts
    const CHART_CPU = echarts.init(document.getElementById(`chart-cpu-${this.agentObj.id}`));
    const CHART_MEM = echarts.init(document.getElementById(`chart-mem-${this.agentObj.id}`));
    const CHART_NET = echarts.init(document.getElementById(`chart-net-${this.agentObj.id}`));
    const CHART_DSK = echarts.init(document.getElementById(`chart-dsk-${this.agentObj.id}`));

    this.intervalCallback = setInterval(async () => {
      let data = await this.$apiCall("GET", `/api/getAgent/${this.agentObj.id}`);

      // register the charts
      CHART_CPU.setOption(generateProgressChart("CPU", `${data.lastStatus.cpu}%`, [{
        value: data.lastStatus.cpu,
        itemStyle: {color: 'orange'}
      }, {value: 100 - data.lastStatus.cpu}]));
      CHART_MEM.setOption(generateProgressChart("Memory", `${data.lastStatus.memory}%`, [{
        value: data.lastStatus.memory,
        itemStyle: {color: 'green'}
      }, {value: 100 - data.lastStatus.memory}]));
      CHART_NET.setOption(generateProgressChart("Network", `↓${data.lastStatus.netIn} ↑${data.lastStatus.netOut}`, [{
        value: data.lastStatus.netIn,
        itemStyle: {color: 'purple'}
      }, {value: data.lastStatus.netOut, itemStyle: {color: 'blue'}}]));
      CHART_DSK.setOption(generateProgressChart("Disk", `${data.lastStatus.disk}%`, [{
        value: data.lastStatus.disk,
        itemStyle: {color: 'red'}
      }, {value: 100 - data.lastStatus.disk}]));

      console.log(data);
    }, 2000);


    function generateProgressChart(title, subtext, data) {
      return {
        title: {
          text: title,
          subtext: subtext,
          left: "center",
          top: "center",
          textStyle: {
            fontSize: 16,
          },
        },
        series: [{
          type: "pie",
          radius: ["70%", "100%"],
          label: {show: false},
          itemStyle: {
            borderRadius: 8,
          },
          data: data
        }],
      };
    }
  },
  created() {
    window.addEventListener("resize", this.regenerateProgressCharts);
  },
  beforeDestroy() {
    clearInterval(this.intervalCallback);
  },
  methods: {
    openOptionsDialog() {
      this.$emit('openDialogOptions', this.agentObj);
    }
  },
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
