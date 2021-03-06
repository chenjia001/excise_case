function slideShow() {
    var showContainer = document.getElementsByClassName("showContainer")[0];
    var container = document.getElementsByClassName("container")[0];
    container.style.left = "0px"; //此处需要设置container.style.left，否则将只能获取一个空字符串
    var imgNum = container.children.length;
    var oneImgWidth = container.children[0].offsetWidth;
    var leftTriangle = document.getElementsByClassName("left-triangle")[0];
    var rightTriangle = document.getElementsByClassName("right-triangle")[0];
    var index = 0; //用于记录当前现实的图片的下标
    console.log('imgNum==', imgNum);
    console.log('container.children[0]==', container.children[0]);
    console.log('oneImgWidth==', oneImgWidth);
    //  移动函数
    function movement(offset) {
        var container = document.getElementsByClassName("container")[0]; //获取滚动容器
        var oldLeft = parseInt(container.style.left); //获取滚动容器的初始的左距离，利用parseInt()方法取整
        var newLeft = oldLeft + offset;
        container.style.left = newLeft + "px"; //改变滚动容器的左距离
    }
    // 高亮函数
    function showDots(target) {
        var dots = document.getElementsByClassName("dots")[0].children;
        for (var i = 0; i < dots.length; i++) {
            if (i !== target) {
                dots[i].style.backgroundColor = "orange"; //初始为橘色
            } else {
                dots[i].style.backgroundColor = "red"; //高亮为红色
            }
        }
    }
    // 自行滚动函数    
    function autoRullImg() {
        function rullAuto() {
            timer = setInterval(function () {
                index++;
                if (index > imgNum - 1) {
                    index = 0;
                }
                showDots(index);
                movement(-oneImgWidth);
                if (parseInt(container.style.left) <= -imgNum * oneImgWidth) {
                    container.style.left = "0px";
                }
            }, 800);
        }
        rullAuto();

        showContainer.onmouseover = function () {
            clearInterval(timer);
        };
        showContainer.onmouseout = function () {
            rullAuto();
        };
    }

    //底部提示圆点函数
    function clickDots() {
        console.log('底部提示圆点函数');
        var dots = document.getElementsByClassName("dots")[0].children; //获取提示圆点
        for (var i = 0; i < dots.length; i++) {
            (function (n) {
                dots[n].onclick = function () {
                    container.style.left = -n * oneImgWidth + "px";
                    showDots(n);
                }
            })(i);
        }
    }

    //箭头点击函数
    function clickTriangle() {
        leftTriangle.onclick = function () {
            if (parseInt(container.style.left) >= 0) {
                container.style.left = -(imgNum - 1) * oneImgWidth + "px";
            } else {
                movement(oneImgWidth);
            }
            index = index - 1;
            if (index < 0) {
                index = imgNum - 1;
            }
            showDots(index);
        };
        rightTriangle.onclick = function () {
            if (parseInt(container.style.left) <= -(imgNum - 1) * oneImgWidth) {
                container.style.left = "0px";
            } else {
                movement(-oneImgWidth);
            }
            index = index + 1;
            if (index > imgNum - 1) {
                index = 0;
            }
            showDots(index);
        };
    }

    autoRullImg();
    clickDots();
    clickTriangle();
}

window.onload = slideShow;