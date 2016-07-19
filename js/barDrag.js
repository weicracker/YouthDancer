/**
 * Created by hasee on 2016/6/28.
 */
function barDrag(option,callback){

    /*先获取页面元素*/
    var oWrap = option.wrap;
    var oBtn = option.btn;
    var oRate = option.rate;
    /*计算进度条的最大值，和最小值*/
    var min,max;
    if(option.direction=="v"){
        /*纵向 最大值应该是高度*/
        min = -oBtn.height()/2;
        max = oWrap.height()-oBtn.height()/2;
    }else {
        min = -oBtn.width()/2;
        max = oWrap.width()-oBtn.width()/2;
    }

    /*鼠标事件*/
    oBtn.on("mousedown",function(ev){

        /*把鼠标按钮的坐标距离按钮左上角的坐标差记录下来*/
        var disX = ev.offsetX;
        var disY = ev.offsetY;
        /*获取壳子的左边距,和上边距*/
        var disL = oWrap.offset().left-$(window).scrollLeft();
        var disT = oWrap.offset().top-$(window).scrollTop();


        $(document).on("mousemove",function(ev){

            /*现在按钮的坐标 = 鼠标的坐标-壳子的左边距-disX*/
            var iL = ev.clientX-disL-disX;
            var iT = ev.clientY-disT-disY;

            /*要计算按钮距离底部的距离，
             * 壳子的高度  - 距离顶部的距离 -  按钮的高度
             * */
            var iB = oWrap.height()-iT-oBtn.height();

            /*限制一下范围，不能超过最左边，也不能超过最右边*/
            if(iL<min){
                iL = min
            }else if(iL>max){
                iL = max
            };
            if(iB<min){
                iB = min
            }else if(iB>max){
                iB = max
            };

            if(option.direction=="v"){
                /*设置按钮的样式*/
                oBtn.css("bottom",iB+"px");
                /*计算按钮拖拽相对于 壳子宽度 的比率*/
                var l = (iB+10)/oWrap.height()
                /*让进度条同步百分比变长*/
                oRate.css("height",Math.round(l*100)+"%")
            }else {
                /*设置按钮的样式*/
                oBtn.css("left",iL+"px");
                /*计算按钮拖拽相对于 壳子宽度 的比率*/
                var l = (iL+10)/oWrap.width()
                /*让进度条同步百分比变长*/
                oRate.css("width",Math.round(l*100)+"%")
            }


            //callback&&callback()
            if(callback){
                callback(l)
            }

            return false
        });

        $(document).on("mouseup",function(){
            $(document).off("mouseup mousemove");
        })

        return false
    })
}