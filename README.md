# vue-scroll-component
基于vue2.0的下拉刷新组件



### Installation

```javascript
yarn add vue-scroll-component
# or
npm install vue-scroll-component
```

***

### Usage

```vue
<template>
	<VueScroll>
    ···
  </VueScroll>
</template>

<script>
    import VueScroll from 'vue-scroll-component';
</script>

```

***

#### Props



###### loadingIcon : ``String`` 

加载中显示图标

> default ![](http://img.lanrentuku.com/img/allimg/1212/5-121204193R7.gif)

***



###### loadingText : ``String`` 

加载中显示的文字

> Default "正在刷新页面"

***



###### errorIcon : ``String`` 

刷新失败显示图标

> default <img src="https://s2.ax1x.com/2019/11/03/KXnHBV.png" style="zoom:10%;" />

***



###### errorText : ``String`` 

请求错误显示文字

> default "刷新失败"

***

###### 

###### successIcon : ``String`` 

刷新成功显示图标

> default <img src="https://s2.ax1x.com/2019/11/03/KXn7n0.png" style="zoom:10%;" />

***

###### successText : ``String`` 

刷新成功显示文字

> default "刷新成功"

***

###### 

###### callback : ``Object`` 

加载回调 ，接受四个函数:

 ``startCallback`` : 开始下拉回调

``endCallback`` : 下拉刷新后回调

``cancalLoadingCallback`` :取消下拉刷新回调

``isLoadingCallback`` :正在刷新回调

```vue
<template>
  <VueScroll :callback='callback'>
      ···
  </VueScroll>
</template>
<script>
import VueScroll from './VueScroll'
export default {
    components:{
        VueScroll
    },
    data(){
        return {
            callback:{
                startCallback(){
                    console.log('start')
                },
                isLoadingCallback(){
                    console.log('isLoading')
                },
                endCallback(){
                    console.log('end')
                },
                cancalLoadingCallback(){
                    console.log('cancalLoading')
                }
            }
        }
    }
</script>
```



***

###### reload : ``Boolean``

是否使用 ``window.reload`` 如果为true ``postUrl`` 将失效，并使用``window.reload`` 刷新页面

***

###### postUrl : ``String`` 

下拉刷新时拉取的接口地址

使用组件内获取数据刷新使用的是 ``fetch`` 请求方法为 ``get`` ，请求结果``response`` 需要添加一个自定义事件 ``getFetchRes`` 来获取

***

###### delayNum : ``Number`` 

刷新延迟加载动画，防止刷新一闪而过

***

