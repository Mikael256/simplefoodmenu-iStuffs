/* FUNCTIONS */
function refresh(){
  var $rows    = $('table tr[data-price]').not('.info');
  var total    = 0;
  var totalQte = 0;

  $rows.each(function(){
    var prix = $(this).data('price');
    var qte  = $(this).data('quantity');

    if (qte <= 0) {
      qte = 0;
      $(this).find('.less').addClass('disabled');
    } else {
      $(this).find('.less').removeClass('disabled');
    }

    $(this).find('.quantity').text(qte);
    totalQte += qte;
    var subTotal = prix * qte;
    total += subTotal;
  });
    var $info = $('.info');
    $info.data('price',total);
    $info.data('quantity',totalQte);
    $('.info .price').text( total + '€');
    $('.info .quantity').text(totalQte);
}

/* DATA */
var menu = [
  {"name":"Super cheesy burger","description":"Discover our great cheesy burger with mozzarella, gorgonzola and pecorino","price":8.5,"veggie":true,"quantity":0},
  {"name":"Bad beef burger","description":"Full of angry beef, jalapeno peppers, fried onions and our special BBQ sauce","price":12,"veggie":false,"quantity":0},
  {"name":"Spicy chili burger","description":"HOT HOT HOT HOT HOT HOT","price":10,"veggie":false,"quantity":0}
];

/* CREATE ROWS */
menu.forEach(function(e){
  var name   = e.name;
  var desc   = e.description;
  var price  = e.price;
  var veggie = e.veggie;

  var vegIcon = '';
  if (veggie) {
    vegIcon = '&nbsp;<img src="img/vege-icon.png">';
  }

var row = '<tr data-price="' + price + '" data-quantity="0">'+
      '<td>'+
          '<strong>' + name + '</strong>'+ vegIcon +
          '<p>' + desc + '</p>'+
      '</td>'+
      '<td>'+
          '<span class="price"><strong>' + price + ' €</strong></span>'+
      '</td>'+
      '<td class="quantity">0</td>'+
      '<td>'+
          '<button class="btn btn-primary more">+</button>'+
          '<button class="btn btn-primary less">-</button>'+
      '</td>'+
  '</tr>';
$('.table tr').first().after(row);

});

/* INIT PAGE */
refresh();
$('.overlay').fadeOut();

/* EVENTS */
$('.more').click(function(){
  var $thisRow = $(this).closest('tr');
  var qte = $thisRow.data('quantity')+1;
  $thisRow.find('.less').removeClass('disabled');
  $thisRow.data('quantity', qte );
  //$thisRow.find('.quantity').text(qte);

  refresh();
  return false;
});
$('.less').click(function(){
  var $thisRow = $(this).closest('tr');
  var qte = $thisRow.data('quantity')-1;

  if (qte <= 0) {
    qte = 0;
    $(this).find('.less').addClass('disabled');
  }

  $thisRow.data('quantity', qte );
  //$thisRow.find('.quantity').text(qte);

  refresh();
  return false;
});
