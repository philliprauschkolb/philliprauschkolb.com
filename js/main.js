/**

AJAX loading Instagram data

**/

var images = [];
var rand;
var svg = '<svg viewBox="0 0 200 200" preserveAspectRatio="none"><path d="M198.831,200.439c0.642,1.136,0.276,2.604-0.831,3.264c-65.333,38.909-130.667,38.909-196,0 c-1.107-0.66-1.473-2.128-0.832-3.264c37.775-67.293,37.775-134.586,0-201.879C0.527-2.575,0.893-4.043,2-4.703 c65.333-38.909,130.667-38.909,196,0c1.107,0.66,1.473,2.128,0.832,3.263C161.057,65.853,161.056,133.146,198.831,200.439z"/></svg>';

// Popup function for images/videos
$(document).on("click",".popup",function(e){
	e.preventDefault();
	var large_image = $(this).attr('href');
	    $('#overlay').css('opacity','1');
	    $('#overlay').css('z-index','100');
	    
	    if( $(this).hasClass('video')){
	    	// If video
		    var video = '<video controls autoplay>';
	        	video += '<source src="' + large_image + '" type="video/mp4">';
	      		video += '</video>';
	      	$('#overlay').append(video);
	      	$('video').mediaelementplayer({
	      		defaultVideoWidth: 303
	      	});
	      	} else{
	      		 // If image

	      		console.log($(this).closest('.col-md-3').next().find('a').attr('href'));
	      		console.log($(this).closest('.col-md-3').prev().find('a').attr('href'));

	    		$('#overlay').append('<img src="' + large_image + '">');
	    		window.setTimeout(function() {
				    $('#overlay img').css('max-width','100%');
				}, 200);
	    		
	      	}
 });

// Popup function for contact form
$(document).on("click",".contact",function(e){
	e.preventDefault();
	    $('#overlay').css('opacity','1');
	    $('#overlay').css('z-index','100');
	    $('#contact').show();    
 });

// Popup function for 'about' content
$(document).on("click",".about",function(e){
	e.preventDefault();
	    $('#overlay').css('opacity','1');
	    $('#overlay').css('z-index','100');
	    $('#about').show();    
 });

// Popup function for 'shop' content
$(document).on("click",".shop",function(e){
	e.preventDefault();
	    $('#overlay').css('opacity','1');
	    $('#overlay').css('z-index','100');
	    $('#shop').show();    
 });



// Close function for the lightbox overlay
$('#overlay').click(function(){
	    $(this).css('opacity','0');
		$('#overlay').css('z-index','-1');
		$('#overlay img').remove();
		$('#overlay video').remove();
		$('#overlay .mejs-video').remove();
		$('#overlay .mejs-offscreen').remove();
		$('#contact').hide();
		$('#about').hide();
		$('#shop').hide();
	
});


// User data load
// $.ajax({
//   type: "GET",
//   dataType: "jsonp",
//   cache: false,
//   url: "https://api.instagram.com/v1/users/144685754/?client_id=302fe2ddb915495faa9d580823e19683",
//   success: function(data) {
//   	var bio = '<img class="profile-pic" src="https://igcdn-photos-h-a.akamaihd.net/hphotos-ak-xfp1/t51.2885-19/10431811_847392685291655_434960994_a.jpg"/>';
//   		bio += '<h1><span>The Art of</span> Phillip Rauschkolb</h1>';
//   		// bio += '<p>' + data.data.bio + '</p>';
   
//     // Do stuff with the data here
//   	$('#sidebar').append(bio);
//   }
// });


