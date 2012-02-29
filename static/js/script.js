$(function()
{
	main();
});

function main()
{
	var po = org.polymaps;

	var map = po.map()
	    .container(document.getElementById("map_canvas").appendChild(po.svg("svg")))
	    .add(po.interact())
	    .add(po.hash());

	map.add(po.image()
	    .url(po.url("http://{S}tile.cloudmade.com"
	    + "/1a1b06b230af4efdbb989ea99e9841af" // http://cloudmade.com/register
	    + "/998/256/{Z}/{X}/{Y}.png")
	    .hosts(["a.", "b.", "c.", ""])));

	map.add(po.compass()
	    .pan("none"));
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