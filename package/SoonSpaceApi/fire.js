
export default function (SDK) {
  return {
    /**
     * @name         sspa.createFire
     * @param        {object} option
     * @param        {Object} option.name 火苗生成坐标
     * @param        {Object} option.position 火苗生成坐标
     * @param        {Number} option.size     火苗的尺寸 | 默认200
     * @description  创建火苗
     */
    createFire(option) {

     return new Promise(resolve => {

      const { name, position, size } = option

      const { x, y, z } = position

      SDK.createFire(name, './images/fire.png', new THREE.Vector3(x, y, z), size || 200)

      resolve(name)

     })

    }
  }
}