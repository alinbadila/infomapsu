$('#menuDiv').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: false, // Activate on click
    alignment: 'right', // Aligns dropdown to left or right edge (works with constrain_width)
    gutter: 0, // Spacing from edge
    belowOrigin: false // Displays dropdown below the button
});

var focus = false;

function toggleSearchBar() {
    $('.searchdiv').slideToggle();
    $('#pac-input').val('');
    $('#pac-input').focus();
};

function hideAll() {
    $('.dropdown-content').hide();
}
