$(document).ready(function() {
  $('select').material_select();
  $('.carousel').carousel({fullWidth: true});
  $('.slider').slider({full_width: true});
  $('.carousel.carousel-slider').carousel({fullWidth: true});

  $('.vote').click(function(e) {
    e.preventDefault();
    var data = {
      title: $(this).attr('data-bill_number'),
      url: $(this).attr('data-description'),
      vote: $(this).attr('data-vote'),
      sen1: $(this).attr('data-rep1'),
      sen1phone: $(this).attr('data-rep1phone'),
      sen2: $(this).attr('data-rep2'),
      sen2phone: $(this).attr('data-rep2phone'),
      rep: $(this).attr('data-rep3'),
      repphone: $(this).attr('data-rep3phone')
    }
    $.ajax({
      url: '/profile',
      type: 'POST',
      data: data
    }).done(function(data) {
      window.location.href = '/profile/ballots';
    });
  });

  $('.edit-ballot').click(function(e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr('href'),
      type: 'PUT',
      data: {
        vote: $(this).attr('name')
      }
    }).done(function(data) {
      window.location.href = '/profile/ballots'
    });
  });

  $('.delete-ballot').click(function(e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr('href'),
      type: 'DELETE',
    }).done(function(data) {
      window.location.href = '/profile/ballots'
    });
  });

});
