/**
 * Created by zhang on 5/25/2017.
 */

//定义一个类 然后暴露他
define(["jquery","jqueryUi","widget"], function ($,$ui,widget) {
    function Wiw() {
        // this.conText = conText;
         var _this_ = this;
         //default config
         this.config = {
             "from":{
                 "height":300,
                 "width":500
             },
            "content":"please edit you text!",
             "title":"please edit you title",
             "handler":function () {
             
             },
             confirmBtn:'确定',
             cancelBtn:"取消",
             handlerconfirmBtn:null,
             handlercancelBtn:null,
             winType:"alert",
             alertBtnContent:"确定",
         //    prompt方法的需求属性
             promptBtn:"确定",
             isprmptInputPassWord:false,
             defauletValuePromptInput:"默认内容",
             maxlengthPromptInput:10,
             handlerPromptBtn:null
         };
         
         this.handlers = {
         
         }
         
         //alert(nCfg.form.height)
    }
    //让new出来的仓库对象和我们设置好的对象进行一个合并
    Wiw.prototype = $.extend({},new widget.widget(),{
        //alert: function (cfg) {
        //
        //    var _this_ = this;
        //    //TODO:对conText进行检查
        //    var nCfg = $.extend(true,this.config,cfg);
        //
        //
        //    if(nCfg.skinClassName){
        //        boundingBox.addClass(nCfg.skinClassName);
        //    }
        //    //为什么footer会产生冲突 让btn无法正确的嵌套在div内部
        //    //console.log(nCfg.handler);
        //    boundingBox.css({
        //        width:nCfg.from.width + "px",
        //        height:nCfg.from.height + "px",
        //        top:(nCfg.y || (window.innerHeight - nCfg.from.width)/2) + "px",
        //        left:(nCfg.x || (window.innerWidth - nCfg.from.height)/2) + "px"
        //    })
        //
        //    //关闭按钮
        //
        //    if(nCfg.hasCloseBtn){
        //        var closeBtn = $("<span class='wiw_closeBtn'>X</span>");
        //        closeBtn.appendTo(boundingBox);
        //
        //        closeBtn.click(function () {
        //            nCfg.closeBtnHandler&&_this_.fire("close");
        //            mask&&mask.remove();
        //            boundingBox.remove();
        //        })
        //
        //    }
        //
        //    //关闭按钮结束
        //
        //    //模态 且添加事件 被点击让模态闪一下 淡入淡出
        //    var mask = null;
        //
        //    if(nCfg.hasMask){
        //        mask = $("<div class='wiw_mask'></div>");
        //        if(nCfg.maskFlash){
        //            mask.click(function () {
        //                $(".wiw_boundingBox").fadeOut(200,function () {
        //                    $(".wiw_boundingBox").fadeIn(200);
        //                })
        //            })
        //        }
        //        mask.appendTo("body");
        //    }
        //    //模态结束
        //    if(nCfg.isDraggable){
        //        if(nCfg.draggableHandler){
        //            boundingBox.draggable({
        //                containment: "window",
        //                handle:nCfg.draggableHandler
        //            });
        //        }else {
        //            boundingBox.draggable({
        //                containment: "window"
        //            });
        //        }
        //    }
        //    boundingBox.appendTo("body");
        //    //生成按钮和执行回调函数
        //
        //    var btn = boundingBox.find(".wiw_footer input");
        //    btn.click(function () {
        //        nCfg.alertBtnHandler&&_this_.fire("alert");
        //        mask&&mask.remove();
        //        boundingBox.remove();
        //    })
        //
        //    //绑定一下自定义的事件
        //
        //    nCfg.alertBtnHandler&&this.on("alert",nCfg.alertBtnHandler);
        //    nCfg.closeBtnHandler&&this.on("close",nCfg.closeBtnHandler);
        //
        //    //绑定结束
        //    return this;
        //},
        renderUI:function () {
            /*
             * 这里是具体的盒子生成的部分
             * 涉及主要的盒子 确定按钮内容 模态 关闭按钮
             * */
            var that = this;
            
            var footer = "";
            
            if(this.config.winType === "alert"){
                
                footer = "<input type='button' value='" + this.config.alertBtnContent + "' class='wiw_alertBtn'>";
            }else if(this.config.winType ==="confirm"){
                
                footer = "<input type='button' value='" + this.config.confirmBtn + "' class='wiw_confirmBtn'><input type='button' value='" + this.config.cancelBtn + "' class='wiw_cancelBtn'>";
                
            }else if(this.config.winType === "prompt"){
                console.log(1);
                this.config.content +='<p class="wiw_promptInputWrapper"><input type="' + (this.config.isprmptInputPassWord ? "password" : "text") + '" value="' + this.config.defauletValuePromptInput + '" maxlength="' + this.config.maxlengthPromptInput + '" class="wiw_promptInput"></p>';
                
                footer = '<input type="button" value="' + this.config.promptBtn + '" class="wiw_promptBtn"><input type="button" value="' + this.config.cancelBtn + '"  class="wiw_cancelBtn">';
                
            }
            
            
            this.boundingBox = $("<div class='wiw_boundingBox'>" +
                "<div class='wiw_header'>" + this.config.title + "</div>" +
                "<div class='wiw_body'>" + this.config.content + "</div>" +
                "<div class='wiw_footer'>" + footer + "</div>" +
                "</div>");
    
            this._promptInput = this.boundingBox.find(".wiw_promptInput");
            
            
            if (this.config.hasMask) {
                this._mask = $("<div class='wiw_mask'></div>");
                if (this.config.maskFlash) {
                    this._mask.click(function () {
                        $(".wiw_boundingBox").fadeOut(200, function () {
                            $(".wiw_boundingBox").fadeIn(200);
                        })
                    })
                }
    
                this._mask.appendTo("body");
    
            }
    
            if (this.config.hasCloseBtn) {
                var closeBtn = $("<span class='wiw_closeBtn'>X</span>");
                closeBtn.appendTo(this.boundingBox);
            }
        },
        bindUI:function () {
            
            /*
            * 这里是事件绑定部分
            * */
            var that = this;
            
            this.boundingBox.delegate(".wiw_footer input","click",function () {
                that.fire("alert");
                that.destory();
            }).delegate(".wiw_closeBtn","click",function () {
                that.fire("close");
                that.destory();
            }).delegate(".wiw_confirmBtn","click",function () {
                that.fire("confirm");
                that.destory();
            }).delegate(".wiw_cancelBtn","click",function () {
                that.fire("cancel");
                that.destory();
            }).delegate(".wiw_promptBtn","click",function () {
                that.fire("prompt",that._promptInput.val());
                that.destory();
            })
    
            this.config.alertBtnHandler&&this.on("alert",this.config.alertBtnHandler);
            this.config.closeBtnHandler&&this.on("close",this.config.closeBtnHandler);
            this.config.closeBtnHandler&&this.on("confirm",this.config.closeBtnHandler);
            this.config.closeBtnHandler&&this.on("cancel",this.config.closeBtnHandler);
            this.config.promptBtnHandler&&this.on("prompt",this.config.promptBtnHandler);
        },
        syncUI:function () {
            /*
            * 初始化UI 包含一些样式的设置 以及弹窗的可拖动性
            * */
            this.boundingBox.css({
                width:this.config.from.width + "px",
                height:this.config.from.height + "px",
                top:(this.config.y || (window.innerHeight - this.config.from.width)/2) + "px",
                left:(this.config.x || (window.innerWidth - this.config.from.height)/2) + "px"
            })
            
            this.config.skinClassName&&this.boundingBox.addClass(this.config.skinClassName);
                if(this.config.isDraggable){
                    console.log("1");
                    if(this.config.draggableHandler){
                        this.boundingBox.draggable({
                            containment: "window",
                            handle:this.config.draggableHandler
                        });
                    }else {
                        console.log("2");
                        this.boundingBox.draggable();
                    }
                }
        },
        destructor:function () {
            this._mask && this._mask.remove();
        },
        alert:function (cfg) {
            $.extend(true,this.config,cfg)
            this.winType = "alert";
            this.render();
            return this;
        },
        confirm:function (cfg) {
            $.extend(true,this.config,cfg,{winType:"confirm"});
            this.render();
            return this;
        },prompt:function (cfg) {
            $.extend(true,this.config,cfg,{winType:"prompt"});
            this.render();
            this._promptInput.focus();
            return this;
        }
    })
    
    
    
    return {
        window:Wiw
    }
    //返回对象 注意这里的键值交由require来处理
    //可以暴露多个方法
    //键为后续调用的标识符 值为具体的指针

});
