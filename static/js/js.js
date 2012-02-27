$(function()
{
	main();
});

function main()
{
	var Cities = {
		d : {},
		map : {},
		init: function()
		{
			this.doRequest();
			this.doMap();
			this.printMarkers();
		},
		doRequest: function()
		{
			$.ajax({  
				type: 'post',  
				url: '/cities',  
				data: 'action=do',
				dataType: 'text',
				error: function(XMLHttpRequest, textStatus, errorThrown)
				{  
					//console.log( XMLHttpRequest, textStatus, errorThrown );
				},
				beforeSend: function(XMLHttpRequest) 
				{ 
					//console.log( XMLHttpRequest );
				}, 
				success: function( data, textStatus, jqXHR ){
					//console.log( data );
					Cities.d = $.parseJSON(data);
				},
				complete: function( data, textStatus, jqXHR )
				{
					console.log( textStatus );
				}  
			});
		},
		printMarkers : function()
		{
			var circle, latlng, color, tohex;

			$('#map_canvas').ajaxComplete(function()
			{
				$.each( Cities.d, function(i, obj){
					for( var city in obj )
					{
						tohex = obj[city][3].toHex();
						color = '#00'+tohex+"00";
						latlng = new google.maps.LatLng( obj[city][0], obj[city][1] );
						//console.log( obj[city][2] );
						circle = new google.maps.Circle({
							map: Cities.map,
							radius: obj[city][3] * 100 * 3,// 3000 km
							center: latlng,
							fillColor: color,
							fillOpacity: obj[city][2] / 100,
							strokeColor: color,
							strokeOpacity: obj[city][2] / 100,
							strokeWeight: 1	
						});
					}
				});
			});
		},
		doMap : function()
		{
			var latlng = new google.maps.LatLng(13, -5.99), myOptions = {zoom: 2, center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP};
			Cities.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		}
	};
	Cities.init();
};
/*FOR DJANGO AJAX CALL SECURITY/////////////////////////////////////////*/
$(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});
Number.prototype.toHex = function() 
{
	try
	{
		var val = this.valueOf();
		val = parseInt(val);
		val = Math.max(0,val);
		val = Math.min(val,255);
		val = Math.round(val);
		return "0123456789ABCDEF".charAt((val-val%16)/16) + "0123456789ABCDEF".charAt(val%16)
	}
	catch(error)
	{
		throw new TypeError("must be a number!")
	}
};