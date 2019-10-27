/**
 * @name         typeOf 
 * @param        {any} val 任何一个需要判断类型的值
 * @return       {string} 类型值   
 * @description  typeof的扩展 
 */
export function typeOf(val) {
  return Object.prototype.toString.call(val).split("[object ")[1].split("]")[0].toLowerCase()
}

export default {
  typeOf
}