// Initial Load of items
$.ajax({
  type: "GET",
  dataType: "jsonp",
  cache: false,
  url: "https://api.instagram.com/v1/users/144685754/media/recent/?client_id=302fe2ddb915495faa9d580823e19683",
  success: function(data) {
  	
    // placing the images on the page
	    for (var i = 0; i < 20; i++) {

	    	var fullLink;
	    	var linkClass;
	    	var playClass;
	    	var caption;

	    	//put image urls into an array
	    	images.push(data.data[i].images.standard_resolution.url);

	    	// Check for video posts and add class if it's a video
	    	if ( data.data[i].videos != undefined ){
	    		fullLink = data.data[i].videos.standard_resolution.url;
	    		linkClass = 'video';
	    		playClass = 'play';
	    		caption = 'Play Video';
	    	} else {
	    		fullLink = data.data[i].images.standard_resolution.url;
	    		linkClass = '';
	    		playClass = '';
	    		caption = 'View Image';
	    	}
	    	// Create markup for each post
	    	var igPost = "<div class='col-xs-6 col-sm-4 col-md-3'><div class='ig-thumbnail'><a data-path-hover='M200,198c0,1.104-0.896,2-2,2H2c-1.104,0-2-0.896-2-2V2c0-1.104,0.896-2,2-2h196c1.104,0,2,0.896,2,2V198z' class='popup " + linkClass + "' target='_blank' href='" + fullLink + "'>";
	    		igPost += "<span class='" + playClass + "'></span><span class='caption'>" + caption + "</span>" + svg + "<img src='" + data.data[i].images.standard_resolution.url + "'></img></a>";
	    		// igPost += "<span class='" + playClass + "'></span><span class='caption'>" + caption + "</span><img src='" + data.data[i].images.standard_resolution.url + "'></img></a>";
	    		igPost += "</div></div>";


	          
	          // Append posts to the page
	          $("#posts").append(igPost);

	          // Wait a split second, then add class to fade items in
				window.setTimeout(function() {
				    $(".ig-thumbnail").addClass("zero");
				    // Show the 'Load More' button
				    $(".more-btn").removeClass('hidden');
				}, 200);

				// Animate rollovers
				(function() {
	
					function init() {
						var speedIn = 800,
							speedOut = 800,
							easing = mina.bounce;

						[].slice.call ( document.querySelectorAll( '.ig-thumbnail a' ) ).forEach( function( el ) {
							var s = Snap( el.querySelector( 'svg' ) ), path = s.select( 'path' ),
								pathConfig = {
									from : path.attr( 'd' ),
									to : el.getAttribute( 'data-path-hover' )
								};

							el.addEventListener( 'mouseenter', function() {
								path.animate( { 'path' : pathConfig.to }, speedIn, easing );
							} );

							el.addEventListener( 'mouseleave', function() {
								path.animate( { 'path' : pathConfig.from }, speedOut, easing );
							} );
						} );
					}

					init();

				})();
				
	    }
	    // Get a random image from the images array
	    // rand = images[Math.floor(Math.random() * images.length)];
	    // // Assign the random image to the mobile banner
	    // $('.mobile-banner').css('background-image','url(' + rand + ')')

	    // Set variable for the next page of data to be loaded
	    var nextPage = data.pagination.next_url;

	    // Run another ajax call when the 'Load More' button is clicked
	    $('#loadMore').click(function(){
	    	// Change button text while new content is loading
	    	$(this).text('Loading...');
	    	// Get the new content
	    	$.ajax({
			  type: "GET",
			  dataType: "jsonp",
			  cache: false,
			  url: nextPage,
			  success: function(data) {

			  	for (var i = 0; i < 20; i++) {

			  		var fullLink;
			    	var linkClass;
			    	var playClass;

			    	if ( data.data[i].videos != undefined ){
			    		fullLink = data.data[i].videos.standard_resolution.url;
			    		linkClass = 'video';
			    		playClass = 'play'

			    	} else {
			    		fullLink = data.data[i].images.standard_resolution.url;
			    		linkClass = '';
			    		playClass = '';
			    	}

			    	var igPost = "<div class='col-xs-6 col-sm-4 col-md-3'><div class='ig-thumbnail'><a data-path-hover='M200,198c0,1.104-0.896,2-2,2H2c-1.104,0-2-0.896-2-2V2c0-1.104,0.896-2,2-2h196c1.104,0,2,0.896,2,2V198z' class='popup " + linkClass + "' target='_blank' href='" + fullLink + "'>";
			    		igPost += "<span class='" + playClass + "'></span><span class='caption'>" + caption + "</span>" + svg + "<img src='" + data.data[i].images.standard_resolution.url + "'></img></a>";
			    		igPost += "</div></div>";	
			    	 	
			          $("#posts").append(igPost);

					// Wait a split second, then add class to fade items in
					window.setTimeout(function() {
					    $(".ig-thumbnail").addClass("zero");
					}, 200);
			         
			    }

			    // Animate rollovers
				(function() {
	
					function init() {
						var speedIn = 800,
							speedOut = 800,
							easing = mina.bounce;

						[].slice.call ( document.querySelectorAll( '.ig-thumbnail a' ) ).forEach( function( el ) {
							var s = Snap( el.querySelector( 'svg' ) ), path = s.select( 'path' ),
								pathConfig = {
									from : path.attr( 'd' ),
									to : el.getAttribute( 'data-path-hover' )
								};

							el.addEventListener( 'mouseenter', function() {
								path.animate( { 'path' : pathConfig.to }, speedIn, easing );
							} );

							el.addEventListener( 'mouseleave', function() {
								path.animate( { 'path' : pathConfig.from }, speedOut, easing );
							} );
						} );
					}

					init();

				})();

			    //Change the button text back
			  	$('#loadMore').text('Load More');

			    // Update the variable for the next page of data to be loaded
			    nextPage = data.pagination.next_url;
			   
			  }
			});
	    })



    },
    error: function(){
    	$("#posts").append('<h1>Looks like we have a problem.</h1><p>Try reloading the page.</p>')
    }
  });








