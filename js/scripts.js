var products = [{
  "name":"Super cheesy burger",
  "description":"Discover our great cheesy burger with mozzarella,gorgonzola and pecorino",
  "price":8.5,
  "veggie":true,
  "quantity":0
},
{
  "name":"Bad beef burger",
  "description":"Full of angry beef, jalapeno peppers, fried onions and our special BBQ sauce",
  "price":12,"veggie":false,"quantity":0
},
{
  "name":"Spicy chili burger",
  "description":"HOT HOT HOT HOT HOT HOT",
  "price":10,
  "veggie":false,
  "quantity":0
}];

var quantity = 0;
var price = 0;


// Build list
$(window).ready(function()
{
  var $target = $(".table tr:first");

  // var content ="";
  // products.forEach(function(product){
  //   var line = '<tr class="prod" data-price="' + product.price +
  //     '" data-quantity="' + product.quantity + '"><td><strong>' +
  //     product.name + '</strong>';
  //   if (product.veggie)
  //     line += '&nbsp;<img src="img/vege-icon.png">';
  //   line += '<p>' + product.description + '</p></td><td><span class="price"><strong>' +
  //     product.price + ' €</strong></span></td><td class="quantity">' +
  //     product.quantity + '</td><td><button class="btn btn-primary more">+</button><button class="btn btn-primary less">-</button></td></tr>';
  //   content += line;
  // });

  var template = Handlebars.compile($("#food-template").html());

  var content = '';
  // products.forEach(function(product){
  //   content += template({
  //     name:product.name,
  //     price:product.price,
  //     description: product.description,
  //     veggie:product.veggie
  //   });
  // });
  

  $target.after(template(products));

  $(".overlay").hide();

  $(".less").addClass("disabled");

  // function total()
  // {
  //   var tPrice = 0;
  //   var tQuantity = 0;
  //   $(".prod").each(function()
  //   {
  //     var curQuantity = $(this).data("quantity");
  //     var curPrice = $(this).data("price") * curQuantity;
  //     tPrice += curPrice;
  //     tQuantity += curQuantity;
  //     $(this).find(".price strong").text(curPrice + " €");
  //   });
  //   $(".info .price strong").text(tPrice);
  //   $(".info .quantity").text(tQuantity);
  //   // $(".info .quantity").hide();
  // }
  function incQuantity()
  {
    var $prod = $(this).parent().parent();
    var prodPrice = $prod.data("price");
    var val = $prod.data("quantity");
    var plus = 0;
    var $less = $(this).parent().find(".less");
    if ($(this).hasClass("more"))
    {
      val++;
      quantity++;
      plus = prodPrice;
    }
    else
    {
      val--;
      quantity--;
      plus = -prodPrice;
    }
    if (val < 0)
    {
      val = 0;
      plus = 0;
      quantity++;
    }
    if (val === 0)
      $less.addClass("disabled");
    else
      $less.removeClass("disabled");
    price += plus;
    $prod.data("quantity", val);
    $prod.find(".quantity").text(val);
    $(".info .price strong").text(price + " €");
    $(".info .quantity").text(quantity);
    total();
  }

  $(".more, .less").click(incQuantity);

  // $(".more").hide();
});
