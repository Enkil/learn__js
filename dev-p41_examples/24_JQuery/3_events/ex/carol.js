
$(document).ready(function() {

  $('#switcher .button').hover(function() {
    $(this).addClass('hover');
  }, function() {
    $(this).removeClass('hover');
  });

  var toggleStyleSwitcher = function(event) {
    if (!$(event.target).is('.button')) {
      $('#switcher .button').toggleClass('hidden');
    }
  };
  $('#switcher').click(toggleStyleSwitcher);

  $('#switcher').click();

  var setBodyClass = function(className) {
    $('body').removeClass();
    $('body').addClass(className);
    $('#switcher .button').removeClass('selected');
    $('#switcher-' + className).addClass('selected');
    
    if (className == 'default') {
      $('#switcher').click(toggleStyleSwitcher);
    }
    else {
      $('#switcher').unbind('click', toggleStyleSwitcher);
      $('#switcher .button').removeClass('hidden');
    }
  };

  $('#switcher').click(function(event) {
    if ($(event.target).is('.button')) {
      if (event.target.id == 'switcher-default') {
        setBodyClass('default');
      }
      if (event.target.id == 'switcher-narrow') {
        setBodyClass('narrow');
      }
      else if (event.target.id == 'switcher-large') {
        setBodyClass('large');
      }
    }
  });

  $(document).keyup(function(event) {
    switch (String.fromCharCode(event.keyCode)) {
      case 'D':
        setBodyClass('default');
        break;
      case 'N':
        setBodyClass('narrow');
        break;
      case 'L':
        setBodyClass('large');
        break;
    }
  });
});

