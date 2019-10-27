export default function (SDK) {
  return {
    /**
     * @name         sspa.loadGML
     * @param        {object} option
     * @param        {string} option.url GML 文件路径
     * @param        {string} option.id  GML 文件路径
     * @return       {Promise}           返回一个 Promise 实例
     * @description  加载GML
     */
    loadGML(option) {

      return new Promise(resolve => {

        const { id, url, pid } = option

        const randomId = Math.random().toString()

        SDK.importGML({
          topologyID: id || randomId,
          fileUrl: url,
          parentID: pid,
          visible: true,
          offsetElevation: 0,
          onLoad: uuid => {
            resolve({ uuid, id: id || randomId })
          }
        })

      })

    },

    /**
     * @name         sspa.setGMLColor
     * @param        {object} option
     * @param        {string|Number} option.color 颜色
     * @param        {Number} option.opacity      透明度
     * @description  设置GML颜色
     */
    setGMLColor(option) {
      const { color, opacity } = option
      SDK.setTopologyColor({
        type: 2,
        color,
        opacity
      })
    },

    /**
     * @name         sspa.findPathByPositions
     * @param        {object} option
     * @param        {string} option.gmlId         gml id
     * @param        {Object} option.startPosition 开始坐标 
     * @param        {Object} option.endPosition   结束坐标 
     * @return       {String} 返回 findPath uuid
     * @description  查找路径通过坐标
     */
    findPathByPositions(option) {
      const { gmlId, startPosition, endPosition } = option
      const uuid = SDK.findShortestPathByPosition({
        topologyID: gmlId,
        positions: [
          {
            position: startPosition,
            longname: "1628548620",
            floorId: "3"
          },
          {
            position: endPosition,
            longname: "1628548620",
            floorId: "3"
          }
        ],
        restrict: null
      })
      return uuid
    }
  }
}