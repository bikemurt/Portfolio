function loadMenu(menuPath, menuID)
{
    if (menuPath == '') return;
    $.ajax({
        url: menuPath,
        dataType: 'text',
        success: function (data) {
            $('#' + menuID).html(data);
    
            $("#" + menuID + " a").each(function()
            {
                if (this.href == window.location.href ||
                    window.location.href.includes("3dart/models") && this.innerText == "3D Work"
                    )
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
    url: '/components/header.txt',
    dataType: 'text',
    success: function (data) {
        $('#header').html(data);
    },
    error: function (error) {
        console.error('Error loading text file:', error);
    }
});

$.ajax({
    url: '/components/footer.txt',
    dataType: 'text',
    success: function (data) {
        $('#footer').html(data);
    },
    error: function (error) {
        console.error('Error loading text file:', error);
    }
});