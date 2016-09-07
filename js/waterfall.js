/**
 * Created by YP on 2016/8/22.
 */
window.onload = function () {
    waterFall('main', 'box');//IE9以下不能使用getElementByClassName方法

    var oparent = document.getElementById('main');
    //设置一个需要加载的图片对象,对象的属性是data
    var needLoadImg = {'data': [{'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '4.jpg'}, {'src': '6.jpg'}, {'src': '13.jpg'}, {'src': '20.jpg'}]};
    window.onscroll = function () {
        if (checkLoadImg())//如果返回真，则加载图片
        {
            for (var i = 0; i < needLoadImg.data.length; i++) {
                var newBox = document.createElement('div');
                newBox.className = 'box';
                oparent.appendChild(newBox);
                var newPic = document.createElement('div');
                newPic.className = 'pic';
                newBox.appendChild(newPic);
                var newImg = document.createElement('img');
                newImg.src = 'img/' + needLoadImg.data[i].src;//data是数组属性
                newPic.appendChild(newImg);

            }

        }
        waterFall('main', 'box');
    }

}

function waterFall(parent, box) {
    var oparent = document.getElementById(parent);
    var childbox = getchildClassNameElement(oparent, box);
//获取每个box元素的实际宽度,包含padding值
    var boxwidth = childbox[1].offsetWidth;
    var IntNumPerRow = Math.floor(document.documentElement.clientWidth / boxwidth);//每行的Box的个数；
    //设置main的宽度
    oparent.style.cssText = 'width:' + IntNumPerRow * boxwidth + 'px;margin:0 auto';
    //定义一个存放第一列所有BOX的高度的数组；
    var firstBoxHeight = [];

    for (var i = 0; i < childbox.length; i++) {
        if (i < IntNumPerRow) {
            firstBoxHeight.push(childbox[i].offsetHeight);
        }
        else {
            var min_height = Math.min.apply(null, firstBoxHeight);
            var index = min_index(min_height, firstBoxHeight);
            childbox[i].style.position = 'absolute';
            //childbox[i].style.left = boxwidth * 3 + 'px';
            childbox[i].style.left = childbox[index].offsetLeft + 'px';
            childbox[i].style.top = min_height + 'px';
            firstBoxHeight[index] += childbox[i].offsetHeight;
        }
    }
}
//返回数组中下标对应元素的方法
function min_index(num, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == num) {
            return i;
        }
    }
}

//获取拥有相同类名的子元素的方法；
function getchildClassNameElement(parent, classname) {
    var obox = new Array();
    var Child = parent.getElementsByTagName('*');
    for (var i = 0; i < Child.length; i++) {
        if (Child[i].className == classname) {
            obox.push(Child[i]);
        }
    }
    return obox;
}
//判断根据进度条是否应该加载图片的方法
function checkLoadImg() {
    var oparent = document.getElementById('main');
    var childbox = getchildClassNameElement(oparent, 'box');
    var last_box_h = Math.floor(childbox[childbox.length - 1].offsetTop + childbox[childbox.length - 1].offsetHeight / 2);//最后一个box的一半距离父容器的高度
    var screenH = document.documentElement.clientHeight;
    var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
    return (last_box_h < screenH + scrollH) ? true : false;
}