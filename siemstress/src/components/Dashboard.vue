<template>
  <div class="container p-3">
      <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col">
          <Agent id="1" />
        </div>
        <div class="col">
          <Agent id="2" />
        </div>
        <div class="col">
          <Agent id="3" />
        </div>
        <div class="col">
          <Agent id="4" />
        </div>
        <div class="col text-center align-middle">
          <h3 class="display-3"><i class="bi bi-plus-circle-dotted"></i></h3>
          <h6 class="display-6">Add Agent</h6>
        </div>
      </div>
  </div>
</template>

<script>
import Agent from "./dashboard/Agent";
export default {
  name: "Dashboard",
  components: {
    Agent
  }
}
</script>

<style scoped>

</style>
