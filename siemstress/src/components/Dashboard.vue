<template>
  <div class="container p-3">
      <div class="row row-cols-1 row-cols-md-2 g-4">
        <!-- agent list (cards) -->
        <div v-for="agent of this.agents" v-bind:key="agent" class="col">
          {{ /* Agent also has an optional updateInterval (in ms) */ }}
          <Agent :agent="agent" v-on:openOptionsDialog="openOptionsDialog" />
        </div>

        <!-- add agent card -->
        <div class="col text-center align-middle " data-bs-toggle="modal" data-bs-target="#add-new-modal">
          <div class="container add-agent">
            <h3 class="display-3 text-muted pt-3"><i class="bi bi-plus-circle-dotted"></i></h3>
            <h6 class="display-6 pb-3 text">Add Agent</h6>
          </div>
        </div>

        <div class="col">
          <button type="button" data-bs-toggle="modal" data-bs-target="#options-modal" class="btn btn-sm btn-outline-secondary me-2">toggle options modal</button>
        </div>

      </div>


      <!-- options modal -->
      <div id="options-modal" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
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
              </div>
              <div class="row mt-2">
                <!-- kernel -->
                <div class="col-12">
                  <label class="form-label" for="options-modal-kernel-copy">Kernel:</label>
                  <textarea id="options-modal-kernel-copy" class="form-control" style="user-select: all;" readonly></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger">Delete Agent</button>
              <button type="button" class="btn btn-secondary" data-bs-dismissable="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <!-- add new modal -->
      <div id="add-new-modal" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add a New Host!</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <!-- hostname -->
                <h6>Run this command:</h6>
                <p class="lead">Simply run this command on your host, we do the hard work for you!</p>
                <hr style="width: 80%; margin-left: 10%;">
                <div class="container">
                  <pre id="add-new-command" style="background: #ccc;">
                    COMMAND HERE
                  </pre>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismissable="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Agent from "./dashboard/AgentCard";
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
      let hostnameTitle = document.getElementById("options-modal-hostname");
      let hostnameCopy = document.getElementById("options-modal-hostname-copy");
      let ipCopy = document.getElementById("options-modal-ip-copy");
      let osCopy = document.getElementById("options-modal-os-copy");
      let kernelCopy = document.getElementById("options-modal-kernel-copy");

      hostnameTitle.value = agent.hostname;
      hostnameCopy.value = agent.hostname;
      ipCopy.value = agent.externalIp;
      osCopy.value = agent.operatingSystem;
      kernelCopy.value = agent.kernel;

      let optionsModal = new this.bootstrap.Modal(document.getElementById("options-modal"));
    }
  }
}
</script>

<style scoped>
.add-agent {
  border: 8px dashed rgba(0,0,0,0.2);
  border-radius: 20px;
  background: rgba(0,0,0,0.02);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.add-agent:hover {
  background: rgba(0,0,0,0.04);
}
.add-agent .i, .add-agent .text {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 32px;
  color: rgba(0,0,0,0.2);
}
</style>
