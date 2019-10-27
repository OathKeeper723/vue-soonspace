export default function (SDK) {
  return {
    /**
     * @name         sspa.drawRing
     * @param        {Object} option 
     * @param        {Object} option.center    圆环中心点
     * @param        {Number} option.inRadius  圆环内半径
     * @param        {Number} option.outRadius 圆环外半径
     * @param        {String} option.color     圆环颜色
     * @description  绘制圆环
     */
    drawRing(option) {

      const { center, inRadius, outRadius, color } = option

      // group
      const group = new THREE.Object3D()

      group.position.set(center.x, center.y, center.z)

      // plane
      var plane = SDK.drawTorusPlane({
        center: { x: 0, y: 0, z: 0 },
        radius: inRadius,
        torusWidth: outRadius,
        planeSize: (inRadius + outRadius) * 2,
        color,
        opacity: 0.8
      })

      group.add(plane)

      SDK.editor.scene.add(group)

    },

    /**
     * @name         sspa.drawLightShield
     * @param        {Object} option 
     * @param        {Object} option.center 光罩中心点
     * @param        {Number} option.radius 光罩半径
     * @param        {String} option.color  光罩颜色
     * @description  绘制光罩
     */
    drawLightShield(option) {

      const { center, radius, color } = option

      // group
      const group = new THREE.Object3D()

      group.position.set(center.x, center.y, center.z)

      // geometry
      const geometry = new THREE.IcosahedronBufferGeometry(radius, 4)

      // color
      const ringColor = new THREE.Color().set(color)

      // material
      const material = new THREE.MeshBasicMaterial({ color: ringColor })

      material.wireframe = true

      material.wireframeLinewidth = 10

      // sphere
      const sphere = new THREE.Mesh(geometry, material)

      sphere.position.set(0, 0, 0)

      SDK.editor.scene.add(sphere)

      group.add(sphere)

      SDK.editor.scene.add(group)

    }
  }
}