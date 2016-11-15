var max_money = 0, m1=0, m2=0, tm1=0, tm2=0, montharr = [];
var dw = 0, w, n, d, y;
function Chart(){
	var self = this;
	
	this.init = function(){
		self.jquery();
	};

	this.jquery = function(){
		$('.chartgo .point .point_info .click').live('click', function(){
			$('.chartgo .list-date .list').removeClass('active');
			$(this).parent().parent().parent().parent().parent().addClass('active');
		})

		$('.chartback .point .point_info .click').live('click', function(){
			$('.chartback .list-date .list').removeClass('active');
			$(this).parent().parent().parent().parent().parent().addClass('active');
		})

		$( ".chart-go" ).load( "chart_di.php", function(){
			self.draw_chart(data_chart1, arr_money1, '#chart_go', '.chartgo');
		});
		$( ".chart-back" ).load( "chart_ve.php", function(){
			self.draw_chart(data_chart2, arr_money2, '#chart_back', '.chartback');
		});
	
		$(document).on('mouseenter', '.point',  function(){
			var $this = $(this);
			var pup = $this.find('.point_info');
			var top = pup.offset().top;
			if(!cb){
				if(top < 134){
					pup.css({bottom: -152});
					pup.find('.arrow-d').hide();
					pup.find('.arrow-d2').show();
				}
			}else{
				if(top < 192){
					pup.css({bottom: -152});
					pup.find('.arrow-d').hide();
					pup.find('.arrow-d2').show();
				}
			}
		}).on('mouseleave', '.hover', function() {
			// alert('you removed the hover from button!');
		});
	};

	this.Comparator = function (a,b){
		if (a[1] > b[1]) return -1;
		if (a[1] < b[1]) return 1;
		return 0;
	}

	this.max_value = function(a){
		a = a.sort(self.Comparator);
		return parseInt(a[0][1]);
	}

	this.draw_chart = function(a, b, c, f){
		var ch = $(f+' .list-date');
		var ctx = $(c)[0].getContext("2d");
		ctx.beginPath();
		for (var i = 0; i < a.length; i++) {
			dw = moment(a[i][0], "YYYY MM DD").isoWeekday() - 1;
			w = lg[dw][1];
			n = lg[dw+7][1];
			d = moment(a[i][0], "YYYY MM DD").get('date');
			m = moment(a[i][0], "YYYY MM DD").get('month');
			y = moment(a[i][0], "YYYY MM DD").get('year');
			montharr.push(m)
			p = 200 - (a[i][1] * 200 / self.max_value(b)) + 10;
			ch.append('<li class="list"><div class="w">'+w+'</div><div class="l"><div class="point" style="top: '+p+'px;"><div class="point_date">'+moment(a[i][0]).format('L')+'</div><div class="point_info"><div class="wrap-left"><div class="price">'+ new Intl.NumberFormat("de-DE").format(a[i][1])+'<span> VNĐ</span></div><div class="day">'+n+', '+moment(a[i][0]).format('L')+'</div><div class="fr"><strong>'+a[i][2]+'</strong> '+a[i][3]+'</div><div class="to"><strong>'+a[i][4]+'</strong> '+a[i][5]+'</div><div class="click"><em>Click để chọn</em></div></div><img class="arrow-d" src="images/icon/arrow-d.png" alt="" /><img class="arrow-d2" src="images/icon/arrow-d2.png" alt="" /></div></div></div><div class="d">'+d+'</div></li>');

			if(i==0){
				ctx.moveTo(25, p);
			}else{
				ctx.lineTo((i+1)*25, p);
			}
		};
		ctx.strokeStyle = '#ffffff';
		ctx.stroke();	
		$(f+' .month-of.first').css({width: $.inArray(m, montharr) * 25+13})
		if(m==0){
			$(f+' .month-of.first').text('Tháng '+12+', '+(y-1))
		}else{
			$(f+' .month-of.first').text('Tháng '+m+', '+y)
		}
		$(f+' .month-of.last').css({width: (28-$.inArray(m, montharr)) * 25+10})
		$(f+' .month-of.last').text('Tháng '+(m+1)+', '+y)
		montharr=[];
	}

	this.between_days = function(startDay, endDay){
		var itr = moment.twix(startDay,endDay).iterate("days");
		var range=[];
		while(itr.hasNext()){
			range.push(itr.next().format("YYYY/M/D"))
		}
		return range;
	}
}
Chart= new Chart();
$(document).ready(function(){
	Chart.init();
});
