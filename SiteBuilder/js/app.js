var slideIndex = -1;

function carousel() { //Start up the carousel
    var x = document.getElementsByClassName("slide");
    if (x.length == 0) {
        return;
    }
    slideIndex++;
    if (slideIndex == x.length) {
        slideIndex = 0
    }
    for (var i = 0; i < x.length; i++) {
        x[i].style.opacity = i == slideIndex ? 1 : 0;
    }
    setTimeout(carousel, 10000);
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return;
}

function careers() { //Start up the careers pages
    var id = getQueryVariable('job');
    var x = document.getElementById("careers");
    if (x) {
        var url = "/commco/services/Careers.Service.ss?n=1";
        if (id) {
            url += "&id=" + id;
        }else{
            $("#main-text").show();
        }
        $.ajax({
            url: url,
            success: function (result) {
                var body = "";
                if (result.length == 0) {
                    if (id) {
                        body += "<h2>This opportunity is no longer available.</h2>";
                    } else {
                        body += "<h2>There are currently no opportunities available.</h2>";
                    }
                } else if (result.length == 1&&id) {
                    if(result[0].location&&result[0].location.length>0){
                    body += "<h2>Job Description</h2>";
                    }
                    body += "<div>" + result[0].description + "</div>";
                    if(result[0].location&&result[0].location.length>0){
                    body += "<h4>Title: " + result[0].name + "</h4>";
                    body += "<h4>Location: " + result[0].location + "</h4>";
                    }
                    if(result[0].salary&&result[0].salary.length>0){
                    body += "<h4>Salary: " + result[0].salary + "</h4>";
                    }
                    $("#subtitle").html(result[0].name);
                    $("#careers_form").show();
                    $("#custentity_bb1_sb_career").val(result[0].internalid);
                } else {
                    var description;
                    for (var i = 0; i < result.length; i++) {
                        body += "<a class=\"career-link\" href=\"/Careers?job=" + result[i].internalid + "\">";
                        body += "<h3>" + result[i].name + "</h3>";
                        description = result[i].description;
                        if (description && description.length > 150) {
                            description = description.substring(0, 150) + "...";
                        }
                        body += "<div>" + description + "</div>";
                        if(result[i].location&&result[i].location.length>0){
                        body += "<h4>Location: " + result[i].location + "</h4>";
                        }
                        body += "<div class=\"leader-link-align\">";
                        body += "<p class=\"leader-link-text\">LEARN MORE <i class=\"fa fa-arrow-right leader-link-arrow\"></i></p>";
                        body += "</div>";

                        body += "</a>";
                    }
                }
                $(x).html(body);
            }
        });
    }
}


var $ = jQuery;
$(document).ready(function () {
    console.log("ready!");
    carousel();
    careers();
    checkCookies();

    $(".navbar-toggle").click(function (e) {
        var $M = $("#navbar-menu");
        //console.log("show menu "+(!$M.hasClass("menu-slide-in")));
        if ($M.hasClass("menu-slide-in")) {
            $M.removeClass("menu-slide-in");
        } else {
            $M.addClass("menu-slide-in");
        }

    });
});

function checkContactForm() { //Check the contact us form
    var error = "";
    if (!$('#globalsubscriptionstatus').is(":checked")) {
        error += "Please tick the approval box to show that you understand our privacy policy.<br />";
    }
    var ids=["custentity_bb1_salutation","firstname","lastname","companyname","email","category","custentity_bb1_contact_reason","custentity_bb1_sb_website","phone","custentity_bb1_hear_about_us"];
    var names=["Title","First Name","Last Name","Company","Email","Sector","A reason for contact","Website","Phone","How did you hear about us?"];
    var val;
    for(var i=0;i<ids.length;i++){
        val=$("#"+ids[i]).val();
        if(!val||val==""){
            error+=names[i]+" is required.<br />";
        }
    }
    if (error.length > 0) {
        showModal("Unable to continue", error);
        return false;
    } else {
        return true;
    }
}

function checkCareersForm() { //Check the careers form
    var error = "";
    if (!$('#globalsubscriptionstatus').is(":checked")) {
        error += "Please tick the approval box to show that you understand our privacy policy.<br />";
    }
    var ids=["custentity_bb1_salutation","firstname","lastname","email","phone","custentity_bb1_hear_about_us"];
    var names=["Title","First Name","Last Name","Email","Phone","How did you hear about us?"];
    var val;
    for(var i=0;i<ids.length;i++){
        val=$("#"+ids[i]).val();
        if(!val||val==""){
            error+=names[i]+" is required.<br />";
        }
    }
    if (error.length > 0) {
        showModal("Unable to continue", error);
        return false;
    } else {
        return true;
    }
}
function checkCookies(){
    if(cookie("AcceptCookies")!="T"){
    $(".cookie-banner").show();
    }
}
function AcceptCookies(){
    cookie("AcceptCookies","T");
    $(".cookie-banner").hide();
}
function cookie (c_name, value, exdays) { //get or set a value using cookies. SHould be secure.
	if (value) {
		var exdate = new Date();
		exdays = exdays || 100000;
		exdate.setDate(exdate.getDate() + exdays);
		var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()) + ";path=/;";
		if (window.location.hostname != "localhost") {
			c_value += "domain=" + window.location.hostname + ";";
		}
		document.cookie = c_name + "=" + c_value;
	} else {
		var i, x, y, ARRcookies = document.cookie.split(";");
		for (i = 0; i < ARRcookies.length; i++) {
			x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
			y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
			x = x.replace(/^\s+|\s+$/g, "");
			if (x == c_name) {
				return unescape(y);
			}
		}
	}
};