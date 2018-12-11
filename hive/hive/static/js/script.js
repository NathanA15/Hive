$(document).ready(function() {
	$('#tweet-form').on('submit', function(e) {
		e.preventDefault();
		createTweet();
	});

});


function createTweet(){
	$.ajax({
		url: 'create_tweet/',
		type: 'POST',
		data: {
			title: $('#tweet-title').val(),
			text: $('#tweet-text').val(),
		},
		success: function(json) {
			$('#tweet-title').val('');
			$('#tweet-text').val('');
			addTweet(json);
		},
		error: function(xhr, errmsg, err) {
			console.log(errmsg, err);
		},
	});
};


function addTweet(tweet) {
	var tweetHTML = `
	<div class="card border-info mx-auto" style="max-width: 50rem;">
				<div class="card-header"> 
				` + tweet.title + ` --- Tweet id : ` + tweet.id + `
				</div>

				<div class="card-body">
					<h5 class="card-title">
						` + tweet.text + `	
					</h5>
					<p class="card-text">Tweet Date : ` + tweet.date + `</p>
					By <a href="{% url 'first_app:profile_page' username=` + tweet.user.user.username + ` %}"> ` + tweet.user.user.username + ` </a>
				</div>
	</div>
	`;

	$('#all-tweets').prepend(tweetHTML);


}



$(function() {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    function sameOrigin(url) {
        var host = document.location.host;
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
});










