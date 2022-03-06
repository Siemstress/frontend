<template>
  <div >
    <div >
      <vue-html2pdf
      
          :show-layout="false"
          :float-layout="true"
          :enable-download="false"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          filename="hee hee"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="portrait"
          pdf-content-width="800px"

          @progress="onProgress($event)"
          @hasStartedGeneration="hasStartedGeneration()"
          @hasGenerated="hasGenerated($event)"
          ref="html2Pdf"
      >
        <section slot="pdf-content" style='background-color: #b4f4f0;'>
          <center>
            <img src="../../assets/siemstressReport.png" alt="SIEMStress Report Logo" style = "width: 50%; height: 50%; margin-top: 25%">
            <h2>Requested By: {{fullName}}</h2>
            <h2>{{date}}</h2>
            <h2>{{reportType}}</h2>
            <div class="html2pdf__page-break"></div>
          </center>
        </section>
        <section slot="pdf-content">
          <center>
            <table id = 'report' style = "width: 75%">
              <caption>Report</caption>
              <tr>
                <td style = "width: 50%">Datetime Requested</td>
                <td>{{this.datetime}}</td>
              </tr>
              <tr>
                <td style = "width: 50%">SIEMStress Server (hostname)</td>
                <td>{{this._props.metadata}}</td>
              </tr>
            </table>
            <table id = 'reportPersonnel' style = "width: 75%">
              <caption>Report Personnel</caption>
              <tr>
                <td style = "width: 50%">Username</td>
                <td>{{this.username}}</td>
              </tr>
              <tr>
                <td style = "width: 50%">Full Name</td>
                <td>{{this.fullName}}</td>
              </tr>
              <tr>
                <td style = "width: 50%">Job Title</td>
                <td>{{this.jobTitle}}</td>
              </tr>
            </table>
            <table id = 'agentMetadata' style = "width: 75%">
              <caption>Agent Metadata</caption>
              <tr>
                <td style = "width: 50%">hostname</td>
                <td>{{this.hostname}}</td>
              </tr>
              <tr>
                <td style = "width: 50%">External IP</td>
                <td>{{this.externalIP}}</td>
              </tr>
              <tr>
                <td style = "width: 50%">Operating System</td>
                <td>{{this.OS}}</td>
              </tr>
              <tr>
                <td style = "width: 50%">Kernel</td>
                <td>{{this.kernel}}</td>
              </tr>
              <tr>
                <td style = "width: 50%">Agent Status</td>
                <td>{{this.agentStatus}}</td>
              </tr>
              <tr>
                <td style = "width: 50%">Agent Added</td>
                <td>{{this.agentAdded}}</td>
              </tr>
              <tr>
                <td style = "width: 50%">Agent Registered</td>
                <td>{{this.agentRegistered}}</td>
              </tr>
              <tr>
                <td style = "width: 50%">Agent Last Updated</td>
                <td>{{this.agentLastUpdated}}</td>
              </tr>
            </table>
            <table id = 'machineStatisticsatTimeOfReport' style = "width: 75%">
              <caption>Machine Statistics at Time of Report</caption>
              <tr>
                <td style = "width: 50%">CPU Usage</td>
                <td>{{this.cpu}}</td>
              </tr>
              <tr>
                <td style = "width: 50%">Memory Usage</td>
                <td>{{this.memory}}</td>
              </tr>
              <tr>
                <td style = "width: 50%">Network In</td>
                <td>{{this.netIn}}</td>
              </tr>
              <tr>
                <td style = "width: 50%">Network Out</td>
                <td>{{this.netOut}}</td>
              </tr>
              <tr>
                <td style = "width: 50%">Root File System Disk Usage</td>
                <td>{{this.disk}}</td>
              </tr>
            </table>
            <div class="html2pdf__page-break"></div>
          </center>
        </section>
        <section slot="pdf-content">
          <center>
            <h2 style = "margin-top: 15%">Incident Heatmap</h2>
            <Worldmap :rawData = this._props.incidentData></Worldmap>
            <h3>This world map is a heatmap representative of the incidents from each country</h3>
            <div class="html2pdf__page-break"></div>
          </center>
        </section>
        <section slot="pdf-content">
          <center>
            <h2 style = "margin-top: 15%">Top Countries By Incident Count</h2>
            <table id = 'countryByIncident' style = "width: 75%">
              <tr>
                <th>
                  Country
                </th>
                <th>
                  # Of Incidents
                </th>
                <th>
                  % Of All Incidents
                </th>
              </tr>
            </table>
          </center>
        </section>
      </vue-html2pdf>
    </div>
  </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf';
