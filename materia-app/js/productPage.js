$(function(){
  var $mask = $('.mask'),
      $maskShopcar = $('.mask-shopcar'),
      $shopcarOpen = $('.shopcar-open'),
      $shopcarClose = $('.shopcar-close');

  // 显示购物车，显示遮罩层，同时mask-shopcar购物车列表添加类名mask-shopcar-show,执行动画，从顶部向下滑入页面中
  $shopcarOpen.on('click', function(){
    $mask.show();
    $maskShopcar.addClass('mask-shopcar-show');
  });
  // 隐藏购物车
  $shopcarClose.on('click', function(){
    $mask.hide();
    $maskShopcar.removeClass('mask-shopcar-show');
  });
  // 滑动mask遮罩层时，禁止页面滚动
  $mask.on('touchmove', function(e){
    e.preventDefault();
    $('body').scrollTop(0);
    return false;
  });
  // 点击mask，隐藏遮罩层
  $mask.on('click', function(){
    $(this).hide();
    $maskShopcar.removeClass('mask-shopcar-show');
  });

  // 购物车中商品删除功能
  var $shopcarList = $('.shopcar-list'),
      $shopcarProduct = $('.shopcar-product'),
      $shopcarProductDelete = $shopcarProduct.find('.shopcar-product-delete');
  // 向右滑动显示删除按钮，向左滑动隐藏删除按钮
  $shopcarProduct.each(function(){
    var $this = $(this);
    touch.on($this, 'swiperight', function(){
      $this.addClass('swipe-right');
    });
    touch.on($this, 'swipeleft', function(){
      $this.removeClass('swipe-right');
    });
  });
  // 长按删除按钮，删除商品
  $shopcarProductDelete.each(function(){
    var $this = $(this);
    touch.on($this, 'hold', function(ev){
      $this.addClass('hold-delete');
      ev.preventDefault();
      setTimeout(function(){$this.parent().parent().remove();}, 200)
    })
  });

  // 初始化幻灯片插件
  Carousel.init($('.carousel'));

  // 选择颜色
  var $selectColorItem = $('.product-select-cont-color .select-cont-type-list a');
  select($selectColorItem, 'selected');

  // 选择尺寸
  var $selectSizeItem = $('.product-select-cont-size .select-cont-type-list a');
  select($selectSizeItem, 'selected');


  /*在一组同类型的元素中选择一个，添加类名className，其他元素删除类名className
   *$ele: 选择器集合
   *className: 类名
  */
  function select($ele, className){
    $ele.each(function(){
      $(this).on('click', function(){
        $(this).addClass(className).siblings().removeClass(className);
      })
    });
  }
});
