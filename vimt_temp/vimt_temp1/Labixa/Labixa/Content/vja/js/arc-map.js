var $canvas = $('#marquee-line')[0];
var ctx = $canvas.getContext('2d');

function Map(){
  var self= this;
  
  this.init= function(){
    // self.canvas_air(358, 480);
    self.dragg();
  };

  this.dragg = function(){
    $('.departure-handle').draggable();
    $('.destination-handle').draggable();
    $( ".component-destination" ).droppable({
      drop: function( event, ui ) {
        console.log(event, ui);
      }
    });
  };

  this.canvas_air = function(t,e){

    var off_x = 162.5;
    var off_y = 0;

    var x = t - off_x;
    var y = e - off_y;

    var departureX = 509;
    var departureY = 301;    

    var progress = 1;
    var startAngle = Math.PI/180;
    var endAngle =Math.PI / 180 * (360 - 180 * progress);

    var distance = Math.sqrt((departureX - x) * (departureX - x) + (departureY - y) * (departureY - y));
    var radius = distance / 2;

    var deltaY = departureY - y;
    var deltaX = departureX - x;

    var angleInDegrees = 180 * Math.atan2(deltaY, deltaX) / Math.PI;

    var counterClockwise = true;

    var translateCenter = {
      x : departureX,
      y : departureY
    }

    var i = {
      angle : startAngle
    };
    TweenLite.to(i, 1, {
      angle : endAngle,
      onUpdate : function () {
        return ctx.translate(translateCenter.x, translateCenter.y),
        ctx.rotate(angleInDegrees * Math.PI / 180),
        ctx.strokeStyle = "#000",
        ctx.lineWidth = 2,
        ctx.beginPath(),
        ctx.arc(0 - radius, 0, radius, 0, -1 * i.angle, !0),
        ctx.stroke();

        // console.log(i.angle);
        // ctx.beginPath();
        // ctx.arc(x, y, radius, 0, i.angle, counterClockwise),
        // ctx.lineWidth = 3;
        // ctx.strokeStyle = 'black';
        // ctx.stroke();
      },
      ease : Strong.easeIn,
      onComplete : function () {
      
      },
      onReverseComplete : function () {
        
      }
    })
  }
}
Map= new Map();
$(document).ready(function(){
  Map.init();
});
