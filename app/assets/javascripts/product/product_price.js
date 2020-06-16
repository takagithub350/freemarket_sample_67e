$(function(){
  $('#product_price').keyup(function(){
    let price= $(this).val();
    if (price >= 300 && price <= 9999999){
      let fee = Math.floor(price * 0.1);
      // 小数点以下切り捨て
      let profit = (price - fee);
      $('.sell-price__box').text('¥'+fee.toLocaleString());
      // 対象要素の文字列書き換える
      $('.total-right.profits').text('¥'+profit.toLocaleString());
    } else{
      $('.sell-price__box').html('ー');
      $('.total-right.profits').html('ー');
    }
  });
  $('#product_price').click(function(){
    let price= $(this).val();
    if (price >= 300 && price <= 9999999){
      let fee = Math.floor(price * 0.1);
      // 小数点以下切り捨て
      let profit = (price - fee);
      $('.sell-price__box').text('¥'+fee.toLocaleString());
      // 対象要素の文字列書き換える
      $('.total-right.profits').text('¥'+profit.toLocaleString());
    } else{
      $('.sell-price__box').html('ー');
      $('.total-right.profits').html('ー');
    }
  });
});