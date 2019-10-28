# [vue-soonspace](https://github.com/xuekai-china/vue-soonspace)


## 一、页面与空间交互

#### 前言：

#### 	空间组件很消耗浏览器性能，所以在同页面内尽可能出现最少的空间组件

#### 	因此空间组件与常规页面组件如果交互就很重要



#### 思路：

> 在 Vue 框架里跨组件通信有多种实现方式
>
>  1.  [Vuex](https://vuex.vuejs.org/) 全局状态管理模式
>  2.  [Vue事件绑定](https://cn.vuejs.org/v2/api/#vm-on) => [Vue bus总线](https://www.cnblogs.com/fanlinqiang/p/7756566.html)
>  3.   [provide / inject](https://cn.vuejs.org/v2/api/#provide-inject) 强注入



不是任何项目都需要Vuex，且用状态去触发事件，是需要侦听状态的，也不太推荐。

此上第三点强注入只能注入到组件自身下直系子孙组件，所以不能满足。

因此，项目空间通信依旧借鉴 [SoonManager](http://www.xwbuilders.com:9011/) 的实现方式。

------

Vue事件线程只有三个步骤

1. 事件绑定 vm.$on

   ```javascript
   vm.$on('eventName'，params => {
     //  Do something
   })
   ```

2. 事件触发 vm.$emit

   ```javascript
   vm.$emit('eventName'，params)
   ```

3. 事件解绑 vm.$off

   ```javascript
   vm.$off('eventName')
   
   ```



在 vue-soonspace 内部也是借用 Vue事件线程 简单封装，使用时不需要关心 **触发**和 **解绑**，只关注 **事件绑定** 即可！



## 二、vue-soonspace 插件

> vs 全名 Vue-SoonSpace，使用缩写完全是为了方便开发者偷懒少打字。
>
> vs 插件由 三部分构成
>
> - vsc（SoonSpaceContainer）
> - vse（SoonSpaceEvent）
> - Vsa（SoonSpaceApi）
> - vss（SoonSpaceStore）



### 1. 安装

```shell
npm i vue-soonspace -S
```



### 2. 使用

```javascript
// main.js
import Vue from 'vue'
import vs from 'vue-soonspace'
import App from './App.vue'

Vue.use(vs)

new Vue({
  render: h => h(App),
}).$mount('#app')

```



### 3. 详解

#### 3.1 vsc

SoonSpaceContainer 即插件提供的空间组件

```vue
<soon-space-container/>
```

同时提供属性传值

```vue
<soon-space-container 
  :customClass="soon-space"       // 自定义类名
  :customStyle="{height: '100%'}" // 自定义样式
/>
```

#### 3.2 vse

SoonSpaceEvent 空间事件

> Tips：目前（2019-08-13）只有五个事件，包含 **一个生命周期事件**、**四个空间交互事件**

2. 空间可被触发事件绑定

   - [ ] 生命周期事件

   - initScene  =>   Promise        初始场景完成

    ```javascript
      this.$vse.initScene()
        .then(res => {
          //  Do something
        })
    ```
   
- [ ] 空间交互事件
  
   - model-click          模型点击
   
   - model-dbClick     模型双击
   
   - select-position     鼠标点击选择点
   
   - camera-changed  相机切换
   
     > 其实针对空间交互事件，在插件内部也提供了像 **组件生命周期** 一样的驼峰方法名、放回 [Promise](http://es6.ruanyifeng.com/#docs/promise) 对象，写法完全一致，但是由于事件的触发机制存在问题导致，目前无法愉快的使用。
   
    ```javascript
      this.$vse.$on('modelClick', res => {
      	//  Do something
      });

      this.$vse.$on('modeldbClick', res => {
      	//  Do something
      });

      this.$vse.$on('selectPosition', res => {
    	    // Do something
      });
    
      this.$vse.$on('cameraChanged', res => {
    	    // Do something
      });
     ```


#### 3.3 vsa

SoonSpaceApi 

> 待完善

#### 3.4 vss

SoonSpaceStore 空间内数据管理容器。

> 待完善