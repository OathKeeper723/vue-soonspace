import Vsa from './package/SoonSpaceApi'
import vsc from './package/SoonSpaceContainer'
import vse from './package/SoonSpaceEvent'
import vss from './package/SoonSpaceStore'

// 导入 soonspace SDK
function importSdk() {
  return new Promise((resolve, reject) => {
    const st = document.createElement('script')
    st.type = 'text/javascript'
    st.src = 'http://www.xwbuilders.com:9011/static/js/SoonSpace-min.js'
    st.charset = 'utf-8'
    st.onload = () => {
      // eslint-disable-next-line no-undef
      window.SoonSpace = new SoonSpace()
      setTimeout(() => {
        resolve(window.SoonSpace)
      }, 0)
    }
    st.onerror = () => {
      reject('SoonSpace SDK not find')
    }
    document.body.appendChild(st)
  })
}

// Vue.use 安装
function install(Vue) {
  Vue.component(vsc.name, vsc)
  Vue.prototype.$vse = vse
  Vue.prototype.$vss = vss
  importSdk()
    .then(res => {
      Vue.prototype.$vsa = new Vsa(res)
    })
    .catch(err => {
      console.error(err)
    })
}

export default install
