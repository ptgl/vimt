var $canvas = document.getElementById('myCanvas');
var ctx = $canvas.getContext('2d');

function Map(){
  var self= this;
  
	this.init= function(){
		self.canvas_air(758, 500);
	};
	
	this.destroyArc = function(){
		alert(1111111111);
	}
	
	this.canvas_air = function(t,e){
		var lineAnimation = null;
		var canvasOffsets = {
			x : $canvas.offsetLeft,
			y : $canvas.offsetTop
		};
		
		var departureX = Math.round(509),
		departureY = Math.round(300),
		translateCenter = {
			x : departureX,
			y : departureY
		}
		
		var x = t - canvasOffsets.x,
		y = e - canvasOffsets.y-51,
		progress = 1,
		startAngle = Math.PI / 180,
		endAngle = Math.PI / 180 * (360 - 180 * progress),
		distance = Math.sqrt((departureX - x) * (departureX - x) + (departureY - y) * (departureY - y)),
		radius = distance / 2,
		deltaY = departureY - y,
		deltaX = departureX - x,
		angleInDegrees = 180 * Math.atan2(deltaY, deltaX) / Math.PI,
		i = {
			angle : startAngle
		};
		lineAnimation = TweenLite.to(i, 1, {
			angle : endAngle,
			onUpdate : function () {
				return $canvas.width = $canvas.width,
				ctx.translate(translateCenter.x, translateCenter.y),
				ctx.rotate(angleInDegrees * Math.PI / 180),
				ctx.strokeStyle = "#000",
				ctx.lineWidth = 2,
				ctx.beginPath(),
				ctx.arc(0 - radius, 0, radius, 0, -1 * i.angle, !0),
				ctx.stroke();
			},
			ease : Strong.easeIn,
			onComplete : function () {
				// console.log(0 - n.radius, 0, n.radius, 0, -1 * i.angle, !0);
				// return s.animateAirplane(n)
			},
			onReverseComplete : function () {
				return self.destroyArc();
			}
		});
	}
}
Map= new Map();
$(document).ready(function(){
  Map.init();
});
