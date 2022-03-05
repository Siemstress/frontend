<template>
  <div class="container row">
    <AgentCard class="col"/>
    <AgentCard class="col"/>
  </div>
</template>

<script>
import AgentCard from "./AgentCard";
export default {
  name: "Dashboard",
  components: {AgentCard}
}
</script>

<style scoped>

</style>
