
function parallax() {
    var scrollPosition = $(window).scrollTop();
    
    for (var i = 0; i < sections.length; i++)
    {
        var s = sections[i];
        var offset = $("#" + s).position().top - $("#section1").position().top;

        $("#" + s).css('background-position', 'center ' + (-scrollPosition * 0.5 - offset) + 'px');
        
    }

}

$(document).ready(function () {
    $(window).scroll(function () {
        parallax();
    });

    parallax();
});

function loadMenu(menuPath, menuID)
{
    if (menuPath == '') return;
    $.ajax({
        url: menuPath, // Replace with the path to your text file
        dataType: 'text',
        success: function (data) {
            // Update the content of the div with the text from the file
            $('#' + menuID).html(data);
    
            $("#" + menuID + " a").each(function()
            {
                if (this.href == window.location.href)
                {
                    this.parentNode.classList.add('current-page');
                }
            });
        },
        error: function (error) {
            console.error('Error loading text file:', error);
        }
    });
}

var menu = '/components/menu.txt';
var submenu = '/components/menu3dart.txt';

loadMenu(menu, 'menu')

if ($("#menu3dart").length)
{   
    loadMenu(submenu, 'menu3dart')
}

$.ajax({
    url: '/components/header.txt', // Replace with the path to your text file
    dataType: 'text',
    success: function (data) {
        // Update the content of the div with the text from the file
        $('#header').html(data);
    },
    error: function (error) {
        console.error('Error loading text file:', error);
    }
});

$.ajax({
    url: '/components/footer.txt', // Replace with the path to your text file
    dataType: 'text',
    success: function (data) {
        // Update the content of the div with the text from the file
        $('#footer').html(data);
    },
    error: function (error) {
        console.error('Error loading text file:', error);
    }
});