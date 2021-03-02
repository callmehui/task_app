import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import {components, plugins }  from './lib/element-plus/plugin';

const app = createApp(App);

/** 挂载element-plus组件和插件到vue上 */
components.forEach(component => {
  app.component(component.name, component)
})
plugins.forEach(plugin => {
  app.use(plugin)
})

app
  .use(store)
  .use(router)
  .mount("#app");
