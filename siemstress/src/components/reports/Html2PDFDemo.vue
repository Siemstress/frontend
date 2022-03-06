<template>
  <div>
    <div>
      <vue-html2pdf

          :show-layout="false"
          :float-layout="true"
          :enable-download="false"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          filename="IncidentReport"
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
            <img src="@/assets/siemstressReport.png" alt="SIEMStress Report Logo"
                 style="width: 250px; height: 250px; margin-top: 25%;">
            <h2>Requested By: {{ fullName }}</h2>
            <h2>{{ date }}</h2>
            <h2>{{ reportType }}</h2>
          </center>
          <div class="html2pdf__page-break"></div>
        </section>

        <section slot="pdf-content">
          <center>
            <br/>
            <table id='report' style="width: 75%">
              <caption>Report</caption>
              <tr>
                <td style="width: 50%">Datetime Requested</td>
                <td>{{ this.datetime }}</td>
              </tr>
              <tr>
                <td style="width: 50%">SIEMStress Server (hostname)</td>
                <td>siemstress.tech</td>
              </tr>
            </table>
            <table id='reportPersonnel' style="width: 75%">
              <caption>Report Personnel</caption>
              <tr>
                <td style="width: 50%">Username</td>
                <td>{{ this.username }}</td>
              </tr>
              <tr>
                <td style="width: 50%">Full Name</td>
                <td>{{ this.fullName }}</td>
              </tr>
              <tr>
                <td style="width: 50%">Job Title</td>
                <td>{{ this.jobTitle }}</td>
              </tr>
            </table>
            <table id='agentMetadata' style="width: 75%">
              <caption>Agent Metadata</caption>
              <tr>
                <td style="width: 50%">hostname</td>
                <td>{{ this.hostname }}</td>
              </tr>
              <tr>
                <td style="width: 50%">External IP</td>
                <td>{{ this.externalIP }}</td>
              </tr>
              <tr>
                <td style="width: 50%">Operating System</td>
                <td>{{ this.OS }}</td>
              </tr>
              <tr>
                <td style="width: 50%">Kernel</td>
                <td>{{ this.kernel }}</td>
              </tr>
              <tr>
                <td style="width: 50%">Agent Status</td>
                <td>{{ this.agentStatus }}</td>
              </tr>
              <tr>
                <td style="width: 50%">Agent Added</td>
                <td>{{ this.agentAdded }}</td>
              </tr>
              <tr>
                <td style="width: 50%">Agent Registered</td>
                <td>{{ this.agentRegistered }}</td>
              </tr>
              <tr>
                <td style="width: 50%">Agent Last Updated</td>
                <td>{{ this.agentLastUpdated }}</td>
              </tr>
            </table>
            <table id='machineStatisticsatTimeOfReport' style="width: 75%">
              <caption>Machine Statistics at Time of Report</caption>
              <tr>
                <td style="width: 50%">CPU Usage</td>
                <td>{{ this.cpu }}</td>
              </tr>
              <tr>
                <td style="width: 50%">Memory Usage</td>
                <td>{{ this.memory }}</td>
              </tr>
              <tr>
                <td style="width: 50%">Network In</td>
                <td>{{ this.netIn }}</td>
              </tr>
              <tr>
                <td style="width: 50%">Network Out</td>
                <td>{{ this.netOut }}</td>
              </tr>
              <tr>
                <td style="width: 50%">Root File System Disk Usage</td>
                <td>{{ this.disk }}</td>
              </tr>
            </table>
            <div class="html2pdf__page-break"></div>
          </center>
        </section>
        <section slot="pdf-content">
          <center>
            <h2 style="margin-top: 15%">Attempt Country Heatmap</h2>


            <Worldmap :raw-data="this.mapData"/>


            <h4>This world map is a heatmap representative of the number of attempts from each country</h4>
            <div class="html2pdf__page-break"></div>
          </center>
        </section>
        <section slot="pdf-content">
          <center>
            <h2 style="margin-top: 15%">Top Countries By Attempt Count</h2>
            <table id='countryByIncident' style="width: 75%">
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
          <div class="html2pdf__page-break"></div>
        </section>
        <section slot="pdf-content">
          <center>
            <div style="width: 400px; height: 400px; margin-top: 40px;" :id="`users-chart`"></div>

            <h2 style="margin-top: 15%">Top Attempted Users By Attempt Count</h2>
            <table id='usersTable' style="width: 75%">
              <tr>
                <th>
                  username
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
import * as echarts from "echarts";

