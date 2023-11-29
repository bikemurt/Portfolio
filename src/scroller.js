$(document).ready(function () {
    $(window).scroll(function () {
        parallax();
    });

    function parallax() {
        var scrollPosition = $(window).scrollTop();
        
        for (section of sections)
        {
            $("#" + section).css('background-position', 'center ' + (-scrollPosition * 0.5) + 'px');
        }

    }
});

function loadMenu(menuPath, menuID)
{
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

loadMenu('/components/menu.txt', 'menu')

if ($("#menu3dart").length)
{   
    loadMenu('/components/menu3dart.txt', 'menu3dart')
}

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
