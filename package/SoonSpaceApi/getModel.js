export default function (SDK) {
  return {
    /**
     * @name         sspa.getModelByUserDataProp
     * @param        {String}   key userData 属性 key
     * @param        {Any}      val userData 属性 val
     * @return       {Object}   匹配的模型对象
     * @description  获取模型通过 userData 属性
     */
    getModelByUserDataProp(key, val) {
      let res = null
      SDK.editor.scene.traverse(item => {
        if (item.userData[key] === val) {
          res = item
        } else if (item.type === 'Group') {
          item.traverse(item => {
            if (item.userData[key] === val) {
              res = item
            }
          })
        }
      })
      return res
    },

    /**
     * @name         sspa.getModelByProp
     * @param        {String}   key 模型的属性 key
     * @param        {Any}      val 模型的属性 val
     * @return       {Object}   匹配的模型对象
     * @description  获取模型通过属性
     */
    getModelByProp(key, val) {
      let res = []
      SDK.editor.scene.traverse(item => {
        if (item[key] === val) {
          res.push(item)
        }
      })
      return res
    },

    /**
     * @name         sspa.getModelByType
     * @param        {String}   type 模型的 type
     * @return       {Object}   匹配的模型对象
     * @description  获取模型通过 type
     */
    getModelByType: (type) => {
      return this.getModelByProp('type', type)
    },

    /**
     * @name         sspa.getModelByName
     * @param        {String}   type 模型的 name
     * @return       {Object}   匹配的模型对象
     * @description  获取模型通过 name
     */
    getModelByName(name) {
      return SDK.editor.scene.getObjectByName(name)
    }
  }
}