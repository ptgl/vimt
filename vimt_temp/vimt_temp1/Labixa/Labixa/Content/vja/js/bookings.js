$(document).ready(function () {
    // $('#jmap').remove();
})
//var $destinations = $("ul.cities li.city");
var place, date_select, startDate, endDate, time1, time2, time_w, time_w1, num_cus, move_place, timing;
var w_ = $(window).width();
var h_ = $(window).height();
var h_in = h_ - 64;
var body = $("html, body");
var nice_left = false;
var tick_detail = false;
var hder = true;
var hder_click = true;
var sub_step1 = $('.sub_step1');
var now = new Date();
var step_choose = 1;
var foodgo = true, cb = false;
var food_sl = '.go-food';
var one_direc = false;
var map_h = $('#case-study').height()
var map_w = $('#case-study').width()
var show_map_w = $('.wrapper').width();
var jgt = 30, mx = 0, my = 0, set_h = 0;

function Page() {
    var self = this;

    this.init = function () {
        self.jquery();
        self.set_height();
        self.animate();
        self.step();
        self.select_seat();
        //Disable this functions
        // self.map_option();
        //self.add_customer();
        //self.confirm_cus();
        //self.get_date(0, now);
        if ($('#class-ticket').length > 0) {
            self.selectbox();
        }

        //if ($('.list-food').length > 0) {
        //    self.select_food();
        //}
    };
    this.formattedDate = function (date) {
        var d = new Date(date || Date.now()),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
    }

    this.jquery = function (e) {
        // ticket-info
        $('.radio_se').uniform();
        $('.step2-5-2-detail').css({ height: h_in });
        $('.open-detail').click(function () {
            if (!tick_detail) {
                tick_detail = true;
                $('.step2-5-2-detail').stop().animate({ top: -h_in });
                $('.open-detail').hide();
            }
        })
        $('.btn-close-detail').click(function () {
            if (tick_detail) {
                tick_detail = false;
                $('.step2-5-2-detail').stop().animate({ top: 0 });
                $('.open-detail').show();
            }
        })
        // end ticket-info
        // open header
        $('.choose-mid').click(function () {
            if (hder) {
                $('#header-booking').animate({ top: 0 });
                hder = false;
                hder_click = false;
            } else {
                $('#header-booking').animate({ top: -60 });
                hder = true;
            }
        })
        $("body").mousemove(function (event) {
            var x_ = event.pageX;
            var y_ = event.pageY;
            if (hder_click) {
                if (y_ < 20) {
                    if (hder) {
                        $('#header-booking').animate({ top: 0 });
                        hder = false;
                    }
                }
                if (y_ > 100) {
                    if (!hder) {
                        $('#header-booking').animate({ top: -60 });
                        hder = true;
                    }
                }
            }
            $('#header-booking').mouseover(function () {
                hder_click = true;
            })
        });

        //if ($('.js-selectbox').length > 0) {
        //    $('.js-selectbox').selectbox({
        //        onOpen: function (inst) {
        //            $(".nice-scroll").getNiceScroll().resize();
        //        },
        //        onClose: function (inst) {
        //            $(".nice-scroll").getNiceScroll().resize();
        //        }
        //    });
        //}

        if ($('.list-day').length > 0) {
            //$(".list-day").datepicker({
            //    showOtherMonths: true,
            //    numberOfMonths: 5,
            //    dayNamesMin: ["", "", "", "", "", "", ""],
            //    onSelect: function (dateText, inst) {
            //        var day_select = new Date(dateText);
            //        self.get_date(1, day_select);
            //    }
            //});
            $("div.ui-datepicker-header a.ui-datepicker-prev,div.ui-datepicker-header a.ui-datepicker-next").hide();
        }
        // scroll

        if ($('.nice-scroll2').length > 0) {
            nice_ticket = $(".nice-scroll2").niceScroll({
                cursorborder: "",
                cursorcolor: "#333333",
                autohidemode: false,
                background: "#bbb",
                railpadding: { top: 0, right: 4, left: 0, bottom: 0 },
                cursorwidth: "6px"
            });
        }

        if ($('.nice-scroll').length > 0) {
            nice_payment = $(".nice-scroll").niceScroll({
                cursorborder: "",
                cursorcolor: "#e9e9e6",
                autohidemode: false,
                background: "#242424",
                railpadding: { top: 0, right: 4, left: 0, bottom: 0 },
                cursorwidth: "6px"
            });
        }
        // end scroll
        $('.chart .point').click(function () {
            $(this).find('.point_date').show().addClass('active')
        });

        if ($('.step2-flight-infor').length > 0) {
            $('.step2-flight-infor.go table td.row').live('click', function () {
                $('.step2-flight-infor.go table td').removeClass('active');
                $(this).addClass('active');
            });
            $('.step2-flight-infor.back table td.row').live('click', function () {
                $('.step2-flight-infor.back table td').removeClass('active');
                $(this).addClass('active');
            });
        }

        if ($('.iCheck').length > 0) {
            $(".iCheck").uniform();
        }
        if ($('.iCheck-2').length > 0) {
            $(".iCheck-2").uniform();
        }

        var h_tong = $(window).height() - 60;
        var h_info = $('.flight-money-infor').height();
        $('.hv-tt-info .tt-pri').hover(function () {
            clearTimeout(time1);
            var $this = $(this);
            var idx = $this.index() - 1;
            var offset = $this.offset();
            $('.tt-infor .flight-money-infor').css({ 'display': 'none' });
            $('.tt-infor .flight-money-infor:eq(' + idx + ')').css({ top: offset.top - 4, left: offset.left + 152, 'display': 'block' });
        }, function () {
            time1 = setTimeout(function () {
                $('.tt-infor .flight-money-infor').css({ 'display': 'none' });
            }, 300);
        });
        $('.tt-infor .flight-money-infor').hover(function () {
            clearTimeout(time1);
        }, function () {
            $('.tt-infor .flight-money-infor').css({ 'display': 'none' });
        })
        // if ($('.step2-flight-infor').length > 0){
        // 	$('.step2-flight-infor td.row').hover(function(){
        // 		clearTimeout(time1);
        // 		var $this = $(this);
        // 		var w_width = $(this).width();
        // 		var w_height = $(this).height()*2;
        // 		var w_left = $(this).offset().left;
        // 		var w_top = $(this).offset().top -4 ;
        // 		var w_left_all = w_left + w_width;
        // 		if((h_info+w_top)<h_tong){
        // 			$('.flight-money-infor').attr('style', '');
        // 			$('.flight-money-infor img.arrow').attr('style', '');
        // 			$('.flight-money-infor img.arrow').css({top: 37});
        // 			$('.flight-money-infor').css({top: w_top, left: w_left_all,'display':'block'});
        // 		}else{
        // 			$('.flight-money-infor').attr('style', '');
        // 			$('.flight-money-infor img.arrow').attr('style', '');
        // 			$('.flight-money-infor img.arrow').css({bottom: 11});
        // 			$('.flight-money-infor').css({bottom: (h_tong - w_top - w_height - 4 + 60), left: w_left_all,'display':'block'});
        // 		}
        // 	},function(){
        // 		time1 = setTimeout(function(){
        // 			$('.flight-money-infor').css({'display':'none'});
        // 		},500);
        // 	});
        // 	$('.flight-money-infor').hover(function(){
        // 		clearTimeout(time1);
        // 	}, function(){
        // 		time1
        // 		$('.flight-money-infor').css({'display':'none'});
        // 	})
        // }

        if ($('.form-input').length > 0) {
            $('.form-input > img').hover(function () {
                $(this).parent().find('.form-tip').show();
            }, function () {
                $(this).parent().find('.form-tip').hide();
            });
        }

        if ($('.form-select').length > 0) {
            $('.form-select > img').hover(function () {
                $(this).parent().find('.form-tip').show();
            }, function () {
                $(this).parent().find('.form-tip').hide();
            });
        }

        if ($('.warning').length > 0) {
            $('.warning').hover(function () {
                clearTimeout(time_w);
                clearTimeout(time_w1);
                var h_win = $(window).height
                var war_t = $(this).offset().top;
                var war_l = $(this).offset().left;
                var war_h = $('.warning-escape').height();
                var war_w = $('.warning-escape').width();
                var war_st = war_t - war_h - 13;
                var war_sl = war_l - war_w + 248;
                $('.bell-circle').css({ 'display': 'block', 'bottom': '-7px' });
                $('.bell-circle1').css({ 'display': 'none' });
                $('.warning-escape').css({ 'display': 'block', 'top': war_st, 'left': war_sl });
                var war_ot = $('.warning-escape').offset().top;
                if (war_ot < 0) {
                    $('.bell-circle').css({ 'display': 'none' });
                    $('.bell-circle1').css({ 'display': 'block', 'bottom': war_h });
                    $('.warning-escape').css({ 'display': 'block', 'top': war_t + 33, 'left': war_sl });
                }
            }, function () {
                time_w1 = setTimeout(function () {
                    $('.warning-escape').css({ 'display': 'none' });
                }, 400);
            });
            $('.warning-escape').hover(function () {
                clearTimeout(time_w1);
                var $this = $(this);
                $(this).show();
            }, function () {
                var $this = $(this);
                time_w = setTimeout(function () {
                    $this.css({ 'display': 'none' });
                }, 400);
            });
        }

        $(window).resize(function () {
            self.wd_resize();
        })
        //Basic point, can delete ?
        $(window).load(function () {
           // $('#case-study .cities').append('<li class="component-destination city HCM" data-click=".click_hcm" data-city="Hồ Chí Minh" data-price="<span>199</span> 000 VNĐ"><div class="indicator"></div></li><li class="component-destination city HAN" data-click=".click_hanoi" data-city="Hà Nội" data-price="<span>199</span> 000 VNĐ"><div class="indicator"></div></li><li class="component-destination city DAD" data-click=".click_danang" data-city="Đà Nẵng" data-price="<span>199</span> 000 VNĐ"><div class="indicator"></div></li><li class="component-destination city CXR" data-click=".click_nhatrang" data-city="Nha Trang" data-price="<span>199</span> 000 VNĐ"><div class="indicator"></div></li><li class="component-destination city HPH" data-click=".click_haiphong" data-city="Hải Phòng" data-price="<span>199</span> 000 VNĐ"><div class="indicator"></div></li><li class="component-destination city HUE" data-click=".click_hue" data-city="Huế" data-price="<span>199</span> 000 VNĐ"><div class="indicator"></div></li><li class="component-destination city VII" data-click=".click_vinh" data-city="Vinh" data-price="<span>199</span> 000 VNĐ"><div class="indicator"></div></li><li class="component-destination city PQC" data-click=".click_phuquoc" data-city="Phú Quốc" data-price="<span>199</span> 000 VNĐ"><div class="indicator"></div></li><li class="component-destination city DLI" data-click=".click_dalat" data-city="Đà Lạt" data-price="<span>199</span> 000 VNĐ"><div class="indicator"></div></li><li class="component-destination city BMV" data-click=".click_bmt" data-city="Buôn Ma Thuột" data-price="<span>199</span> 000 VNĐ"><div class="indicator"></div></li><li class="component-destination city UIH" data-click=".click_quynhon" data-city="Quy Nhơn" data-price="<span>199</span> 000 VNĐ"><div class="indicator"></div></li><li class="component-destination city VCA" data-click=".click_cantho" data-city="Cần Thơ" data-price="<span>199</span> 000 VNĐ"><div class="indicator"></div></li>');
        })
    }

    this.select_seat = function () {
        $('.choose-seat').find('a').click(function () {
            var $this = $(this);
            if (!$this.hasClass('active')) {
                if (!$this.hasClass('selected')) {
                    $this.addClass('selected');
                } else {
                    $this.removeClass('selected');
                }
            }
        })
    }

    this.select_food = function () {
        $("#accordion-food .accordion:not(:first)").hide();
        var $tt_accor = $("#accordion-food h3");
        $tt_accor.click(function () {
            var $this = $(this);
            $tt_accor.removeClass('active');
            $this.addClass('active');
            $accordion = $this.next();

            if ($accordion.is(':hidden') === true) {
                $("#accordion-food .accordion").slideUp();
                $accordion.slideDown(function () {
                    $(".food-scroll .wrap-left").getNiceScroll().resize();
                });
            }
        });

        // chon thuc an
        var num1 = ''; num2 = ''; name1 = '', name2 = '', text11 = '', text12 = '';
        var num21 = ''; num22 = ''; name21 = '', name22 = '', text21 = '', text22 = '';
        $('.list-img-food').click(function () {
            var $this = $(this)
            var html = $this.html();
            if ($('ul' + food_sl + ' li:eq(0)').html() == '') {
                $('ul' + food_sl + ' li:eq(0)').html('<a href="javascript: void(0);" class="remove-food"></a>' + html);

                num1 = $this.parent().next().next().find('.value').text();
                name1 = $this.parent().next().find('.name').text();
                if (foodgo) {
                    text11 = num1 + ": " + name1;
                } else {
                    text21 = num1 + ": " + name1;
                }
            } else if ($('ul' + food_sl + ' li:eq(1)').html() == '') {
                $('ul' + food_sl + ' li:eq(1)').html('<a href="javascript: void(0);" class="remove-food"></a>' + html);
                num2 = $this.parent().next().next().find('.value').text();
                name2 = $this.parent().next().find('.name').text();
                if (foodgo) {
                    text12 = num2 + ": " + name2;
                } else {
                    text22 = num2 + ": " + name2;
                }
            } else {
                alert('Bạn chỉ được chọn 2 món ăn!');
                return false;
            }
            if (foodgo) {
                $('.foodgo').text(text11 + ", " + text12);
            } else {
                $('.foodback').text(text21 + ", " + text22);
            }
        })
        $('.remove-food').live('click', function () {
            $this = $(this);
            var ii = $this.parent().index();
            if (ii == 0) {
                if (foodgo) {
                    text11 = '';
                } else {
                    text21 = '';
                }
            } else {
                if (foodgo) {
                    text12 = '';
                } else {
                    text22 = '';
                }
            }

            if (foodgo) {
                $('.foodgo').text(text11 + ", " + text12);
            } else {
                $('.foodback').text(text21 + ", " + text22);
            }

            $(this).parent().html('');
        })
        $('.list-food .num-up').click(function () {
            var $this = $(this);
            var val = $this.parent().prev('.value').text();
            val++;
            $this.parent().prev('.value').text(val);
        })
        $('.list-food .num-do').click(function () {
            var $this = $(this);
            var val = $this.parent().prev('.value').text();
            val--;
            if (val == 0)
                return false;
            $this.parent().prev('.value').text(val);
        })
    }

    this.selectbox = function () {
        $('.group-select div').click(function () {
            $('.group-select .select-op').slideToggle(function () {
                $(".scroll-inline .nice-scroll2").getNiceScroll().resize();
            })
            nice_left;
        })
        $('.group-select .select-op a').click(function () {
            var $this = $(this);
            var value = $this.text();
            $('.group-select div.op').text(value);
            $(".scroll-inline .nice-scroll2").getNiceScroll().resize();
        })
    }

    this.set_height = function () {

        if ($('#my-ticket-step2 .info-flight').size() == 2) {
            $('.list-checkin.show_scroll').css({ 'padding-bottom': 452 });
        } else {
            $('.list-checkin.show_scroll').css({ 'padding-bottom': 299 });
        }

        if (one_direc) {
            set_h = 55;
            $('.accor-servive').height($('.form-servive .border-box').height() - 60);
        } else {
            set_h = 112;
            $('.accor-servive').height($('.form-servive .border-box').height() - 120);
        }

        $('.chart').height($('.step2-layout1 .border-box').height() - set_h);
        $('.step2-flight-accor').height($('.step2-layout1 .border-box').height() - set_h);
        $('.accor-list').height($('.seat_select .border-box').height() - set_h);
        $('.accor-confirm-info').height($('.confirm-info .border-box').height() - set_h);
        $('.flight-detail-all').height($('.infobox .border-box').height() - set_h);
        $('#step2-7-inforpass').hide();

        self.add_accordion('.step2-layout1', '.chart');
        self.add_accordion('.step2-layout2', '.step2-flight-accor');
        self.add_accordion('.form-servive', '.accor-servive');
        self.add_accordion('.seat_select', '.accor-list');
        self.add_accordion('.confirm-info', '.accor-confirm-info');
        self.add_accordion('.infobox', '.flight-detail-all');
        $(".nice-scroll").getNiceScroll().resize();
    }

    this.add_accordion = function (a, b) {
        $(a + ' .step2-move').click(function () {
            var $this = $(this);
            if (!$this.hasClass('active')) {
                $(a + ' .nice-scroll').getNiceScroll().hide();
                $(a + ' .step2-move').removeClass('active');
                $this.addClass('active');

                $(b).slideUp();
                $this.next(b).slideDown(function () {
                    $this.next(b).find('.nice-scroll').getNiceScroll().show().resize();
                });

                if (a == '.form-servive') {
                    if ($this.index() == 0) {
                        //foodgo = true;
                        //$('.go-food').show();
                        //$('.back-food').hide();
                        //food_sl = '.go-food';

                        self.step_animate(2, '#select-food', 'right', '-270');
                        self.step_animate(2, '#select-food-2', 'right', '0');
                    } else {
                        //foodgo = false;
                        //$('.go-food').hide();
                        //$('.back-food').show();
                        //food_sl = '.back-food';
                        self.step_animate(2, '#select-food', 'right', '0');
                        self.step_animate(2, '#select-food-2', 'right', '-270');
                    }
                }

                if (a == '.step2-layout1') {
                    if ($this.index() == 0) {
                        cb = false;
                    } else {
                        cb = true;
                    }
                }

            }
        })

    }

    this.wd_resize = function () {
        self.set_height();
        w_ = $(window).width();
        h_ = $(window).height();
        h_in = h_ - 64;
        if (!tick_detail) {
            $('.step2-5-2-detail').css({ height: h_in, top: 0 });
        } else {
            $('.step2-5-2-detail').css({ height: h_in, top: -h_in });
        }
        // $('#accordion-food .accordion').height(h_-537);
    }

    this.animate = function () {
        $('.place-name').hover(function () {
            var $this = $(this);
            $this.find('.btn-place').stop().animate({ opacity: 1 });
            $this.find('.name').stop().animate({ opacity: 0 });
        }, function () {
            $('.place-name .btn-place').stop().animate({ opacity: 0 });
            $('.place-name .name').stop().animate({ opacity: 1 });
        })

        $('.day-select').hover(function () {
            var $this = $(this);
            $this.find('.tt').stop().stop().animate({ opacity: 0 });
            $this.find('.calendar').stop().animate({ top: 15 });
            $this.find('.btn-place').stop().animate({ opacity: 1 });
        }, function () {
            $('.day-select .calendar').stop().animate({ top: 35 })
            $('.day-select .btn-place').stop().animate({ opacity: 0 });
            $('.day-select .tt').stop().animate({ opacity: 1 });
        })

        $('.per-year').hover(function () {
            var $this = $(this);
            $this.find('.note').stop().animate({ opacity: 0 });
            $this.find('.btn-place').stop().animate({ opacity: 1 });
        }, function () {
            $('.per-year .note').stop().animate({ opacity: 1 });
            $('.per-year .btn-place').stop().animate({ opacity: 0 });
        })
    }
    this.rs = function (a) {
        $('.tabs-left > div ').attr('style', '');
        $('.tabs-left > div > div').attr('style', '');
        $('.tabs-left > div > div > div').attr('style', '');
        if (a == 1) {
            $('#content-left').css({ left: -430 });
        }
    }
    this.active_hd = function (a) {
        $('#header-booking .right li').removeClass('active');
        $('#header-booking .right li').eq(a).addClass('active');
    }

    this.step = function () {
        self.select_place();
        self.select_date();
        self.select_yearold();
        self.choose_payment();

        $('#header-booking .right li').click(function () {
            var $this = $(this);
            if (!$this.hasClass('active')) {
                var index = $this.index();
                $('#header-booking .right li').removeClass('active');
                $this.addClass('active');
                switch (index) {
                    case 0:
                        self.rs();
                        self.step_animate(1, '#content-left', 'left', '0', '#content-left-step2', 'left', '-776');
                        step_choose == 1
                        $('.view-chart').hide();
                        break;
                    case 1:
                        self.rs(1);
                        self.step_animate(1, '#content-left-step2', 'left', '0', '#content-left', 'left', '-430');
                        self.step_animate(2, '.step2-layout1', 'left', '-776');
                        $('.view-chart').show();
                        step_choose = 2;
                        break;
                    case 2:
                        self.rs(1);
                        self.step_animate(1, '#content-left-step2', 'left', '-776', '#content-left-step2-3', 'left', '0');
                        step_choose = 3;
                        break;
                    case 3:
                        self.rs(1);
                        $('.add-per-info-sevices').html($('.gr-list-customer').html());
                        self.step_animate(1, '#content-left-step2-3', 'left', '-776', '#content-left-step2-5', 'left', '0');
                        step_choose = 4;
                        break;
                    case 4:
                        self.rs(1);
                        self.step_animate(2, '#select-food', 'right', '0');
                        self.step_animate(2, '#select-food-2', 'right', '0');

                        self.step_animate(1, '#content-left-step2-5', 'left', '-700', '#content-left-step2-5-1', 'left', '0');
                        step_choose = 5;
                        break;
                        // case 5:
                        // 	self.rs(1);
                        // 	self.step_animate(1, '#content-left-step2-5-1', 'left', '-970', '#content-left-step2-6', 'left', '0');
                        // 	step_choose = 6;
                        // 	break;
                    case 5:
                        self.rs(1);
                        self.step_animate(1, '#content-left-step2-6', 'left', '-700', '#content-left-payment', 'left', '0');
                        var index = $('.gr-payselect .a-option a.active').parent().index();
                        $('.pay-group .payment-choose:eq(' + index + ')').stop().animate({ right: -430 });
                        if ($(".show-bill").is(':checked')) {
                            self.step_animate(2, '.bill-world', 'right', '-430');
                        }
                        step_choose = 7;
                        break;
                    case 6:
                        self.rs(1);
                        self.step_animate(2, '.bill-world', 'right', '0');
                        self.step_animate(1, '#content-left-payment', 'left', '-270', '#content-left-confirm', 'left', '0');
                        $('.pay-group .payment-choose').stop().animate({ right: 0 });

                        var index = $('.gr-confirmselect .a-option a.active').parent().index();

                        if (index == 4) {
                            $('.confirm-group .bank-user:eq(' + index + ')').stop().animate({ right: -700 });
                        } else {
                            $('.confirm-group .bank-user:eq(' + index + ')').stop().animate({ right: -430 });
                        }
                        step_choose = 8;
                        break;
                }
            }
        })
        //Outbound
        $('.form-input.food').click(function () {
            self.step_animate(2, '#select-food-2', 'right', '0');
            self.step_animate(2, '#select-food', 'right', '-270');
        })
        $('.btn-fnfood').click(function () {
            self.step_animate(2, '#select-food', 'right', '0');
        })
        //Inbound
        $('.form-input.food-2').click(function () {
            self.step_animate(2, '#select-food', 'right', '0');
            self.step_animate(2, '#select-food-2', 'right', '-270');
        })
        $('.btn-fnfood-2').click(function () {
            self.step_animate(2, '#select-food-2', 'right', '0');
        })


        //$('.btn-find-flights').click(function () {
        //    var $this = $(this);
        //    self.active_hd(1);
        //    //Search cheap flight
        //    if ($this.hasClass('cheap')) {
        //        step_choose = 1;
        //        self.step_animate(1, '#content-left-step2', 'left', '0', '#content-left', 'left', '-430');
        //        self.step_animate(2, '.step2-layout1', 'left', '0');
        //    }
        //        //Search Flight
        //    else {
        //        self.step_animate(1, '#content-left-step2', 'left', '0', '#content-left', 'left', '-430');
        //        self.step_animate(2, '.step2-layout1', 'left', '-776');
        //        $('.view-chart').show();
        //        step_choose = 2;
        //    }
        //})

        $('.view-chart').click(function () {
            self.step_animate(2, '.step2-layout1', 'left', '0');
            $('.view-chart').hide();
            step_choose--;
            return false;
        })

        //$('.choose-next').click(function () {
        //    if (step_choose == 1) {
        //        self.step_animate(2, '.step2-layout1', 'left', '-776');
        //        $('.view-chart').show();
        //        step_choose++;
        //        return false;
        //    }

        //    if (step_choose == 2) {
        //        self.active_hd(step_choose);
        //        self.step_animate(1, '#content-left-step2', 'left', '-776', '#content-left-step2-3', 'left', '0');
        //        step_choose++;
        //        return false;
        //    }

        //    if (step_choose == 3) {
        //        self.active_hd(step_choose);
        //        //$('.add-per-info-sevices').html($('.gr-list-customer').html());
        //        self.step_animate(1, '#content-left-step2-3', 'left', '-776', '#content-left-step2-5', 'left', '0');
        //        step_choose++;
        //        return false;
        //    }

        //    if (step_choose == 4) {
        //        self.active_hd(step_choose);
        //        self.step_animate(2, '#select-food', 'right', '0');
        //        self.step_animate(1, '#content-left-step2-5', 'left', '-700', '#content-left-step2-5-1', 'left', '0');
        //        step_choose++;
        //        return false;
        //    }

        //    if (step_choose == 5) {
        //        self.step_animate(1, '#content-left-step2-5-1', 'left', '-970', '#content-left-step2-6', 'left', '0');
        //        step_choose++;
        //        return false;
        //    }

        //    if (step_choose == 6) {
        //        self.active_hd(step_choose - 1);
        //        self.step_animate(1, '#content-left-step2-6', 'left', '-700', '#content-left-payment', 'left', '0');
        //        var index = $('.gr-payselect .a-option a.active').parent().index();
        //        $('.pay-group .payment-choose:eq(' + index + ')').stop().animate({ right: -430 });
        //        if ($(".show-bill").is(':checked')) {
        //            self.step_animate(2, '.bill-world', 'right', '-430');
        //        }
        //        step_choose++;
        //        return false;
        //    }
        //    if (step_choose == 7) {
        //        self.active_hd(step_choose - 1);
        //        self.step_animate(2, '.bill-world', 'right', '0');
        //        self.step_animate(1, '#content-left-payment', 'left', '-270', '#content-left-confirm', 'left', '0');
        //        $('.pay-group .payment-choose').stop().animate({ right: 0 });

        //        var index = $('.gr-confirmselect .a-option a.active').parent().index();

        //        if (index == 4) {
        //            $('.confirm-group .bank-user:eq(' + index + ')').stop().animate({ right: -700 });
        //        } else {
        //            $('.confirm-group .bank-user:eq(' + index + ')').stop().animate({ right: -430 });
        //        }
        //        step_choose++;
        //        return false;
        //    }

        //})
        //// 
        //$('.choose-prev').click(function () {
        //    if (step_choose == 1 || step_choose == 2) {
        //        self.active_hd(0);
        //        self.step_animate(1, '#content-left', 'left', '0', '#content-left-step2', 'left', '-776');
        //        if (step_choose == 2) {
        //            step_choose--;
        //            $('.view-chart').hide();
        //        }
        //        return false;
        //    }
        //    // if(step_choose ==2){
        //    // 	self.step_animate(2, '.step2-layout1', 'left', '0');
        //    // 	$('.view-chart').hide();
        //    // 	step_choose--;
        //    // 	return false;
        //    // }
        //    if (step_choose == 3) {
        //        self.active_hd(step_choose - 2);
        //        $('.view-chart').show();
        //        self.step_animate(2, '.step2-layout1', 'left', '-776');
        //        self.step_animate(1, '#content-left-step2-3', 'left', '-776', '#content-left-step2', 'left', '0');
        //        step_choose--;
        //        return false;
        //    }
        //    if (step_choose == 4) {
        //        self.active_hd(step_choose - 2);
        //        self.step_animate(2, '#select-food', 'right', '0');
        //        self.step_animate(1, '#content-left-step2-5', 'left', '-700', '#content-left-step2-3', 'left', '0');
        //        step_choose--;
        //        return false;
        //    }
        //    if (step_choose == 5) {
        //        self.active_hd(step_choose - 2);
        //        self.step_animate(1, '#content-left-step2-5-1', 'left', '-970', '#content-left-step2-5', 'left', '0');
        //        step_choose--;
        //        return false;
        //    }
        //    if (step_choose == 6) {
        //        // self.active_hd(step_choose-1);
        //        self.step_animate(1, '#content-left-step2-6', 'left', '-700', '#content-left-step2-5-1', 'left', '0');
        //        step_choose--;
        //        return false;
        //    }
        //    if (step_choose == 7) {
        //        self.active_hd(step_choose - 3);
        //        self.step_animate(1, '#content-left-payment', 'left', '-270', '#content-left-step2-6', 'left', '0');
        //        $('.pay-group .payment-choose').stop().animate({ right: 0 });
        //        self.step_animate(2, '.bill-world', 'right', '0');
        //        step_choose--;
        //        return false;
        //    }
        //    if (step_choose == 8) {
        //        self.step_animate(1, '#content-left-confirm', 'left', '-270', '#content-left-payment', 'left', '0');
        //        $('.confirm-group .bank-user').stop().animate({ right: 0 });
        //        var index = $('.gr-payselect .a-option a.active').parent().index();
        //        $('.pay-group .payment-choose:eq(' + index + ')').stop().animate({ right: -430 });
        //        step_choose--;
        //        return false;
        //    }
        //})

        // Check-in
        $('.cancel_checkin').click(function () {
            self.step_animate(1, '#my-ticket-step1', 'left', '0', '#my-ticket-step5', 'left', '-434');
        })
        $('.enter_search').click(function () {
            self.step_animate(2, '#my-ticket-step1 .search_result', 'right', '-430');
        })
        $('#my-ticket-step1 .search_result .btn-close').click(function () {
            self.step_animate(2, '#my-ticket-step1 .search_result', 'right', '4');
        })
        $('.checkin .continue1').click(function () {
            self.step_animate(2, '#my-ticket-step1 .search_result', 'right', '4');
            self.step_animate(1, '#my-ticket-step1', 'left', '-274', '#my-ticket-step2', 'left', '0');
        })
        $('.checkin .continue2').click(function () {
            self.step_animate(1, '#my-ticket-step2', 'left', '-434', '#my-ticket-step3', 'left', '0');
        })
        $('.checkin .continue3').click(function () {
            self.step_animate(1, '#my-ticket-step3', 'left', '-704', '#my-ticket-step4', 'left', '0');
        })
        $('.checkin .continue4').click(function () {
            self.step_animate(1, '#my-ticket-step4', 'left', '-704', '#my-ticket-step5', 'left', '0');
        })
        $('.btn_print_ticket').click(function () {
            var timer = $('.timer');
            $('#loading').fadeIn();
            setTimeout(function () {
                $('.icon_loading').fadeOut();
                $('.popup_print_fn').fadeIn(function () {
                    timer.html(jgt);
                    timing = setInterval(function () {
                        jgt = jgt - 1;
                        timer.html(jgt);
                        if (jgt == 0) {
                            clearInterval(timing);

                            $('#loading').fadeOut();
                        }
                    }, 1000);
                })
            }, 3000)
        })
        // End check-in
    }
    // this.stime = function(){
    // 	jgt = jgt - 1;
    // 	$('.timer').html(jgt);
    // 	if(jgt == 0){
    // 		alert(1);
    // 		clearInterval(timing); 
    // 		alert('về trang chủ');
    // 	}
    // }

    this.step_animate = function (kind, id1, ani1, n1, id2, ani2, n2) {
        var prop1 = {};
        var prop2 = {};
        prop1[ani1] = n1;
        prop2[ani2] = n2;

        switch (kind) {
            case 2:
                $(id1).stop().animate(prop1)
                break;
            default:
                $(id1).stop().animate(prop1);
                $(id2).stop().animate(prop2);
                break;
        }
    }

    this.add_customer = function () {
        var add_per = $('.step2-addpass a');
        $('.step2-listpass.info ul li a').live('click', function () {
            var per = $('.step2-listpass.info ul li a');
            var $this = $(this);
            var num_cus = $this.parent().index() + 1;
            per.removeClass('active');
            $this.addClass('active');

            if ($this.hasClass('customer')) {
                if ($('.per-customer').is(':hidden')) {
                    $('.per-contact').fadeOut(100);
                    $('.per-customer').fadeIn(100, function () {
                        $(".step2-2-inforpass .scroll-pass").getNiceScroll().resize();
                    });
                }
                $('.per-customer .step2-title .num').text(num_cus);
            } else {
                if ($('.per-contact').is(':hidden')) {
                    $('.per-customer').fadeOut(100);
                    $('.per-contact').fadeIn(100, function () {
                        $(".step2-2-inforpass .scroll-pass").getNiceScroll().resize();
                    });
                }
            }
        })

        add_per.click(function () {
            num_cus = $('.gr-list-customer li').size() + 1;
            if (num_cus <= 9) {
                var row = (num_cus % 2) + 1;
                $('.gr-list-customer').append('<li class="row-' + row + '"><a href="javascript:void(0)" title="" class="customer" data="customer' + num_cus + '">Hành khách ' + num_cus + '</a></li>');
                $(".step2-listpass > div").getNiceScroll().resize();
            } else {
                alert('tối đa 9 người!');
            }
        })
    }

    //this.confirm_cus = function () {
    //    $('.list-perinfo.confirm li a').live('click', function () {
    //        var per = $('.list-perinfo.confirm li a');
    //        var $this = $(this);
    //        var num_cus = $this.parent().index();
    //        per.removeClass('active');
    //        $this.addClass('active');

    //        if ($this.hasClass('customer')) {
    //            if ($('.confirm-cus').is(':hidden')) {
    //                $('.confirm-contact').fadeOut(100);
    //                $('.confirm-cus').fadeIn(100, function () {
    //                    $("#step2-7-inforpass .scroll-pass").getNiceScroll().resize();
    //                });
    //            }
    //            $('.confirm-cus .confirm-cus-title span.num').text(num_cus + 1);
    //        } else {
    //            if ($('.confirm-contact').is(':hidden')) {
    //                $('.confirm-cus').fadeOut(100);
    //                $('.confirm-contact').fadeIn(100, function () {
    //                    $("#step2-6-inforpass .scroll-pass").getNiceScroll().resize();
    //                });
    //            }
    //        }
    //    })
    //}

    this.choose_payment = function () {

        $('.gr-payselect .a-option a').click(function () {
            var $this = $(this);
            var index = $this.parent().index();
            $('.gr-payselect .a-option a').removeClass('active');
            $this.addClass('active');
            $('.pay-group .payment-choose').stop().animate({ right: 0 });
            $('.pay-group .payment-choose:eq(' + index + ')').stop().animate({ right: -430 });
        })

        $(".show-bill").change(function () {
            if (this.checked) {
                self.step_animate(2, '.bill-world', 'right', '-430');
            } else {
                self.step_animate(2, '.bill-world', 'right', '0');
            }
        });

        var local = true
        $('.btn-view-local').click(function () {
            if (local) {
                local = false;
                self.step_animate(2, '.card-vn .bank-user', 'right', '-430');
            } else {
                self.step_animate(2, '.card-vn .bank-user', 'right', '0');
                local = true;
            }
        })

        $('.bank-user .btn-close').click(function () {
            self.step_animate(2, '.bank-user.intro-pay', 'right', '0');
            local = true;
        })
        $('.confirm-group .bank-user .btn-close').click(function () {
            $('.gr-confirmselect .a-option a').removeClass('active');
        })


        // confirm payment
        $('.gr-confirmselect .a-option a').click(function () {
            var $this = $(this);
            var index = $this.parent().index();
            $('.gr-confirmselect .a-option a').removeClass('active');
            $this.addClass('active');
            $('.confirm-group .bank-user').stop().animate({ right: 0 });
            if (index == 4) {
                $('.confirm-group .bank-user:eq(' + index + ')').stop().animate({ right: -700 });
            } else {
                $('.confirm-group .bank-user:eq(' + index + ')').stop().animate({ right: -430 });
            }
        })

        // confirm payment edit
        $('.gr-confirmselect-edit .opentabs a').click(function () {
            var $this = $(this);
            var index = $this.parent().index();
            $('.gr-confirmselect-edit .opentabs a').removeClass('active');
            $this.addClass('active');
            if (index > 6)
                index = index - 4;
            $('.confirm-group-edit .bank-user').stop().animate({ right: 0 });
            if (index == 4) {
                $('.confirm-group-edit .bank-user:eq(' + index + ')').stop().animate({ right: -700 });
            } else {
                $('.confirm-group-edit .bank-user:eq(' + index + ')').stop().animate({ right: -430 });
            }
        })
    }

    this.select_place = function () {
        var rtrip = $('.select-trip li.click');
        var btn = $('.btn-change-place');
        var list_place = $('#select-place');
        var place_select = $('.list-place li a');

        rtrip.click(function () {
            var $this = $(this);
            var idex = $this.index();
            if (!$this.hasClass('active')) {
                $('.select-trip li').removeClass('active');
                $this.addClass('active');
                if (idex == 1) {
                    // $('.trip-to').fadeOut();
                    $('.return').fadeOut();
                    $('.icon-trip').addClass('one');
                    one_direc = true;
                    self.set_height();
                }
                if (idex == 0) {
                    // $('.trip-to').fadeIn();
                    $('.return').fadeIn();
                    $('.icon-trip').removeClass('one');
                    one_direc = false;
                    self.set_height();
                }
            }
        })

        btn.click(function () {
            sub_step1.stop().animate({ right: 0 });
            list_place.stop().animate({ right: -270 });
            //var $this = $(this);
            //if ($this.hasClass('btn-from')) {
            //    place = '.trip-from';
            //    $('.list-place').removeClass('back');
            //    $('.list-place').addClass('go');
            //    $('#select-place .title.back').hide();
            //    $('#select-place .title.go').show();
            //} else {
            //    place = '.trip-to';
            //    $('.list-place').removeClass('go');
            //    $('.list-place').addClass('back');
            //    $('#select-place .title.back').show();
            //    $('#select-place .title.go').hide();
            //}
        })
        place_select.click(function () {
            sub_step1.stop().animate({ right: 0 });
            var $that = $(this);
            //move_place = $that.attr('data');
            //var symbol = $that.find('.symbol').text();
            //var pl = $that.find('.place').text();
            //$(place + ' .character').text(symbol);
            //$(place + ' .name').text(pl);
        });
    }

    this.reset_point = function () {
        // console.log('reset tat ca');
        // code reset tat ca o day
    }

    this.move_map_click = function (a, b) {
        //var symbol = $(b).find('.symbol').text();
        //var pl = $(b).find('.place').text();
        //$(a + ' .character').text(symbol);
        //$(a + ' .name').text(pl);
    }

    this.auto_move_map = function (x, y) {
        x = x - (w_ / 2);
        y = y - (h_ / 3);
        setTimeout(function () {
            $('#case-study').getNiceScroll()[0].doScrollLeft(x, 1000);
            $('#case-study').getNiceScroll()[0].doScrollTop(y, 1000);
        }, 300)
    }

    this.select_date = function () {
        var btn_date = $('.btn-change-date');
        var list_date = $('#select-day');
        btn_date.click(function () {
            var $this = $(this);
            sub_step1.stop().animate({ right: 0 });
            list_date.stop().animate({ right: -270 });
            if ($this.hasClass('date-depart')) {
                date_select = '.depart';
                $('#select-day .title.go').removeClass('hide')
                $('#select-day .title.back').addClass('hide')
            } else {
                date_select = '.return';
                $('#select-day .title.back').removeClass('hide')
                $('#select-day .title.go').addClass('hide')
            }
        })
    }

    this.compare_time = function (date1, date2) {
        var d1 = date1.getDate();
        var m1 = date1.getMonth();
        var y1 = date1.getFullYear();
        var d2 = date2.getDate();
        var m2 = date2.getMonth();
        var y2 = date2.getFullYear();

        if (y1 < y2) {
            return true;
        } else if (y1 > y2) {
            return false;
        } else {
            if (m1 < m2) {
                return true;
            } else if (m1 > m2) {
                return false;
            } else {
                if (d1 < d2) {
                    return true;
                } else if (d1 > d2) {
                    return false;
                } else {
                    return false;
                }
            }
        }
    }

    this.get_date = function (value, time) {
        if (value == '0') {
            var selDay = time.getDate();
            var selMonth = time.getMonth() + 1;
            var selYear = time.getFullYear();
            $('#day-trip .depart .day').text(selDay);
            $('#day-trip .depart .m span').text(selMonth);
            $('#day-trip .depart .y span').text(selYear);

            $('#day-trip .return .day').text(selDay + 1);
            $('#day-trip .return .m span').text(selMonth);
            $('#day-trip .return .y span').text(selYear);
            startDate = time;
            endDate = new Date(time.getFullYear(), time.getMonth() + 1, time.getDate() + 1);
        } else {
            if (self.compare_time(time, now)) {
                alert('Thông báo! Ngày bạn chọn không có dữ liệu!!!')
                return false;
            }
            if (!one_direc) {
                if (date_select == '.depart') {
                    startDate = time;
                    if (self.compare_time(endDate, startDate)) {
                        alert('Thông báo! Ngày đi phải trước ngày về.')
                        return false;
                    }
                } else {
                    endDate = time;
                    if (self.compare_time(endDate, startDate)) {
                        alert('Thông báo! Ngày về phải sau ngày đi.')
                        return false;
                    }
                }
            }
            var selDay = time.getDate();
            var selMonth = time.getMonth() + 1;
            var selYear = time.getFullYear();
            $('#day-trip ' + date_select + ' .day').text(selDay);
            $('#day-trip ' + date_select + ' .m span').text(selMonth);
            $('#day-trip ' + date_select + ' .y span').text(selYear);
        }
        sub_step1.stop().animate({ right: 0 });
    }

    this.select_yearold = function () {
        var $adults = $('.adults');
        var $children = $('.children');
        var $baby = $('.baby');

        //var max = 9;
        //var min = 0;
        //$('.up-yo').click(function () {
        //    var $this = $(this);
        //    var class_old = $this.attr('data');
        //    var curent = $this.parent().parent();
        //    var value = curent.find('.num').text();
        //    if (value >= max)
        //        return false;
        //    value++;
        //    curent.find('.num').text(value);
        //})
        //$('.do-yo').click(function () {
        //    var $this = $(this);
        //    var class_old = $this.attr('data');
        //    var curent = $this.parent().parent();
        //    var value = curent.find('.num').text();
        //    if (value <= min)
        //        return false;
        //    value--;
        //    curent.find('.num').text(value);
        //})

        var timett1;
        $adults.hover(function () {
            clearTimeout(timett1);
            $('.yo-tooltip.adults').css({ top: $('.col.adults').offset().top - 200, left: $('.col.adults').offset().left + 125 });
            $('.yo-tooltip.adults').fadeIn(100, function () {
                $(".adults .scl").niceScroll({
                    cursorborder: "",
                    cursorcolor: "#e9e9e6",
                    autohidemode: false,
                    background: "#242424",
                    railpadding: { top: 0, right: 4, left: 0, bottom: 0 },
                    cursorwidth: "6px"
                });
            });
        }, function () {
            timett1 = setTimeout(function () {
                $('.yo-tooltip.adults').fadeOut(100);
            }, 200);
        })

        var timett2;
        $children.hover(function () {
            clearTimeout(timett2);
            $('.yo-tooltip.children').css({ top: $('.col.children').offset().top - 200, left: $('.col.children').offset().left + 125 });
            $('.yo-tooltip.children').fadeIn(100);
        }, function () {
            timett2 = setTimeout(function () {
                $('.yo-tooltip.children').fadeOut(100);
            }, 200);
        })

        var timett3;
        $baby.hover(function () {
            clearTimeout(timett3);
            $('.yo-tooltip.baby').css({ top: $('.col.baby').offset().top - 200, left: $('.col.baby').offset().left + 125 });
            $('.yo-tooltip.baby').fadeIn(100, function () {
                $(".baby .scl").niceScroll({
                    cursorborder: "",
                    cursorcolor: "#e9e9e6",
                    autohidemode: false,
                    background: "#242424",
                    railpadding: { top: 0, right: 4, left: 0, bottom: 0 },
                    cursorwidth: "6px"
                });
            });
        }, function () {
            timett3 = setTimeout(function () {
                $('.yo-tooltip.baby').fadeOut(100);
            }, 200);
        })

    }
    this.draw_air = function (x, y) {
        var canvas2 = $('#draw_arc');
        var ctx2 = canvas2[0].getContext("2d");
        var w_cv = canvas2.width();
        var h_cv = canvas2.height();
        var radius = 2;
        var startAngle = 0 * Math.PI;
        var endAngle = 2 * Math.PI;
        setTimeout(function () {
            for (var i = 0; i < Math.floor(self.find_max(w_cv, h_cv, x, y) / 2) ; i++) {
                radius += 5;
                ctx2.beginPath();
                ctx2.arc(x, y, radius, startAngle, endAngle, false);
                if (i == 0) {
                    ctx2.fillStyle = "#fff";
                    ctx2.fill();
                };
                ctx2.lineWidth = 1.5;
                ctx2.strokeStyle = "#fff";
                ctx2.stroke();
            };
        }, 100);
    }
    this.find_max = function (w_cv, h_cv, x, y) {
        var mx = 0, mx1 = 0, mx2 = 0;
        mx1 = Math.max(x, w_cv - x, w_cv / 2);
        mx2 = Math.max(y, h_cv - y, h_cv / 2);
        return mx = Math.sqrt(Math.pow(mx1, 2) + Math.pow(mx2, 2));
    }
    this.clear_air = function () {
        var canvas2 = $('#draw_arc');
        var ctx2 = canvas2[0].getContext("2d");
        ctx2.save();
        ctx2.setTransform(1, 0, 0, 1, 0, 0);
        ctx2.clearRect(0, 0, canvas2[0].width, canvas2[0].height);
        ctx2.restore();
    }
}

Page = new Page();
PageCustom = new PageCustom();

$(document).ready(function () {
    Page.init();
    PageCustom.init();
});


//Custom for some control
function PageCustom() {
    var self = this;

    this.init = function () {
        self.select_date_2();
        self.select_place_2();
    };

    this.select_place_2 = function () {
        var btn = $('.btn-change-place-2');
        var list_place = $('#select-place-2');
        var place_select = $('.list-place-2 li a');
        btn.click(function () {
            sub_step1.stop().animate({ right: 0 });
            list_place.stop().animate({ right: -270 });
        })
        place_select.click(function () {
            sub_step1.stop().animate({ right: 0 });
            var $that = $(this);
            //move_place = "danang";
        });
    }


    this.select_date_2 = function () {
        var btn_date = $('.btn-change-date-2');
        var list_date = $('#select-day-2');
        btn_date.click(function () {
            var $this = $(this);
            sub_step1.stop().animate({ right: 0 });
            list_date.stop().animate({ right: -270 });
            if ($this.hasClass('date-depart')) {
                date_select = '.depart';
            } else {
                date_select = '.return';
            }
        })
    }
}