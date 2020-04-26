$(document).ready(function () {

    $(".icon-toggler").on('click', function (e) {
        // e.preventDefault();
        $(this).toggleClass("remove-toggle");
        $(".menu").slideToggle();
    });
    $(".sub-menu > a").on('click', function (e) {
        e.preventDefault();
        $(this).parent().toggleClass("dropdown");
    });


    // pop up datepicker slider
    $('.datepicker').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        swipeToSlide: !0,
        initialSlide: 5,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 5,
            }
        }, {
            breakpoint: 700,
            settings: {
                slidesToShow: 4,
            }
        }, {
            breakpoint: 550,
            settings: {
                slidesToShow: 3,
            }
        }, {
            breakpoint: 430,
            settings: {
                slidesToShow: 2,
            }
        }]
    });

    $('#salesForceForm input[name=radio1],#salesForceForm input[name=radio]').on('change', function () {
        var roleValue = $('input[name=radio1]:checked', '#salesForceForm').val();
        var roleValue1 = $('input[name=radio]:checked', '#salesForceForm').val();
        // roleValue = $('input[name=radio1]:checked', '#salesForceForm').val();
        /*
        if (roleValue1 === "Life Sciences") {
            $('.roleRadio').addClass("hide");
        } else {
            $('.roleRadio').removeClass("hide");
        }*/
        // || roleValue1 === "Life Sciences"
        if (roleValue === "Other (include blank text field to be completed by requestor)") {
            $('.other-role').addClass('show');
        } else {
            $('.other-role').removeClass('show');
        }
    });
    //slick js
    $('.item-wrap').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        autoplaySpeed: 2000,
        responsive: [{
            breakpoint: 768,
            settings: {
                centerMode: true,
                slidesToShow: 1,
                centerPadding: "25px"
            }
        }]
    });

    $('.arrow').click(function () {
        if ($(this).hasClass('expand')) {
            $(this).removeClass('expand').addClass('collaps');
            $('.tell-more-form form').addClass('fullHight');
        } else {
            $(this).addClass('expand').removeClass('collaps');
            $('.tell-more-form form').removeClass('fullHight');
        }
    });

    $('.rwsLink').click(function () {
        $('#salesForm .rsw').addClass('show');
        $('#salesForm .sf').addClass('hide');
    });

    var $content = $('#content');
    var $homeBlog = $('#homeBlog');
    var data = {
        rss_url: 'https://medium.com/feed/@internal_98669'
    };
    $.get('https://api.rss2json.com/v1/api.json', data, function (response) {
        console.log(response);
        if (response.status == 'ok') {
            var output = '';
            var homeBlog = '';
            $.each(response.items, function (k, item) {
                output += '<li> <a target="_blank" href="' + item.link + '">';
                output += '<span>' + item.title + '</span></a></li>';
            });
            var firstContent = response.items[0].content;
            homeBlog += ' <h3 class="summary">' + response.items[0].title + '</h3>';
            homeBlog += ' <p class="description">' + $(firstContent).find("img").remove().end().html() + '<a target="_blank" href="' + response.items[0].link + '">Read more</a></p>';
            $content.html(output);
            $homeBlog.html(homeBlog);
            console.log($(firstContent).find("figure").remove().end().html())
        }
    });
});


// Sales force form
$(function () {
    var form = $('#salesForceForm');
    var formMessages = $('#form-messages');
    var emailContent = "";


    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        //e.preventDefault();
        //alert('changes reflected');
        emailContent += "<h1> " + $('input[name=radio]:checked', '#salesForceForm').val() + "</h1>";
        emailContent += "<h1> " + $('#first_name').val() + " " + $('#last_name').val() + "</h1>";
        emailContent += "<h2> Telephone:" + $('#telephone').val() + "</h2>";
        emailContent += "<h2> Email:" + $('#email').val() + "</h2>";
        emailContent += "<h3> Role:";
        if ($('input[name=radio1]:checked', '#salesForceForm').val() == "Other" || $('input[name=radio]:checked', '#salesForceForm').val() == "Life Sciences") {
            emailContent += "<span>" + $('#role').val() + " </span>";
        } else {
            emailContent += "<span>" + $('input[name=radio1]:checked', '#salesForceForm').val() + " </span>";
        }
        emailContent += "</h3>";
        emailContent += "<h4> Organization:" + $('#organization').val() + "</h4>";


        $.ajax({
            type: 'POST',
            url: "https://us-central1-mendel-health.cloudfunctions.net/send-mail",
            data: { "to": "sales@mendel.ai", "html": emailContent, "subject": "Try Free Request" },
            success: function (res) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');
                console.log(res);
                // Set the message text.
                $(formMessages).text('Thank you, we have received your request.');
                setTimeout(function () {
                    $.fancybox.close();
                }, 2000);
                // Clear the form.
                $(form)[0].reset();
            },
            error: function (err) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');
                console.log(err);
                $(formMessages).text('Oops! An error occurred and your request was not be sent.');
            }
        });


    });

    // TODO: The rest of the code will go here...
});

