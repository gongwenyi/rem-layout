$(function(){
  var $mask = $('.mask'),
      $maskNav = $('.mask-nav'),
      $maskShopcar = $('.mask-shopcar'),
      $navigation = $('.navigation'),
      $shopcarOpen = $('.shopcar-open'),
      $shopcarClose = $('.shopcar-close'),
      $filterShow = $('.filter-show'),
      $filterNav = $('.filter-nav'),
      $filterNava = $filterNav.find('a');
  //显示头部的filter-nav
  $filterShow.on('click', function(){
    $(this).toggleClass('filter-select');
    $filterNav.toggleClass('filter-nav-show');
  });
  $filterNava.each(function(){
    $(this).on('click', function(){
      $(this).addClass('current').siblings().removeClass('current');
    });
  });
  // 点击头部的navigation按钮，显示遮罩层，同时mask-nav分类列表添加类名mask-nav-show，执行动画，从左向右滑入页面中
  $navigation.on('click', function(){
    $mask.show();
    $maskNav.addClass('mask-nav-show');
  });
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
    $maskNav.removeClass('mask-nav-show');
    $maskShopcar.removeClass('mask-shopcar-show');
  });

  var $navList = $('.nav-list'),
      $navListItems = $navList.find('.nav-list-item'),
      $navListItemMenus = $navListItems.find('.nav-list-item-menu');
  // 分类列表的展开与收起
  $navListItemMenus.each(function(){
    $(this).on('click', function(){
      $(this).parent().toggleClass('select').siblings().removeClass('select');
    })
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



  // 模拟滑动到底部加载新数据
  var data = [
    { 'url': '01.png', 'name': 'Pink Shirt',     'price': '249.00' },
    { 'url': '02.png', 'name': 'Checked Shirt',  'price': '50.00' },
    { 'url': '03.png', 'name': 'Red Polo Shirt', 'price': '181.00' },
    { 'url': '04.png', 'name': 'Awesome Dress',  'price': '372.00' },
    { 'url': '01.png', 'name': 'Pink Shirt',     'price': '249.00' },
    { 'url': '02.png', 'name': 'Checked Shirt',  'price': '50.00' }
  ];

  var $productsList = $('.products-list'),
      $onload = $('.onload');

  // 滑动到页面底部，加载新数据
  $(document).on('scroll', load);

  // 加载数据
  function load(){
    var bodyOffsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight,
      bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
      clientHeight = document.documentElement.clientHeight;

    if(bodyOffsetHeight-bodyScrollTop <= clientHeight){ // 到达页面底部
      $onload.show(); // 显示正在加载按钮
      addToProductList(); // 添加数据
    }
  }
  // 添加新数据
  function addToProductList(){
    // for(var i=0; i<data.length; i++){
    //   var $li = $('<li class="products-list-item">'),
    //       html = '<a href="javascript:;" class="list-item-content">'
    //               +'<div class="item-content-img">'
    //                 +'<img src="imgs/'+ data[i].url +'">'
    //               +'</div>'
    //               +'<div class="item-content-info">'
    //                 +'<p class="item-content-info-name ellipsis">'+ data[i].name +'</p>'
    //                 +'<p class="item-content-info-price">$<span class="product-price">'+ data[i].price +'</span></p>'
    //               +'</div>'
    //             +'</a>';
    //   $li.html(html);
    //   $li.appendTo($productsList);
    // }
    var html = "";
    for(var i=0; i<data.length; i++){
      html += '<li class="products-list-item">'
                +'<a href="javascript:;" class="list-item-content">'
                  +'<div class="item-content-img">'
                    +'<img src="imgs/'+ data[i].url +'">'
                  +'</div>'
                  +'<div class="item-content-info">'
                    +'<p class="item-content-info-name ellipsis">'+ data[i].name +'</p>'
                    +'<p class="item-content-info-price">$<span class="product-price">'+ data[i].price +'</span></p>'
                  +'</div>'
                +'</a>'
             +'</li>';
    }
    $productsList.html($productsList.html()+html);
  };
});
