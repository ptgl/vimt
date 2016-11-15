var w_ = $(window).width();
var h_ = $(window).height();
var body = $("html, body");
function Page(){
	var self= this;
	    
	this.init= function(){
		self.jquery();
		self.nav_hover();
	};

	this.jquery = function(e){
		try {
			$("body select.lg").msDropDown();
		} catch(e) {
			alert(e.message);
		};
		if($('.select_box').length > 0){
			$('.select_box select').selectbox();
			$('.s_r input').uniform();
			$('.date_s').datepicker()
			$('.box_date a').click(function(){
				$(this).parent().find('.date_s').datepicker('show');
			})
		}

		if($('#mc').is(':checked')){
			$('.date_back').hide();
		}
		$( "input[type='radio']" ).change(function() {
			if($('#kh').is(':checked')){
				$('.date_back').show();
			}
			if($('#mc').is(':checked')){
				$('.date_back').hide();
			}
		});

		if($(".wrap_checkbox").length > 0){
			$('.cb-register input').uniform();
		}

		$('.bxslider').bxSlider({
			auto: true,
			controls: false
		});

		$('.group_info .icon_top').hover(function(){
			var $this =  $(this);
			$('.group_info .icon_top').removeClass('active');
			$('.group_info .icon_top .text').stop().animate({width: 0});
			$this.addClass('active');
			$this.find('.text').stop().animate({width: 202});
		})
		$('.group_info.md_r .icon_top').hover(function(){
			var $this =  $(this);
			$('.group_info.md_r .icon_top').removeClass('active');
			$('.group_info.md_r .icon_top .text').stop().animate({width: 0});
			$this.addClass('active');
			$this.find('.text').stop().animate({width: 148});
		})

		$(window).resize(function(){
			self.ac_nav();
			self.wd_resize();
		})


		// 
		var ct_h = $('.content_module').height();
		var md_h = $('.right_module').height();
		if(md_h > ct_h){
			$('.content_module').css({'min-height': md_h+50});
		}
		$(window).load(function(){
			ct_h = $('.content_module').height();
			md_h = $('.right_module').height();
			if(md_h > ct_h){
				$('.content_module').css({'min-height': md_h+50});
			}
		})
		// 
		$('.place').hover(function(){
			$(this).find('.btn-change').stop().fadeIn();
		}, function(){
			$('.place .btn-change').stop().fadeOut();
		})

		$('.popup_gallery').fancybox({
			padding: 0,
			helpers : {
		        title: {
		            type: 'outside'
		        }
    		}
    	});
		
		$(".btn_rg").click(function(){
			$(".popup_register").show();
			setTimeout(function() {
				$(".popup_register").hide();
			}, 3000);
		});

	}

	this.wd_resize = function(){
		w_ = $(window).width();
		h_ = $(window).height();
	}


	this.ac_nav = function(){
		if($('.nav-menu li').hasClass('active')){
			var ac=$('.nav-menu li.active');
			$('.line_nav').stop().animate({width: ac.width(), left: ac.offset().left});
		}else{
			$('.line_nav').stop().animate({width: 0, left: '30%'});
		}
	}
	this.nav_hover = function(){
		self.ac_nav();
		$('.nav-menu > li').hover(function(){
			var $this = $(this);
			$('.line_nav').stop().animate({width: $this.width(), left: $this.offset().left});
		}, function(){

		})
		$('.nav-menu').hover(function(){

		},	 function(){
			self.ac_nav();
		})
	}
}
Page= new Page();
$(document).ready(function(){
	Page.init();
});