// Let Us know more Form
$(function () {
    var letUsForm = $('#letUsForm');
    var letFormMessages = $('#let-form-messages');
    var letEmailContent = "";

    $(letUsForm).submit(function (e) {
        //e.preventDefault();
        letEmailContent += "<h1> " + $('#let_first_name').val() + " " + $('#let_last_name').val() + "</h1>";
        letEmailContent += "<h2> Title:" + $('#let_title').val() + "</h2>";
        letEmailContent += "<h2> Email:" + $('#let_email').val() + "</h2>";
        letEmailContent += "<h3> Role:";
        letEmailContent += "<span>" + $('#let_select').val() + " </span>";

        letEmailContent += "</h3>";
        letEmailContent += "<h4> Company:" + $('#let_company').val() + "</h4>";
        letEmailContent += "<p> Message:" + $('#message').val() + "</p>";

        $.ajax({
            type: 'POST',
            url: "https://us-central1-mendel-health.cloudfunctions.net/send-mail",
            data: { "to": "sales@mendel.ai", "html": letEmailContent, "subject": "Let us know more" },
            success: function (res) {
                // Make sure that the formMessages div has the 'success' class.
                $(letFormMessages).removeClass('error');
                $(letFormMessages).addClass('success');
                console.log(res);
                // Set the message text.
                // $(letFormMessages).text(res);
                $(letFormMessages).text('Thank you, we have received your request.');

                // Clear the form.
                $(letUsForm)[0].reset();
            },
            error: function (err) {
                // Make sure that the formMessages div has the 'error' class.
                $(letFormMessages).removeClass('success');
                $(letFormMessages).addClass('error');

                $(letFormMessages).text('Oops! An error occurred and your request was not be sent.');
            }
        })

    });

});


// Sales force form
$(function () {
    var form = $('#studyForm');
    var formMessages = $('#studySuccessMessage');
    var emailContent = "";


    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();
        e.stopPropagation(); // only neccessary if something above is listening to the (default-)event too

        //e.preventDefault();
        //alert('changes reflected');
        if ($('#fullName').val() == "") {
            $('#fullName').parent().addClass("error");
            return false;
        }
        else if ($('#studyEmail').val() == "") {
            $('#studyEmail').parent().addClass("error");
            return false;

        }
        else if ($('#studyMessage').val() == "") {
            $('#studyMessage').parent().addClass("error");
            return false;

        }
        else {
            emailContent += "<h1> " + $('#fullName').val() + "</h1>";
            emailContent += "<h2> Email:" + $('#studyEmail').val() + "</h2>";
            $('#studyRole').val() ? emailContent += "<h3> Role:" + $('#studyRole').val() + "</h3>" : "";
            $('#studyOrganization').val() ? emailContent += "<h4> Organization:" + $('#studyOrganization').val() + "</h4>" : "";
            emailContent += "<p>" + $('#studyMessage').val() + "</p>";


            $.ajax({
                type: 'POST',
                url: "https://us-central1-mendel-health.cloudfunctions.net/send-mail",
                data: { "to": "hello@mendel.ai", "html": emailContent, "subject": "Study Contact Us " },
                success: function (res) {
                    // Make sure that the formMessages div has the 'success' class.
                    $(form).hide();
                    $('.thanku').show();
                    $(formMessages).removeClass('error');
                    $(formMessages).addClass('success');
                    // Set the message text.
                    // $(formMessages).text('Thank you, we have received your request.');
                    setTimeout(function () {
                        $.fancybox.close();
                    }, 3000);
                    // Clear the form.
                    $(form)[0].reset();
                },
                error: function (err) {
                    // Make sure that the formMessages div has the 'error' class.
                    $(formMessages).removeClass('success');
                    $(formMessages).addClass('error');
                    console.log(err);
                    $(formMessages).text('Oops! An error occurred and your request was not be sent.');
                }
            });
        }



    });

    // TODO: The rest of the code will go here...
});





//header scroll js
$(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
        $('.header').addClass('header-fixed');
    }
    else {
        $('.header').removeClass('header-fixed');
    }
});

// update fancybox title
$(function () {


    $("[data-fancybox]").fancybox({
        afterShow: function (instance, current, e) {
            // fancybox is open, run myFunct()
            console.log(instance);
            console.log(current.opts.popType);
            console.log(e);
            if (current.opts.popType === "rws") {
                $('#salesForm .rws').addClass('show').removeClass('hide');
                $('#salesForm .sf,#salesForm .noTitle').addClass('hide').removeClass('show');
            } else if (current.opts.popType === "noTitle") {
                $('#salesForm .noTitle').addClass('show').removeClass('hide');
                $('#salesForm .rws,#salesForm .sf').addClass('hide').removeClass('show');
            } else {
                $('#salesForm .sf').addClass('show').removeClass('hide');
                $('#salesForm .rws,#salesForm .noTitle').addClass('hide').removeClass('show');
            }

        }
    });
});



// $(document).ready(function () {
//     if (window.location.href.indexOf("research") > -1) {
//         console.log("hsbdk")
//         window.location.href = "/life_sciences.html";

//     }
// });