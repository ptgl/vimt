var $j = jQuery.noConflict(); $j(window).resize(function () {
    "use strict"; if ($j('#toolbar').hasClass('off'))
    { var height = $j('#toolbar_outer').height(); $j('#toolbar_outer').css('margin-bottom', -height) }
});
$j(window).load(function () {
    "use strict"; setTimeout(function () { var height = $j('#toolbar_outer').height(); $j('#toolbar_outer').css('margin-bottom', -height); $j('#toolbar').css('visibility', 'visible') }, 1000)
}); $j(document).ready(function () { "use strict"; $j("#toolbar a.open").click(function (e) { e.preventDefault(); var height = $j('#toolbar_outer').height(); if ($j('#toolbar').hasClass('off')) { $j('#toolbar_outer').stop().animate({ 'margin-bottom': '0px' }); $j('#toolbar').removeClass('off'); $j('#toolbar').addClass('on'); $j("#toolbar a.open").addClass('opened') } else { $j('#toolbar_outer').stop().animate({ 'margin-bottom': -height }); $j('#toolbar').removeClass('on'); $j('#toolbar').addClass('off'); $j("#toolbar a.open").removeClass('opened') } return false }) });