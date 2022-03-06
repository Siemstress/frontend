<template>
  <div class="container p-3">
      <div class="row row-cols-1 row-cols-md-2 g-4">
        <!-- agent list (cards) -->
        <div v-for="agent of this.agents" v-bind:key="agent" class="col">
          {{ /* Agent also has an optional updateInterval (in ms) */ }}
          <Agent :agent="agent" @open-options="openOptionsDialog" />
        </div>

        <!-- add agent card -->
        <div class="col text-center align-middle">
          <h3 class="display-3"><i class="bi bi-plus-circle-dotted"></i></h3>
          <h6 class="display-6">Add Agent</h6>
        </div>
      </div>

      <!-- options modal -->
      <div class="modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Agent Options for: <code id="options-modal-hostname"></code></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

            </div>
          </div>
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
  },
  data() {
    return {
      agents: null,
    };
  },
  async beforeCreate() {
    let api = await this.$apiCall("GET", `/api/getAgents/`);
    this.agents = api.agents;
  },
  methods: {
    // handle user clicking the settings button on an agent
    openOptionsDialog(agent) {

    }
  }
}
</script>

<style scoped>

</style>
