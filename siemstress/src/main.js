import Vue from 'vue'
import App from "./App";
import Dashboard from "./components/Dashboard";
import Html2PDFDemo from "./components/reports/Html2PDFDemo";
import WorldMap from "./components/reports/WorldMap";

const host = "http://localhost:3000"
let token = localStorage.getItem("token");

const routes = {
    '/': App,
    '/dashboard': Dashboard,
    '/demo': Html2PDFDemo,
    '/worldmap': WorldMap
}

Vue.config.productionTip = false
Vue.prototype.$apiCall = async function (method, path, body) {
    let isBody = !!body;
    let response = await fetch(host + path + "?token=" + token, {
        method: method,
        body: isBody ? JSON.stringify(body) : undefined,
    });
    if (response.status === 403) {
        console.log("403 403 403");
        return;
    }
    return JSON.parse(await response.text());
}

new Vue({
    render: h => h(routes[window.location.pathname] || Dashboard),
}).$mount('#app')
