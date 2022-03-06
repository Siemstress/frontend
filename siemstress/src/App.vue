<template>
  <div id="app">
    <WorldMap/>
    <Dashboard/>
  </div>
</template>

<script>
import WorldMap from './components/WorldMap.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "@popperjs/core"
import "echarts"
import Dashboard from "./components/Dashboard";
export default {
  name: 'App',
  components: {
    WorldMap,
    Dashboard
}
</script>
