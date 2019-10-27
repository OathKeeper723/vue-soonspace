import Vue from 'vue'
import eventEnum from './eventEnum'

/**
 * @name        vse
 * @description SoonSpace 事件管理器，全名 vueSoonSpaceEvent
 * @author      xuek
 * @lastUpdate  2019.08.15
 */
class Vse extends Vue {
  constructor (eventEnum, props) {
    super(props)

    this.eventEnum = eventEnum

    this.init()
  }

  init () {
    this.bindTriggerEvent()
  }

  // 绑定可触发事件
  bindTriggerEvent () {
    for (let i in this.eventEnum) {
      this[this.eventEnum[i]] = () => {
        return new Promise(resolve => {
          this.$on(this.eventEnum[i], v => {
            resolve(v)
          })
        })
      }
    }
  }

  // 移除可触发事件
  removeTriggerEvent () {
    for (let i in this.eventEnum) {
      delete this[this.eventEnum[i]]
      this.$off(this.eventEnum[i])
    }
  }

  destroy () {
    this.removeTriggerEvent()
  }
}

// eslint-disable-next-line new-cap
export default new Vse(eventEnum)