export default {
  name: "Html2PDFDemo",
  props: ['incidentData', 'agentID'],
  data() {
    return {
      date: (new Date(Date.now())).toLocaleDateString(),
      datetime: (new Date(Date.now())).toLocaleString(),
      reportType: "SSH Login Attempts Report",
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
      netOut: "",
      mapData: []
    }
  },
  components: {
    Worldmap,
    VueHtml2pdf
  },
  methods: {
    async generateReport() {
      let data = await this.$apiCall('POST', `/api/executeAction/${this.agentID}/ssh`);
      console.log(data);
      this.populateIncidentTable(data);


      let usersChart = echarts.init(document.getElementById(`users-chart`));

      let options = this.generateProgressChart("Users");
      let chartData = [];
      Object.keys(data.users).map(userName => {
        let count = data.users[userName];
        chartData.push({value: count, name: userName});
      });

      options.series[0].data = chartData;
      options.series[0].label = {show: true}
      options.series[0].labelLine = {show: true};
      usersChart.setOption({
        title: {
          text: 'Users',
          left: "center",
          top: "center",
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['50%', '70%'],
            data: chartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });

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

    generateProgressChart(title) {
      return {
        title: {
          text: title,
        },
        series: [{
          type: "pie",
          radius: ["70%", "100%"],
          itemStyle: {
            borderRadius: 8,
          },
        }],
      };
    },
    populateIncidentTable(incidentData) {
      console.log("incidentData", incidentData);

      let countries = [];
      for (let countryName of Object.keys(incidentData.countries)) {
        countries.push({code: countryName, count: incidentData.countries[countryName]});
      }
      countries.sort((a, b) => (a.count < b.count) ? 1 : -1);
      let tableRef = document.getElementById('countryByIncident')

      for (let i = 0; i < countries.length; i++) {
        let currentCountry = countries[i];
        let newRow = tableRef.insertRow();
        if (i % 2 === 0) {
          newRow.style.backgroundColor = '#dddddd'
        }

        let newCell = newRow.insertCell();
        newCell.appendChild(document.createTextNode(currentCountry.code))
        newCell = newRow.insertCell();
        newCell.appendChild(document.createTextNode(currentCountry.count))
        newCell = newRow.insertCell();
        newCell.appendChild(document.createTextNode((100 * (currentCountry.count / incidentData.totalRequests)).toFixed(2)))

        this.mapData.push({code: currentCountry.code, incidentCount: currentCountry.count});
      }

      let users = [];
      for (let userName of Object.keys(incidentData.users)) {
        users.push({username: userName, count: incidentData.users[userName]});
      }
      countries.sort((a, b) => (a.count < b.count) ? 1 : -1);
      let usersTableRef = document.getElementById('usersTable');

      for (let i = 0; i < users.length; i++) {
        let currentUser = users[i];
        let newRow = usersTableRef.insertRow();
        if (i % 2 === 0) {
          newRow.style.backgroundColor = '#dddddd'
        }

        let newCell = newRow.insertCell();
        newCell.appendChild(document.createTextNode(currentUser.username))
        newCell = newRow.insertCell();
        newCell.appendChild(document.createTextNode(currentUser.count))
        newCell = newRow.insertCell();
        newCell.appendChild(document.createTextNode((100 * (currentUser.count / incidentData.totalRequests)).toFixed(2)))
      }
    }
  },
  async beforeCreate() {
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
    this.agentRegistered = this.agent.lastRegistered
    this.lastStatus = this.user.lastStatus
    this.agentLastUpdated = this.lastStatus.lastUpdated
    this.cpu = this.lastStatus.cpu
    this.disk = this.lastStatus.disk
    this.memory = this.lastStatus.memory
    this.netIn = this.lastStatus.netIn
    this.netOut = this.lastStatus.netOut
  }
  ,

  mounted() {
    this.generateReport();
  }
}
</script>

<style scoped>
.title-font {
  font-size: 50px;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

caption {
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: left;
  font-weight: bold;
  text-decoration: underline;
  margin-left: 5px;
  caption-side: top;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  font-weight: 600;
  font-family: 'Courier New', Courier, monospace;
  padding: 8px;
  font-size: 12px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
