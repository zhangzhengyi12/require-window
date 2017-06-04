require.config({
    paths: {
        jquery: "vendor/jquery",
        jqueryUi:"vendor/jquery-ui.min",
        widget:"widget"
    }
})

//设置一下模块默认的路径 导入需要键就可以了

//这里作为参数的w是一个window对象内部含有之前暴露的构造函数
    require(["jquery", "wiw"],function ($,w) {
    // console.log();
    
    $('.alert').click(function () {
        var win = new w.window();
        win.alert(
            {
                "from":{
                    "height":200,
                    "width":500
                },
                "content":"Hello World",
                "alertBtnHandler":function () {
                    alert("alert");
                },
                "closeBtnHandler":function () {
                    alert("are you sure");
                },
                "title":"幼稚园杀手",
                "hasCloseBtn":true,
                "skinClassName":null,
                "hasMask":true,
                "alertBtnContent":"accpt",
                "maskFlash":true,
                "isDraggable":true,
                "draggableHandler":".wiw_header",
            }
        ).on("close",function () {
            alert("close to new");
        })
       
    })
        
        $('.confirm').click(function () {
            new w.window().confirm({
                title:"系统消息",
                content:"您确定要删除这个文件吗",
                confirmBtn:"是",
                cancelBtn:"否",
                dragHanle:".wiw_header",
                hasMask:true,
                maskFlash:true,
            }).on("confirm",function () {
                alert("sure");
            }).on("cancel",function () {
                alert("cancel");
            })
        })
    
        $('.prompt').click(function () {
            new w.window().prompt({
                title:"系统消息",
                content:"输入你的 SSH key",
                promptBtn:"发送",
                cancelBtn:"取消",
                dragHanle:".wiw_header",
                hasMask:true,
                maskFlash:true,
                defauletValuePromptInput:"jkf3j5j6535kjfd45",
                promptBtnHandler:function (text) {
                    alert("你属于的key是：" + text);
                }
            }).on("confirm",function () {
                alert("sure");
            }).on("cancel",function () {
                alert("cancel");
            })
        })
        
        //confirm实例
    
})
