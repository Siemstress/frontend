import Vue from 'vue'
import App from "./App";
import Dashboard from "./components/Dashboard";
import Html2PDFDemo from "./components/Html2PDFDemo";
import WorldMap from "./components/WorldMap";
import TestDummy from "./components/TestDummy"
import Html2PDFDemo from "./components/reports/Html2PDFDemo";
import WorldMap from "./components/reports/WorldMap";

const host = "http://siem.kip"
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0NjUyOTU4Mn0.-j8mCRrYTXA7Cq5ulM6n4a55gVmuuqTNNmU6w2pBDZ8"

const routes = {
    '/': App,
    '/dashboard': Dashboard,
    '/demo': Html2PDFDemo,
    '/worldmap': WorldMap,
    '/testDummy': TestDummy
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