import Worldmap from "./WorldMap";

export default {
  name: "Html2PDFDemo",
  props: ['incidentData', 'agentID'],
  data() {
    return { 
      date: (new Date(Date.now())).toLocaleDateString(),
      datetime: (new Date(Date.now())).toLocaleString(),
      reportType: "SSH Incident Report",
      username: "",
      fullName: "",
      jobTitle: "",
      hostname: "",
      externalIP: "",
      OS: "",
      kernel: "",
      agentStatus: "", 
      agentAdded: "",
      agentRegistered: "",
      agentLastUpdated: "",
      cpu: "",
      disk: "",
      memory: "",
      netIn: "",
      netOut: ""

    }
  },
  components: {
    Worldmap,
    VueHtml2pdf
  },
  methods: {
    generateReport() {
      setTimeout(() => {
        this.$refs.html2Pdf.generatePdf();
      }, 1000);
    },
    onProgress() {

    },
    hasStartedGeneration() {

    },
    hasGenerated() {

    },



    populateIncidentTable(){
      this._props.incidentData.sort((a, b) => (a.incidentCount < b.incidentCount) ? 1 : -1)
      let incidentData = this._props.incidentData;
      let metric = this.incidentData.length > 10 ? 10 : this.incidentData.length
      let tableref = document.getElementById('countryByIncident')
      let numIncidences = 0;
      for(let i = 0; i < incidentData.length; i++){
        numIncidences += incidentData[i].incidentCount
      }
      for(let i = 0; i < metric; i++){
        let currentEntry = incidentData[i]
        let newRow = tableref.insertRow();
        if(i % 2 == 0){
          newRow.style.backgroundColor = '#dddddd'
        }
        let newCell = newRow.insertCell();
        newCell.appendChild(document.createTextNode(currentEntry.code))
        newCell = newRow.insertCell();
        newCell.appendChild(document.createTextNode(currentEntry.incidentCount))
        newCell = newRow.insertCell();
        newCell.appendChild(document.createTextNode((100 * (currentEntry.incidentCount / numIncidences)).toFixed(2)))
      } 
    }
  },
  async beforeCreate(){
    this.userInfo = await this.$apiCall('GET', '/api/whoami');
    this.fullName = this.userInfo.user.fullName
    this.username = this.userInfo.user.username
    this.jobTitle = this.userInfo.user.jobTitle
    this.user = await this.$apiCall('GET', '/api/getAgent/' + this._props.agentID);
    this.agent = this.user.agent
    this.hostname = this.agent.hostname
    this.externalIP = this.agent.externalIp
    this.OS = this.agent.operatingSystem
    this.kernel = this.agent.kernel
    this.agentStatus = this.agent.agentStatus
    this.agentAdded = this.agent.dateAdded
    this.agentRegistered =  this.agent.lastRegistered
    this.lastStatus = this.user.lastStatus
    this.agentLastUpdated = this.lastStatus.lastUpdated
    this.cpu = this.lastStatus.cpu
    this.disk = this.lastStatus.disk
    this.memory = this.lastStatus.memory
    this.netIn = this.lastStatus.netIn
    this.netOut = this.lastStatus.netOut
  },

  mounted() {
    this.generateReport();
    this.populateIncidentTable();
  }
}
</script>

<style scoped>
.title-font{
  font-size: 50px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
caption{
  margin-top: 3%;
  margin-bottom: 1%;
  text-align: left;
  font-weight: bold;
  text-decoration: underline;
  margin-left: 5px;
}
td, th {
  border: 1px solid #dddddd;
  text-align: left;
  font-weight: 600;
  font-family: 'Courier New', Courier, monospace;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
