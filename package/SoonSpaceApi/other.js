import { typeOf } from '../../assets/js/utils'

export default function (SDK) {
  return {
    // 模型跟随鼠标移动
    followMouse(model) {
      return SDK.CommandMoveReal(SDK, model)
    },

    // 创建 3DPOI
    createPOI3D(param) {
      return SDK.createPOI3D(param)
    },

    // 创建 3DPOI
    removePOI3D(uuid) {
      return SDK.removePOI3D(uuid)
    },

    // 获取主场景模型
    getMainSceneModel() {
      return SDK.editor.scene.getObjectByName('Main Model Scene')
    },

    // 获取模型通过type
    getModelsByType(type) {
      let res = []
      SDK.editor.scene.traverse(item => {
        if (item.type === type) res.push(item)
      })
      return res
    },

    // 获取模型通过name
    getModelsByName(name) {
      let res = []
      SDK.editor.scene.traverse(item => {
        if (item.name === name) res.push(item)
      })
      return res
    },

    // 获取模型通过id
    getModelsById(id) {
      SDK.editor.scene.traverse(item => {
        if (item.id === id) return item
      })
    },

    /**
     * @name         setModelMaterial
     * @param        {Object} model 操作模型
     * @param        {Object} option
     * @param        {String|Number} option.color 颜色
     * @param        {Number} option.opacity 透明度
     * @description  设置模型材质
     */
    setModelMaterial(model, option = {}) {
      return new Promise(resolve => {
        model.children.map(item => {
          // 判断是否为mesh
          if (item.isMesh) {
            // 复制旧材质
            let materialCopy = item.material.clone()

            // 如果 option 设置透明且透明度小于1
            if (!!option.opacity && option.opacity < 1.0) {
              // 打开材质的透明度属性
              option.transparent = true
            }
            if (item.name === '1') {
              // 修改材质
              materialCopy.setValues(option)
            }

            // 旧材质颜色保存
            item.userData.color = item.material.color

            // 修改后的材质赋值给模型
            item.material = materialCopy
          }
        })

        resolve(model)
      })
    },

    // 恢复模型材质
    restoreModelMaterial(model) {
      return new Promise(resolve => {
        model.children.map(item => {
          // 判断是否为mesh
          if (item.isMesh) {
            item.material.color = item.userData.color
          }
        })

        resolve(model)
      })
    },

    // 飞向模型
    flyToModel(model) {
      SDK.editor.camera.flyToModel(SDK, { object: model })
    },

    // 默认视角
    defaultViewPoint() {
      const boundBox = SDK.getSceneBoundingBox(true)

      SDK.setViewpoint(VIEWPOINT.RIGHTTOP, boundBox.min, boundBox.max, false)
    },

    // 设置视角
    setViewPoint(position, rotation) {
      // position
      if (typeOf(position) === 'array') {
        SDK.editor.camera.position.set(...position)
      } else if (typeOf(position) === 'object') {
        const { x, y, z } = position
        SDK.editor.camera.position.set(x, y, z)
      }
      // rotation
      if (typeOf(rotation) === 'array') {
        SDK.editor.camera.rotation.set(...rotation)
      } else if (typeOf(rotation) === 'object') {
        const { x, y, z } = rotation
        SDK.editor.camera.rotation.set(x, y, z)
      }
    },

    // 设置飞行视角
    setFlyViewPoint(position, rotation, callback) {
      if (typeOf(position) === 'array') {
        let arr = position
        position = {
          x: arr[0],
          y: arr[1],
          z: arr[2]
        }
      }
      if (typeOf(rotation) === 'array') {
        let arr = rotation
        rotation = {
          x: arr[0],
          y: arr[1],
          z: arr[2]
        }
      }
      SDK.editor.flyTargetViewport(position, rotation, callback)
    },

    // 第一人称
    firstPerson(option = { x: 0, y: 0, z: 0, w: 30 }) {
      return new Promise(resolve => {
        let pos = new THREE.Vector4(option.x, option.y, option.z, option.w)
        SDK.startFirstPersonCamera(pos)
        resolve(true)
      })
    },

    // 退出第一人称
    stopFirstPerson(cameraState) {
      SDK.stopFirstPersonCamera(true, cameraState)
    },

    // 自动巡检
    autoPatrol(positions, deviceList, deviceListCallBack) {
      // todo 自动巡检
      let temp = new THREE.Vector3(0, 0, 0)
      let cameraLinePos = []
      let pos = positions
      let currentStep = 0
      let inspecTimerId2
      let flyTimerId
      let currentCameraPos = new THREE.Vector3()

      // 两坐标点间进行插值
      function lerpPosition(pos1, pos2, seg, linePoints) {
        let temp = pos1.clone()
        linePoints.push(pos1)

        for (let i = 0; i < seg; ++i) {
          linePoints.push(temp.lerp(pos2, i / seg).clone())
          temp = pos1.clone()
        }
      }

      function inspectByDistance(centerVec3, library, radius) {
        let arealib = []

        for (let i = 0; i < library.length; ++i) {
          if (library[i].yzId) {
            if (library[i].position.distanceTo(centerVec3) < radius) {
              arealib.push(library[i])
            }
          }
        }
        return arealib
      }

      function flyToVec3(vec3) {
        SDK.editor.flyTargetViewport(
          { x: temp.x, y: temp.y, z: temp.z }, {},
          () => {
          }
        )
        // 根据路径改变相机的聚焦位置坐标

        let direction = vec3
          .clone()
          .multiply(new THREE.Vector3(2, 2, 2))
          .sub(temp)
        temp = vec3.clone()

        SDK.editor.camera.lookAt(direction)
      }

      function initInspect() {
        // 判断当前场景是否在室外
        let isOutDoor = SDK.editor.scene.children.length < 200

        let timerSpeed = null
        let segment = null
        if (isOutDoor) {
          // 室外巡检速度
          timerSpeed = 30
          segment = 400
        } else {
          // 室内巡检速度
          timerSpeed = 5
          segment = 400
        }

        for (let i = 0; i < pos.length - 1; ++i) {
          let start = pos[i]
          let end = pos[i + 1]

          if (Array.isArray(pos[i])) {
            start = new THREE.Vector3(...start)
            end = new THREE.Vector3(...end)
          }

          lerpPosition(start, end, segment, cameraLinePos)
        }

        flyTimerId = setInterval(function () {
          window.myTimer = flyTimerId
          let pos = cameraLinePos[currentStep++]

          if (currentStep >= cameraLinePos.length) {
            window.clearInterval(flyTimerId)
            window.clearInterval(inspecTimerId2)
          }

          flyToVec3(pos) // 相机飞向三维坐标位置
          currentCameraPos = pos
        }, timerSpeed)

        let arealibs = []
        let allibs = deviceList

        inspecTimerId2 = setInterval(() => {
          arealibs = inspectByDistance(currentCameraPos, allibs, 220)
          if (arealibs.length > 0) {
            deviceListCallBack(arealibs)
          }
        }, 1500)
      }
      initInspect()
    },

    // 停止自动巡检
    stopAutoInspect() {
      window.clearInterval(window.myTimer)
    },

    /**
     * @name         sspa.getRangeModels   
     * @param        {Object} position   查找基准点坐标
     * @param        {Object} distance   查找范围
     * @return       {Array}
     * @description  获取范围内模型
     */
    getRangeModels(position, distance) {

      let rangeModels = []

      SDK.editor.scene.children.map(item => {

        if (item.position.distanceTo(position) <= distance) {

          rangeModels.push(item)

        }

      })

      return rangeModels

    }
  }
}