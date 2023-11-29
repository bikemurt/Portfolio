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

$.ajax({
    url: '../components/footer.txt', // Replace with the path to your text file
    dataType: 'text',
    success: function (data) {
        // Update the content of the div with the text from the file
        $('#footer').html(data);
    },
    error: function (error) {
        console.error('Error loading text file:', error);
    }
});
