$(function(){
  var $mask = $('.mask'),
      $maskNav = $('.mask-nav'),
      $maskShopcar = $('.mask-shopcar'),
      $navigation = $('.navigation'),
      $shopcarOpen = $('.shopcar-open'),
      $shopcarClose = $('.shopcar-close'),
      $filterOpen = $('.filter-open'),
      $maskFilter = $('.mask-filter'),
      $filterClose = $maskFilter.find('.filter-close');

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
  // 显示filter
  $filterOpen.on('click', function(){
    $mask.show();
    $maskFilter.addClass('mask-filter-show');
  });
  // 隐藏filter
  $filterClose.on('click', function(){
    $mask.hide();
    $maskFilter.removeClass('mask-filter-show');
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
    $maskFilter.removeClass('mask-filter-show');
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
      setTimeout(function(){$this.parent().parent().remove();}, 200);
    })
  });

  // mask-filter中颜色选择
  var $filterContSelectColor = $('.filter-cont-select-color'),
      $colorItem = $filterContSelectColor.find('.color-item');
  $colorItem.each(function(){
    $(this).on('click', function(){
      $(this).addClass('selected').siblings().removeClass('selected');
    })
  });
  // mask-filter中尺寸选择
  var $filterContSelectSize = $('.filter-cont-select-size'),
      $sizeItem = $filterContSelectSize.find('.size-item');
  $sizeItem.each(function(){
    $(this).on('click', function(){
      $(this).addClass('selected').siblings().removeClass('selected');
    })
  });
  // mask-filter中价格区间拖拽
  var $filterContSelectPrice = $('.filter-cont-select-price'),
      $priceBar = $filterContSelectPrice.find('.price-bar'),
      $priceBarMax = $priceBar.find('.price-bar-max'),
      $priceBarMaxBtn = $priceBar.find('.price-bar-max-btn'),
      $priceBarMin = $priceBar.find('.price-bar-min'),
      $priceBarMinBtn = $priceBar.find('.price-bar-min-btn'),
      $priceNum = $('.price-num'),
      $priceNumMin = $priceNum.find('.price-num-min span'),
      $priceNumMax = $priceNum.find('.price-num-max span');
  var priceBarWidth = parseInt($priceBar.width()),  // 价格区间的最大长度
      priceBarMaxWidth = parseInt($priceBarMax.width()), // 最大价格的长度
      priceBarMinWidth = parseInt($priceBarMin.width()); // 最大价格的长度
  // 拖拽最大价格滑块
  var maxBtnx;
  touch.on($priceBarMaxBtn, 'touchstart', function(ev){
    ev.preventDefault();
  });
  touch.on($priceBarMaxBtn, 'drag', function(ev){
    maxBtnx = maxBtnx || 0;
    // log("当前x值为:" + maxBtnx + ", 当前y值为:" + dy +".");
    var offx = -(maxBtnx + ev.x); //.price-bar-max-btn最大价格滑块拖动的距离
    offx = offx<0 ? 0 : offx;
    var barMaxWidth = priceBarMaxWidth - offx;  //修改.price-bar-max的宽度
    barMaxWidth = barMaxWidth<$priceBarMin.width()+28 ? $priceBarMin.width()+28 : barMaxWidth; // 控制最大价格滑块不能滑动到最小价格滑块的左边
    var priceNumMax = parseInt(barMaxWidth/priceBarWidth*1000); // 最大价格
    $priceBarMax.width(barMaxWidth);
    $priceNumMax.html(priceNumMax);
  });
  touch.on($priceBarMaxBtn, 'dragend', function(ev){
    maxBtnx += ev.x;
  });
  // 拖拽最小价格滑块
  var minBtnx;
  touch.on($priceBarMinBtn, 'touchstart', function(ev){
    ev.preventDefault();
  });
  touch.on($priceBarMinBtn, 'drag', function(ev){
    minBtnx = minBtnx || 0;
    // log("当前x值为:" + minBtnx + ", 当前y值为:" + dy +".");
    var offx = (minBtnx + ev.x); //.price-bar-min-btn最小价格滑块拖动的距离
    offx = offx<0 ? 0 : offx;
    var barMinWidth = priceBarMinWidth + offx;  //修改.price-bar-min的宽度
    barMinWidth = barMinWidth>$priceBarMax.width()-28 ? $priceBarMax.width()-28 : barMinWidth; // 控制最小价格滑块不能滑动到最大价格滑块的右边
    var priceNumMin = parseInt(barMinWidth/priceBarWidth*1000); // 最大价格
    $priceBarMin.width(barMinWidth);
    $priceNumMin.html(priceNumMin);
  });
  touch.on($priceBarMinBtn, 'dragend', function(ev){
    minBtnx += ev.x;
  });

  // 服装类型选择
  var $typeDresses = $('.type-dresses'),
      $typeDressesBox = $typeDresses.find('.type-dresses-box'),
      $typeDressesSelected = $typeDressesBox.find('.type-dresses-selected'),
      $typeDressesList = $typeDresses.find('.type-dresses-list'),
      $typeDressesListItem = $typeDressesList.find('.type-dresses-list-item');
  $typeDressesBox.on('click', function(){
    $typeDresses.toggleClass('type-dresses-list-show');
  });
  $typeDressesListItem.each(function(){
    $(this).on('click', function(){
      $(this).addClass('selected').siblings().removeClass('selected');
      $typeDressesSelected.html($(this).html());
      setTimeout(function(){
        $typeDresses.toggleClass('type-dresses-list-show');
      }, 200);
    })
  });

  // 删除筛选条件
  var $filterTabs = $('.filter-tabs'),
      $filterTabsItem = $filterTabs.find('.filter-tabs-item'),
      $filterTabsItemClose = $filterTabsItem.find('.filter-tabs-item-close');
      $filterTabsItemClose.each(function(){
        $(this).on('click', function(){
          $(this).parent().remove();
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
  }
});
