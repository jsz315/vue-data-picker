import Vue from 'vue'
import Router from 'vue-router'
import ViewCityPicker from '@/components/view-city-picker'
import PageTest from '@/components/page-test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/test'
    },
    {
      path: '/test',
      component: PageTest
    }
  ]
})
