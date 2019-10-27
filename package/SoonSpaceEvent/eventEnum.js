/**
 * @name        vm.$sspe.$emit
 * @description SoonSpaceContainer 可触发事件
 * @author      xuek
 * @lastUpdate  2019.08.15
 */

export default {
  // 场景准备完成 return Boolean
  SCENEREADY: 'sceneReady',
  // 模型点击 return model
  MODELCLICK: 'modelClick',
  // 模型双击 return model
  MODELDBCLICK: 'modeldbClick',
  // 鼠标点击选择点 return param
  SELECTPOSITION: 'selectPosition',
  // 相机切换 return param
  CAMERACHANGED: 'cameraChanged'
}
