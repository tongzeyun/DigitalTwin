/*
 * @Description: 
 * @Author: YiFan Zhang
 * @LastEditors: YiFan Zhang
 * @LastEditTime: 2025-09-23 09:03:37
 */
import { hasPermi } from 'gimp-tools'

import router from './router'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/index.scss';
import '@/assets/styles/common.scss';

import App from './App.vue'

createApp(App).use(router).use(ElementPlus).directive('hasPermi',hasPermi).mount('#app')
