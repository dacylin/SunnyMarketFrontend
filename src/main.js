import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/main.css"; // 引入全域 main.css
import App from "./App.vue";
import router from "./router"; // 引入路由配置

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router); // 使用路由
app.mount("#app");


