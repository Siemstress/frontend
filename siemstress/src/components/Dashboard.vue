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
      <div id="options-modal" class="modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Agent Options for: <code id="options-modal-hostname"></code></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <!-- hostname -->
                <div class="col-8 col-md-4">
                  <label class="form-label" for="options-modal-hostname-copy">Hostname:</label>
                  <input id="options-modal-hostname-copy" class="form-control" style="user-select: all;" readonly>
                </div>
                <!-- ip -->
                <div class="col-4 col-md-2">
                  <label class="form-label" for="options-modal-ip-copy">IP:</label>
                  <input id="options-modal-ip-copy" class="form-control" style="user-select: all;" readonly>
                </div>
                <!-- os -->
                <div class="col-12 col-md-6">
                  <label class="form-label" for="options-modal-os-copy">Operating System:</label>
                  <input id="options-modal-os-copy" class="form-control" style="user-select: all;" readonly>
                </div>
                <!-- kernel -->
                <div class="col-12">
                  <label class="form-label" for="options-modal-kernel-copy">Kernel:</label>
                  <textarea id="options-modal-kernel-copy" class="form-control" style="user-select: all;" readonly></textarea>
                </div>
              </div>
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
