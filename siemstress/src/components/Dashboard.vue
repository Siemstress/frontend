<template>
  <div class="container p-3">
      <div class="row">
        <AgentCard class="col" />
        <AgentCard class="col" />
      </div>
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
