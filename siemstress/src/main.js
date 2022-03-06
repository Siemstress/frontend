import Vue from 'vue'
import App from './App.vue'

const host = "http://localhost:3000"
let token = localStorage.getItem("token");

Vue.config.productionTip = false
Vue.prototype.$apiCall = async function (method, path, body) {
    let isBody = !!body;
    let response = await fetch(host + path + "?token="+token, {
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
    render: h => h(App),
}).$mount('#app')
