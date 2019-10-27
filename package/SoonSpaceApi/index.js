import getModel from './getModel'
import draw from './draw'
import fire from './fire'
import modelMove from './modelMove'
import gml from './gml'
import load from './load'
import other from './other'

const modules = [getModel, draw, fire, modelMove, gml, load, other]

export default class sspa {

  constructor(SDK) {
    this.SDK = SDK
    this.timer = null

    this.installModule(modules)
  }

  // 安装模块
  installModule(modules) {

    modules.map(itemModel => {

      const c = itemModel(this.SDK)

      for (let i in c) {

        if (this[i]) {

          console.error(`in sspa: ${i} method rename, Please check!`)

        }

        this[i] = c[i]

      }

    })

  }

}