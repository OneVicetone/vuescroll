# vuescroll
基于vue2.0的下拉刷新组件

#### 组件参数

###### loadingIcon : ``String`` 

加载中显示图标



###### loadingText : ``String`` 

加载中显示的文字



###### callback : ``Object`` 

加载回调 ，接受四个函数:

 ``startCallback`` : 开始下拉回调

``endCallback`` : 下拉刷新后回调

``cancalLoadingCallback`` :取消下拉刷新回调

``isLoadingCallback`` :正在刷新回调



###### reload : ``Boolean``

是否使用 ``window.reload`` 如果为true ``postUrl`` 将失效，并使用``window.reload`` 刷新页面



###### postUrl : ``String`` 

下拉刷新时拉取的接口地址

使用组件内获取数据刷新使用的是 ``fetch`` 请求方法为 ``get`` ，请求结果``response`` 需要添加一个自定义事件 ``getFetchRes`` 来获取



###### delayNum : ``Number`` 

刷新延迟加载动画，防止刷新一闪而过



