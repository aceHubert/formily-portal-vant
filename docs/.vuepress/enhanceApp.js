import pageComponents from '@internal/page-components'
import vant from 'vant'
export default ({ Vue }) => {
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
  Vue.use(vant)
}
