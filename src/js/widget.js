/**
 * Created by zhang on 6/2/2017.
 */

define(["jquery"],function ($) {
    function Widget() {
        this.handlers = {};
        this.boundingBox = null;
    }
    
    Widget.prototype = {
        on:function (type,handler) {
            if(typeof this.handlers[type] == "undefined"){
                console.log(type);
                this.handlers[type] = [];
            }//如果在字典中响应类型没有事件存储 就创建一个数组以便村粗
        
            this.handlers[type].push(handler);
            return this;
        },
        fire:function (type,data) {
            //检测相应类型数组是否存在 存在则全部吐出来执行
            //如果传进来了输入就放入参数之中调用
            if(this.handlers[type] instanceof Array){
                console.log("fire");
                var handlers = this.handlers[type];
                for(var i=0,len=handlers.length; i<len; i++){
                    handlers[i](data);
                }
            }
        },
        renderUI:function () {
        
        },
        bingUI:function () {
        
        },
        syncUI:function () {
        
        },
        render:function (container) {
            this.renderUI();
            this.handlers = {};
            this.bindUI();
            this.syncUI();
            $(container || document.body).append(this.boundingBox);
        },
        destructor:function () {
        
        },
        destory:function () {
            this.destructor();
            this.boundingBox.off();
            this.boundingBox.remove();
        }
    }
    
    return {
        widget:Widget
    }
})

//抽象类 存放一些共享的方法。
//能否直接返回一个对象从而达到更好的公用呢 应该不行 因为实际上他们的自定义事件需要被存在不同的容器之中
//并且同一时间只有一个提示框存在 不会有内存过多的问题
/**
 * Created by zhang on 6/2/2017.
 */

