import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from '@/router/router'
import { createPinia } from 'pinia'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus).use(router).use(createPinia()).mount('#app')
app.directive('focus', {
  mounted(el, binding) {
    el.onmousedown = ev => {
      console.log(binding.value.color)

      console.log(ev)
      // 鼠标按下的位置
      const mouseXStart = ev.clientX
      const mouseYStart = ev.clientY
      console.log('按下开始', mouseXStart, mouseYStart)
      // 当前滑块位置
      const rectLeft = el.offsetLeft
      const rectTop = el.offsetTop
      document.onmousemove = e => {
        // 鼠标移动的位置
        const mouseXEnd = e.clientX
        const mouseYEnd = e.clientY
        const moveX = mouseXEnd - mouseXStart + rectLeft
        const moveY = mouseYEnd - mouseYStart + rectTop
        console.log(rectLeft, rectTop)
        el.style['top'] = moveY + 'px'
        el.style['left'] = moveX + 'px'
      }
      document.onmouseup = () => {
        console.log('鼠标抬起')
        // 取消事件
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})
