var place, date_select, startDate, endDate, time1, time2, bd_map = 0;
var w_ = $(window).width();
var h_ = $(window).height();
var h_in = h_ - 64;
var body = $("html, body");
var nice_left = false;
var tick_detail = false;
var hder = true;
var sub_step1 = $('.sub_step1');
var now = new Date();
var step_choose =1;
var num_cus;
var map_oftop = 0, map_opleft = 0;
var map_h = $('#case-study').height()
var map_w = $('#case-study').width()
var show_map_w = $('.wrapper').width();

function Page(){
	var self= this;
	
	this.init= function(){
		self.jquery();
		self.animate();
		self.step();
		self.map_option();
		// self.add_customer();
		// self.confirm_cus();
		self.get_date(0, now);
		if($('#class-ticket').length>0){
			self.selectbox();
		}
		
		if($('.list-food').length>0){
			// $('#accordion-food .accordion').height(h_-537);
			self.select_food();
		}
	};

	this.jquery = function(e){
		try {
			$(".sl-lg select").msDropDown();
		} catch(e) {
			alert(e.message);
		};
		
		// ticket-info
			$('.step2-5-2-detail').css({height: h_in});
			$('.open-detail').click(function(){
				if(!tick_detail){
					tick_detail = true;
					$('.step2-5-2-detail').stop().animate({top: -h_in});
					$('.open-detail').hide();
				}
			})
			$('.btn-close-detail').click(function(){
				if(tick_detail){
					tick_detail = false;
					$('.step2-5-2-detail').stop().animate({top: 0});
					$('.open-detail').show();
				}
			})
		// end ticket-info
		// open header
		$( "body" ).mousemove(function( event ) {
			var x_ = event.pageX;
			var y_ = event.pageY;
			if(y_<20){
				if(hder){
					$('#header').animate({top: 0});
					hder = false;
				}
			}
			if(y_>100){
				if(!hder){
					$('#header').animate({top: -100});
					hder = true;	
				}
			}
		});

		if($('.js-selectbox').length >0 ){
			$('.js-selectbox').selectbox({
				onOpen: function (inst) {
				}
			});
		}
		
		if($('.list-day').length >0 ){
			$( ".list-day" ).datepicker({
				showOtherMonths: true,
				numberOfMonths: 12,
				dayNamesMin: [ "", "", "", "", "", "", "" ],
				onSelect: function(dateText, inst) {
					var day_select = new Date(dateText);
					self.get_date(1, day_select);
                }
			});
			$("div.ui-datepicker-header a.ui-datepicker-prev,div.ui-datepicker-header a.ui-datepicker-next").hide();
		}
	// scroll

		if($('#class-ticket').length >0 ){
			nice_ticket = $("#left-main").niceScroll({
				cursorborder:"",
				cursorcolor:"#333333",
				autohidemode: false,
		        background: "#bbb",
		        railpadding:{top:0,right:4,left:0,bottom:0},
		        cursorwidth:"6px"
			});
		}

		if($('.nice-scroll').length > 0){
			nice_payment = $(".nice-scroll").niceScroll({
				cursorborder:"",
				cursorcolor:"#e9e9e6",
				autohidemode: false,
		        background: "#242424",
		        railpadding:{top:0,right:4,left:0,bottom:0},
		        cursorwidth:"6px"
			});
		}
	// end scroll
		$('.chart .point').click(function(){
			$(this).find('.point_date').show().addClass('active')
		});

		if ($('.step2-flight-infor').length > 0){
			$('.step2-flight-infor table td').live('click',function(){
				$('.step2-flight-infor table td').removeClass('active');
				$(this).addClass('active');
			});
		}
		
		if($('.iCheck').length >0 ){
			$( ".iCheck" ).uniform();
		}
		
		var h_tong = $(window).height()-60;
		var h_info = $('.flight-money-infor').height();
		if ($('.step2-flight-infor').length > 0){
			$('.step2-flight-infor td.row').hover(function(){
				clearTimeout(time1);
				var $this = $(this);
				var w_width = $(this).width();
				var w_height = $(this).height()*2;
				var w_left = $(this).offset().left;
				var w_top = $(this).offset().top -4 ;
				var w_left_all = w_left + w_width;
				if((h_info+w_top)<h_tong){
					$('.flight-money-infor').attr('style', '');
					$('.flight-money-infor img.arrow').attr('style', '');
					$('.flight-money-infor img.arrow').css({top: 37});
					$('.flight-money-infor').css({top: w_top, left: w_left_all,'display':'block'});
				}else{
					$('.flight-money-infor').attr('style', '');
					$('.flight-money-infor img.arrow').attr('style', '');
					$('.flight-money-infor img.arrow').css({bottom: 11});
					$('.flight-money-infor').css({bottom: (h_tong - w_top - w_height - 4 + 60), left: w_left_all,'display':'block'});
				}
			},function(){
				time1 = setTimeout(function(){
					$('.flight-money-infor').css({'display':'none'});
				},500);
			});
			$('.flight-money-infor').hover(function(){
				clearTimeout(time1);
			}, function(){
				time1
				$('.flight-money-infor').css({'display':'none'});
			})
		}

		if ($('.form-input').length > 0){
			$('.form-input > img').hover(function(){
				$(this).parent().find('.form-tip').show();
			},function(){
				$(this).parent().find('.form-tip').hide();
			});
		}

		if ($('.form-select').length > 0){
			$('.form-select > img').hover(function(){
				$(this).parent().find('.form-tip').show();
			},function(){
				$(this).parent().find('.form-tip').hide();
			});
		}

		$(window).resize(function(){
			self.wd_resize();
		})
		$(window).load(function(){
		})
	}

	this.map_option = function(){
		// move map
		if($('#case-study').length > 0){
			nice_map = $('#case-study').niceScroll({
				touchbehavior: true,
				cursorcolor: 'none',
				background: 'none',
				cursorborder: 'none'
			}).scrollend(function(info){
				map_oftop = info.current.y;
				map_opleft = info.current.x;
			});
			map_oftop = nice_map.getScrollTop();
			map_opleft = nice_map.getScrollLeft();
		}
		// end move map
		var zo = 0;
		var map_border = $('.introduction');
		var zo_map =[
			["map0", 1440, 1456],
			["map1", 1000, 1001],
			["map2", 500, 506]
		];
		$('#zoomInButton').on('click',function(){
			if(zo>0){
		   		zo --;
	    		$('#introduction').css({width: zo_map[zo][1], height: zo_map[zo][2]})
	    		$('.bg img').attr('src','images/bg/'+zo_map[zo][0]+'.jpg');
	    		$('#case-study').getNiceScroll().resize();
	   		}
	   		if(zo_map[zo][1] < show_map_w){
	   			$('#case-study').width(zo_map[zo][1]);
	   		}else{
	   			$('#case-study').width('100%');
	   		}
	        bd_map = parseInt($('#case-study').offset().left);
	    });

	    $('#zoomOutButton').on('click',function(){
	   		if(zo<2){
		   		zo ++;
	    		$('#introduction').css({width: zo_map[zo][1], height: zo_map[zo][2]})
	    		$('.bg img').attr('src','images/bg/'+zo_map[zo][0]+'.jpg');
	    		$('#case-study').getNiceScroll().resize();
	   		}

	   		if(zo_map[zo][1] < map_w){
	   			$('#case-study').width(zo_map[zo][1]);
	   		}
	        bd_map = parseInt($('#case-study').offset().left);
	    });

	}

	this.select_food = function(){
		$("#accordion-food .accordion:not(:first)").hide();
		var $tt_accor = $("#accordion-food h3");
		$tt_accor.click(function(){
			var $this = $(this);
			$tt_accor.removeClass('active');
			$this.addClass('active');
			$accordion = $this.next();

			if ($accordion.is(':hidden') === true) {
			$("#accordion-food .accordion").slideUp();
				$accordion.slideDown(function(){
					$(".food-scroll .wrap-left").getNiceScroll().resize();
				});
			}
		});

		// chon thuc an

		$('.list-img-food').click(function(){
			var $this = $(this)
			var html = $this.html();
			if($('.foot-selected ul li:eq(0)').html()==''){
				$('.foot-selected ul li:eq(0)').html('<a href="javascript: void(0);" class="remove-food"></a>'+html);
			}else if($('.foot-selected ul li:eq(1)').html()==''){
				$('.foot-selected ul li:eq(1)').html('<a href="javascript: void(0);" class="remove-food"></a>'+html);
			}else{
				alert('Bạn chỉ được chọn 2 món ăn!');
				return false;
			}
		})
		$('.remove-food').live('click', function(){
			$(this).parent().html('');
		})
		$('.list-food .num-up').click(function(){
			var $this=$(this);
			var val = $this.parent().prev('.value').text();
			val++;
			$this.parent().prev('.value').text(val);
		})
		$('.list-food .num-do').click(function(){
			var $this=$(this);
			var val = $this.parent().prev('.value').text();
			val--;
			if(val==0)
				return false;
			$this.parent().prev('.value').text(val);
		})
	}

	this.selectbox = function(){
		$('.group-select div').click(function(){
			$('.group-select .select-op').slideToggle()
			nice_left;
		})
		$('.group-select .select-op a').click(function(){
			var $this = $(this);
			var value = $this.text();
			$('.group-select div.op').text(value);
		})
	}

	this.wd_resize = function(){
		w_ = $(window).width();
		h_ = $(window).height();
		h_in = h_ - 64;
		if(!tick_detail){
			$('.step2-5-2-detail').css({height: h_in, top: 0});
		}else{
			$('.step2-5-2-detail').css({height: h_in, top: -h_in});
		}
		// $('#accordion-food .accordion').height(h_-537);
	}

	this.animate = function(){
		$('.place-name').hover(function(){
			var $this = $(this);
			$this.find('.btn-place').stop().animate({opacity: 1});
			$this.find('.name').stop().animate({opacity: 0});
		}, function(){
			$('.place-name .btn-place').stop().animate({opacity: 0});
			$('.place-name .name').stop().animate({opacity: 1});
		})

		$('.day-select').hover(function(){
			var $this = $(this);
			$this.find('.tt').stop().stop().animate({opacity: 0});
			$this.find('.calendar').stop().animate({top: 15});
			$this.find('.btn-place').stop().animate({opacity: 1});
		}, function(){
			$('.day-select .calendar').stop().animate({top: 44})
			$('.day-select .btn-place').stop().animate({opacity: 0});
			$('.day-select .tt').stop().animate({opacity: 1});
		})

		$('.per-year').hover(function(){
			var $this = $(this);
			$this.find('.note').stop().animate({opacity: 0});
			$this.find('.btn-place').stop().animate({opacity: 1});
		}, function(){
			$('.per-year .note').stop().animate({opacity: 1});
			$('.per-year .btn-place').stop().animate({opacity: 0});
		})
	}

	this.step = function(){
		self.select_place();
		self.select_date();
		self.select_yearold();
		self.choose_payment();

		$('.form-input.food').click(function(){
			self.step_animate(2, '#select-food', 'right', '-270');
		})
		$('.btn-fnfood').click(function(){
			self.step_animate(2, '#select-food', 'right', '0');	
		})


		$('.btn-find-flights').click(function(){
				self.step_animate(1, '#content-left-step2', 'left', '0', '#content-left', 'left', '-430');
		})

		$('.choose-next').click(function(){
			// alert(step_choose)
			if(step_choose ==1){
				self.step_animate(2, '.step2-layout1', 'left', '-776');
				step_choose++;
				return false;
			}

			if(step_choose ==2){
				self.step_animate(1, '#content-left-step2', 'left', '-776', '#content-left-step2-3', 'left', '0');
				step_choose++;
				return false;
			}

			if(step_choose ==3){
				$('.add-per-info-sevices').html($('.gr-list-customer').html());
				self.step_animate(1, '#content-left-step2-3', 'left', '-776', '#content-left-step2-5', 'left', '0');
				step_choose++;
				return false;
			}

			if(step_choose ==4){
				self.step_animate(2, '#select-food', 'right', '0');
				self.step_animate(1, '#content-left-step2-5', 'left', '-700', '#content-left-step2-5-1', 'left', '0');
				step_choose++;
				return false;
			}

			if(step_choose ==5){
				self.step_animate(1, '#content-left-step2-5-1', 'left', '-700', '#content-left-step2-6', 'left', '0');
				step_choose++;
				return false;
			}

			if(step_choose ==6){
				self.step_animate(1, '#content-left-step2-6', 'left', '-700', '#content-left-payment', 'left', '0');
				var index = $('.gr-payselect .a-option a.active').parent().index();
				$('.pay-group .payment-choose:eq('+index+')').stop().animate({right: -430});
				if($(".show-bill").is(':checked')){
					self.step_animate(2, '.bill-world', 'right', '-430');
				}
				step_choose++;
				return false;
			}
			if(step_choose ==7){
				self.step_animate(2, '.bill-world', 'right', '0');
				self.step_animate(1, '#content-left-payment', 'left', '-270', '#content-left-confirm', 'left', '0');
				$('.pay-group .payment-choose').stop().animate({right: 0});

				var index = $('.gr-confirmselect .a-option a.active').parent().index();

				if(index==4){
					$('.confirm-group .bank-user:eq('+index+')').stop().animate({right: -700});
				}else{
					$('.confirm-group .bank-user:eq('+index+')').stop().animate({right: -430});
				}
				step_choose++;
				return false;
			}

		})
		// 
		$('.choose-prev').click(function(){
			if(step_choose ==1){
				self.step_animate(1, '#content-left', 'left', '0', '#content-left-step2', 'left', '-776');
				return false;
			}
			if(step_choose ==2){
				self.step_animate(2, '.step2-layout1', 'left', '0');
				step_choose--;
				return false;
			}
			if(step_choose ==3){
				self.step_animate(1,  '#content-left-step2-3', 'left', '-776', '#content-left-step2', 'left', '0');
				step_choose--;
				return false;
			}
			if(step_choose ==4){
				self.step_animate(2, '#select-food', 'right', '0');
				self.step_animate(1,  '#content-left-step2-5', 'left', '-700', '#content-left-step2-3', 'left', '0');
				step_choose--;
				return false;
			}
			if(step_choose ==5){
				self.step_animate(1, '#content-left-step2-5-1', 'left', '-700', '#content-left-step2-5', 'left', '0');
				step_choose--;
				return false;
			}
			if(step_choose ==6){
				self.step_animate(1, '#content-left-step2-6', 'left', '-700', '#content-left-step2-5-1', 'left', '0');
				step_choose--;
				return false;
			}
			if(step_choose ==7){
				self.step_animate(1, '#content-left-payment', 'left', '-270', '#content-left-step2-6', 'left', '0');
				$('.pay-group .payment-choose').stop().animate({right: 0});
				self.step_animate(2, '.bill-world', 'right', '0');
				step_choose--;
				return false;
			}
			if(step_choose ==8){
				self.step_animate(1, '#content-left-confirm', 'left', '-270', '#content-left-payment', 'left', '0');
				$('.confirm-group .bank-user').stop().animate({right: 0});
				var index = $('.gr-payselect .a-option a.active').parent().index();
				$('.pay-group .payment-choose:eq('+index+')').stop().animate({right: -430});
				step_choose--;
				return false;
			}
		})
	}

	this.step_animate = function(kind, id1, ani1, n1, id2, ani2, n2){
		var prop1 = {};
		var prop2 = {};
		prop1[ani1] = n1;
		prop2[ani2] = n2;

		switch (kind){
		case 2:
			$(id1).stop().animate(prop1)
			break;
		default:
			$(id1).stop().animate(prop1);
			$(id2).stop().animate(prop2);
			break;
		}
	}

	this.add_customer = function(){
		var add_per =  $('.step2-addpass a');
		$('.step2-listpass.info ul li a').live('click', function(){
			var per = $('.step2-listpass.info ul li a');	
			var $this = $(this);
			var num_cus = $this.parent().index()+1;
			per.removeClass('active');
			$this.addClass('active');

			if($this.hasClass('customer')){
				if($('.per-customer').is(':hidden')){
					$('.per-contact').fadeOut(100);
					$('.per-customer').fadeIn(100, function(){
						$(".step2-2-inforpass .scroll-pass").getNiceScroll().resize();
					});
				}
				$('.per-customer .step2-title .num').text(num_cus);
			}else{
				if($('.per-contact').is(':hidden')){
					$('.per-customer').fadeOut(100);
					$('.per-contact').fadeIn(100,function(){
						$(".step2-2-inforpass .scroll-pass").getNiceScroll().resize();
					});
				}
			}
		})

		add_per.click(function(){
			num_cus = $('.gr-list-customer li').size()+1;
			var row = (num_cus%2)+1;
			// alert(num_cus);
			$('.gr-list-customer').append('<li class="row-'+row+'"><a href="javascript:void(0)" title="" class="customer" data="customer'+num_cus+'">Hành khách '+num_cus+'</a></li>');
			$(".step2-listpass > div").getNiceScroll().resize();
		})
	}

	this.confirm_cus = function(){
		$('.list-perinfo.confirm li a').live('click', function(){
			var per = $('.list-perinfo.confirm li a');	
			var $this = $(this);
			var num_cus = $this.parent().index();
			per.removeClass('active');
			$this.addClass('active');

			if($this.hasClass('customer')){
				if($('.confirm-cus').is(':hidden')){
					$('.confirm-contact').fadeOut(100);
					$('.confirm-cus').fadeIn(100, function(){
						$("#step2-7-inforpass .scroll-pass").getNiceScroll().resize();
					});
				}
				$('.confirm-cus .confirm-cus-title span.num').text(num_cus+1);
			}else{
				if($('.confirm-contact').is(':hidden')){
					$('.confirm-cus').fadeOut(100);
					$('.confirm-contact').fadeIn(100,function(){
						$("#step2-6-inforpass .scroll-pass").getNiceScroll().resize();
					});
				}
			}
		})
	}

	this.choose_payment = function(){

		$('.gr-payselect .a-option a').click(function(){
			var $this=$(this);
			var index = $this.parent().index();
			$('.gr-payselect .a-option a').removeClass('active');
			$this.addClass('active');
			$('.pay-group .payment-choose').stop().animate({right: 0});
			$('.pay-group .payment-choose:eq('+index+')').stop().animate({right: -430});
		})

		$(".show-bill").change(function() {
		    if(this.checked) {
		        self.step_animate(2, '.bill-world', 'right', '-430');
		    }else{
		    	self.step_animate(2, '.bill-world', 'right', '0');
		    }
		});

		var local = true
		$('.btn-view-local').click(function(){
			if(local) {
				local=false;
		        self.step_animate(2, '.card-vn .bank-user', 'right', '-430');
		    }else{
		    	self.step_animate(2, '.card-vn .bank-user', 'right', '0');
		    	local=true;
		    }
		})

		$('.bank-user .btn-close').click(function(){
			self.step_animate(2, '.bank-user.intro-pay', 'right', '0');
		    local=true;
		})
		$('.confirm-group .bank-user .btn-close').click(function(){
			$('.gr-confirmselect .a-option a').removeClass('active');
		})
		

		// confirm payment
		$('.gr-confirmselect .a-option a').click(function(){
			var $this=$(this);
			var index = $this.parent().index();
			$('.gr-confirmselect .a-option a').removeClass('active');
			$this.addClass('active');
			$('.confirm-group .bank-user').stop().animate({right: 0});
			if(index==4){
				$('.confirm-group .bank-user:eq('+index+')').stop().animate({right: -700});
			}else{
				$('.confirm-group .bank-user:eq('+index+')').stop().animate({right: -430});
			}
		})
	}

	this.select_place = function(){
		var btn = $('.btn-change-place');
		var list_place = $('#select-place');
		var place_select =  $('.list-place li a');
		btn.click(function(){
			sub_step1.stop().animate({right: 0});
			list_place.stop().animate({right: -270});
			var $this = $(this);
			if($this.hasClass('btn-from')){
				place = '.trip-from';
			}else{
				place = '.trip-to';
			}
		})
		place_select.click(function(){
			sub_step1.stop().animate({right: 0});
			var $that =  $(this);
			var symbol = $that.find('.symbol').text();
			var pl = $that.find('.place').text();
			$(place+' .character').text(symbol);
			$(place+' .name').text(pl);
		});
	}

	this.select_date = function(){
		var btn_date = $('.btn-change-date');
		var list_date = $('#select-day');
		btn_date.click(function(){
			var $this = $(this);
			sub_step1.stop().animate({right: 0});
			list_date.stop().animate({right: -270});
			if($this.hasClass('date-depart')){
				date_select = '.depart';
			}else{
				date_select = '.return';
			}
		})
	}

	this.get_date = function(value, time){
		if(value=='0'){
	        var selDay = time.getDate();
	        var selMonth = time.getMonth()+1;
	        var selYear = time.getFullYear();
	        $('#day-trip .day').text(selDay);
	        $('#day-trip .m span').text(selMonth);
	        $('#day-trip .y span').text(selYear);
		    startDate = time;
			endDate = time;
		}else{
			// if(time<now){
			// 	alert('Thông báo! Ngày bạn chọn không có dữ liệu!!!')
			// 	return false;
			// }else if(date_select == '.depart'){
			// 	startDate = time;
			// 	if(startDate > endDate){
			// 		alert('Thông báo! Ngày đi phải trước ngày về.')
			// 		return false;
			// 	}
			// }else{
			// 	endDate = time;
			// 	if(startDate > endDate){
			// 		alert('Thông báo! Ngày về phải sau ngày đi.')
			// 		return false;
			// 	}
			// }
			var selDay = time.getDate();
	        var selMonth = time.getMonth()+1;
	        var selYear = time.getFullYear();
	        $('#day-trip '+date_select+' .day').text(selDay);
	        $('#day-trip '+date_select+' .m span').text(selMonth);
	        $('#day-trip '+date_select+' .y span').text(selYear);		
		}
	    sub_step1.stop().animate({right: 0});
	}

	this.select_yearold = function(){
		var max=100;
		var min=0;
		$('.up-yo').click(function(){
			var $this = $(this);
			var class_old = $this.attr('data');
			var curent = $this.parent().parent(); 
			var value = curent.find('.num').text();
			if(value>=max)
				return false;
			value++;
			curent.find('.num').text(value);
		})
		$('.do-yo').click(function(){
			var $this = $(this);
			var class_old = $this.attr('data');
			var curent = $this.parent().parent(); 
			var value = curent.find('.num').text();
			if(value<=min)
				return false;
			value--;
			curent.find('.num').text(value);
		})
	}
}
Page= new Page();
$(document).ready(function(){
	Page.init();
});