import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./assets/styles/scrollbar.css";
import "./assets/styles/global.css";
import "./assets/styles/userView.css";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import axios from 'axios';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';


const app = createApp(App)
app.config.globalProperties.$axios=axios;
app.use(router)
app.mount('#app')
app.use(ElementPlus)
app.use(ArcoVue)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(Antd)