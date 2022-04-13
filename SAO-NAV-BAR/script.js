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
