// グローバル変数の定義
var _window = jQuery(window);



// hide & fade
jQuery(function(){
	var _main = jQuery("body.single main, footer");
	_main.css({ "opacity" : 0 });
	_window.on("load", function(){
		_main.stop().transit({ "opacity" : 1 });
	});
});



// Index Img
jQuery(function(){
	// 変数の定義
	var _imgWrapper = jQuery("body.index .main_wrapper");
	var _imgUl = jQuery("body.index .main_wrapper ul");
	var _imgLi = jQuery("body.index .main_wrapper ul li");
	var _img = jQuery("body.index .main_wrapper ul li .img img");
	var _imgUlX;
	
	// 関数の定義
	function imgResize(){
		var _headerHeight = jQuery("body.index header").outerHeight();
		var _winHeight = _window.height();
		
		var _imgLiHeight = _winHeight - _headerHeight;
		var _imgHeight = _imgLiHeight;
		
		_img.css({ "height" : _imgHeight });
		
		return this;
	}
	function ulResize(){
		var array = [];
		for(var i = 0; i < jQuery("body.index .main_wrapper ul li").length; i++){
			array.push(jQuery("body.index .main_wrapper ul li").eq(i).outerWidth());
		}
		
		var _ulWidth = 0;
		for(var j = 0; j < array.length; j++){
			_ulWidth += array[j];
		}
		
		_imgUl.css({ "width" : _ulWidth });
	}
	
	_window.on("load resize", function(){
		imgResize();
		ulResize();
	});
	
	
	// flickSimple
	_window.on("load", function(){
		_imgWrapper.flickSimple({
			snap: 0,
			ratio: 7,
			duration: 400, // ms
			lock: true,
			horizontal: true,
			vertical: false,
			useCSSAnim: true,
			use3d: true
		});
		
		// mousewheel
		var _main = jQuery("body.index main");
		jQuery(_main).mousewheel(function(event, mov){
			var _scrollSpeed = 75; // マウスホイールでのスクロールの速度
			var _scrollLeft = _imgWrapper.flickSimple("currentX") + mov * _scrollSpeed;
			_imgWrapper.flickSimple("move", _scrollLeft);
			return false;
		});
	});
	
	// hide & fadein
	_imgWrapper.css({ "opacity" : 0 });
	_window.on("load", function(){
		_imgWrapper.stop().transit({ "opacity" : 1 });
	});
});



/*
// BackGroundCheck
jQuery(function(){
	// define object
	BackgroundCheck.init({
		targets: '.bgCheck'
	});
	
	_window.on("load resize", function(){
		BackgroundCheck.refresh();
	});
	_window.scroll(function(){
		BackgroundCheck.refresh();
	});
});
*/


// single
jQuery(function(){
	// img blur
	var _img = jQuery("body.single .img_wrapper .entry_img");
	_img.clone().appendTo("body.single .img_wrapper").clone().appendTo("body.single .img_wrapper").addClass("imgFront");
	
	var _winH = _window.height();
	_window.on("load resize", function(){
		_winH = _window.height();
	});
	
	// content margin
	var _headerH = jQuery("header").height();
	var _content = jQuery("body.single main .content_wrapper").not(".text");
	var _content_text = jQuery("body.single main .content_wrapper.text");
	_window.on("load resize", function(){
		_content.css({ "margin-top" : _winH });
	});
	_content_text.css({ "margin-top" : _headerH });
	
	// content bg blur
	var _imgFront = jQuery("body.single .img_wrapper .entry_img.imgFront");
	var _scroll;
	_window.scroll(function(){
		var _scroll = _window.scrollTop();
		_imgFront.css({ "height" : _winH - _headerH - _scroll });
	});
	_window.on("resize", function(){
		var _scroll = _window.scrollTop();
		_imgFront.css({ "height" : _winH - _headerH - _scroll });
	});
	
	// img resize
	function imgResize(){
		var _headerH = jQuery("header").height();
	
		var _winW = _window.width();
		var _winH = _window.height();
	
		var _imgArea = jQuery("body.single main .entry_img");
		var _imgAreaBehind = jQuery("body.single main .entry_img:nth-child(-n+2)");
		var _imgAreaFront = jQuery("body.single main .entry_img:nth-child(3)");
		var _img = _imgArea.find("img");
		
		var _imgW = _img.width();
		var _imgH = _img.height();
		var _scaleW = _winW / _imgW; // 画像の幅をウインドウいっぱいに拡大する倍率
		var _scaleH = _winH / _imgH;　// 画像の高さをウインドウいっぱいに拡大する倍率
		var _fixScale = Math.max(_scaleW, _scaleH); // 画像の拡大倍率（幅と高さで大きい方を採る）
		var _setW = Math.floor(_imgW * _fixScale); // 画像の幅を倍率分拡大
		var _setH = Math.floor(_imgH * _fixScale); // 画像の高さを倍率分拡大
		var _imgTop = Math.floor((_setH - _winH) / -2); // 画像を上下中央表示
		var _imgLeft = Math.floor((_setW - _winW) / -2); // 画像を左右中央表示
		
		// 画像のリサイズ
		_img.css({
			"width" : _setW,
			"height" : _setH,
			"top" : _imgTop - _headerH,
			"left" : _imgLeft
		});
		
		// 領域のリサイズ
		_imgAreaBehind.css({
			"height" : _winH - _headerH
		});
		/*
		_imgAreaFront.css({
			"left" : -(_offsetLeft * 2),
			"width" : _winW + (_offsetLeft * 2)
		});
		*/
	}
	// 関数の実行
	var _headerH = jQuery("header").height();
	var _winH = _window.height();
	jQuery("body.single main .entry_img:nth-child(3)").css({ "height" : _winH - _headerH });
	_window.on("load resize", function(){
		imgResize();
	});
	
});
/*
jQuery(function(){
	// blur
	jQuery("body.single main .content_wrapper").blurjs({
		source: ".blurBase",
		overlay: "rgba(255,255,255,0.7)",
		radius: 5
	});
});
*/