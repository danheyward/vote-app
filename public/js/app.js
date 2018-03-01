$(document).ready(function() {
  $('select').material_select();
  $('.carousel').carousel({fullWidth: false});
  $('.slider').slider({full_width: true});
  $('.carousel.carousel-slider').carousel({fullWidth: false});
  $('.modal-trigger').leanModal();

  $('.vote').click(function(e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr('href'),
      method: 'PUT',
      data: {
        title: $(this).attr('data-bill_number'),
        url: $(this).attr('data-description'),
        vote: $(this).attr('data-vote'),
        sen1: $(this).attr('data-rep1'),
        sen2: $(this).attr('data-rep2'),
        rep: $(this).attr('data-rep3')
      }
    })
  })

});
