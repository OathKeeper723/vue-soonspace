export default function () {
  return {
    /**
     * @name         sspa.modelMove
     * @param        {object} model              被操作模型
     * @param        {object} option
     * @param        {String} option.axis        移动的轴向
     * @param        {Number} option.distance    移动距离
     * @param        {Boolean} option.transition 是否过渡
     * @param        {Number} option.speed       每单位内移动频率  **option.transition 为 false 时无效
     * @return       {Promise}                   返回一个 Promise 实例
     * @description  模型移动
     */
    modelMove(model, option) {

      return new Promise((resolve, reject) => {

        let { axis, distance, transition, speed } = option

        // transition = transition === undefined ? true : false

        let moved = 0

        let lastSpeed = 0

        let direction = null // 0: 正 1: 负

        if (distance > 0) {
          direction = 0
        } else if (distance < 0) {
          direction = 1
        } else {
          return reject('参数 distance 为 0')
        }

        if (transition) {

          switch (direction) {

            case 0:

              this.timer = setInterval(() => {

                if (moved >= distance) {

                  model.position[axis] += lastSpeed

                  clearInterval(this.timer)

                  resolve()

                } else {

                  model.position[axis] += speed

                  moved += speed

                  if (moved + speed >= distance) {

                    lastSpeed = distance - moved

                  }

                }

              }, 20);

              break

            case 1:
              this.timer = setInterval(() => {

                if (moved <= distance) {

                  model.position[axis] -= lastSpeed

                  clearInterval(this.timer)

                  resolve()

                } else {

                  model.position[axis] -= speed

                  moved -= speed

                  if (moved - speed <= distance) {

                    lastSpeed = moved - distance

                  }

                }

              }, 20);

              break

          }

        } else {

          switch (direction) {

            case 0:

              model.position[axis] += distance

              resolve()

              break

            case 1:

              model.position[axis] -= Math.abs(distance)

              resolve()

              break

          }

        }

      })

    }
  }
}