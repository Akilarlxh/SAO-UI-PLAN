//鼠标控制横向滚动
if (document.getElementsByClassName("menu-item")[0]){
  let xscroll = document.getElementsByClassName("menu-item")[0];
  xscroll.addEventListener("mousewheel", function (e) {
  //计算鼠标滚轮滚动的距离
  let v = -e.wheelDelta / 2;
  xscroll.scrollLeft += v;
  //阻止浏览器默认方法
  e.preventDefault();
  }, false);
}

// 获取当前时间

let box = document.getElementById('message-date-box')

//不足十位补零
let addZero = val => val < 10 ? '0' + val : val

//把阿拉伯数字的星期转化为中国汉字的星期 // 星期映射表
let trans = val => {
    let obj = {
        0: '日',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六'
    }
    return obj[val]
}
setTime ()
//获取时间的方法
function setTime() {
    let time = new Date();
    // let year = time.getFullYear(); // 获取年
    // let month = time.getMonth() + 1; // 获取月（是从0到11，所以我们要给他加1）
    // let date = time.getDate(); // 获取日
    let hour = time.getHours(); // 获取小时
    let min = time.getMinutes(); // 获取分钟
    let sec = time.getSeconds(); // 获取秒
    let day = time.getDay(); // 获取星期几(0是星期日)


    let value = addZero(hour) +
        ':' + addZero(min) + ":" + addZero(sec) + ' 星期'+ trans(day)
    // 把所有的时间拼接到一起
    box.innerText = value
    // console.log(value)
    // 把拼接好的时间插入到页面

}
// 让定时器每间隔一秒就执行一次setTime这个方法（这是实现时钟的核心）
setInterval(setTime, 1000)
