$(document).ready(function() {
	var animationPaused = false;
	var animationLoop = true;
	var animationControl;
	var animationControl3;
	var anim;
	var anim1;
	var anim2;
	var anim3;
	var anim4;
	var anim5;

	var thisimage = $(".play-rip").data('filename');

	var animData = {
		wrapper : document.getElementById('show_preview_here'),
		animType : 'svg',
		loop : true,
		prerender : true,
		autoplay : true,
		path : thisimage
	};
	var animData1 = {
		wrapper : document.getElementById('show_preview_here1'),
		animType : 'svg',
		loop : true,
		prerender : true,
		autoplay : true,
		path : thisimage
	};
	var animData2 = {
		wrapper : document.getElementById('show_preview_here2'),
		animType : 'svg',
		loop : true,
		prerender : true,
		autoplay : true,
		path : thisimage
	};
	var animData3 = {
		wrapper : document.getElementById('show_preview_here3'),
		animType : 'svg',
		loop : true,
		prerender : true,
		autoplay : true,
		path : thisimage
	};
	var animData4 = {
		wrapper : document.getElementById('show_preview_here4'),
		animType : 'svg',
		loop : true,
		prerender : true,
		autoplay : true,
		path : thisimage
	};
	var animData5 = {
		wrapper : document.getElementById('show_preview_here5'),
		animType : 'svg',
		loop : true,
		prerender : true,
		autoplay : true,
		path : thisimage
	};
	anim = bodymovin.loadAnimation(animData);
	anim1 = bodymovin.loadAnimation(animData1);
    anim2 = bodymovin.loadAnimation(animData2);
    anim3 = bodymovin.loadAnimation(animData3);
    anim4 = bodymovin.loadAnimation(animData4);
    anim5 = bodymovin.loadAnimation(animData5);
}); 