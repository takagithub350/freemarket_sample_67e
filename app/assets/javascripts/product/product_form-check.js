// 各フォームの入力チェック
$(function(){
  //画像
  $('#image-input').on('focus',function(){
    $('#img_error').text('');
    $('#image-input').on('blur',function(){
      $('#img_error').text('');
      let imageLength = $('#output-box').children('li').length;
      if(imageLength ==''){
        $('#img_error').text('画像がありません');
        $('.sell-form__image__dropbox__label').css('border-color','red');
      }else{
        $('#img_error').text('');
      }
    });
  });

  //送信しようとした時
  $('form').on('submit',function(){
    let imageLength = $('#output-box').children('li').length;
    if(imageLength ==''){
      $('body, html').animate({ scrollTop: 0 }, 500);
      $('#img_error').text('画像がありません');
    }else if(imageLength >10){
      $('body, html').animate({ scrollTop: 0 }, 500);
      $('#img_error').text('画像を5枚以下にして下さい');
    }else{
      return true;
    }
  });

  //商品名
  $('#product_name').on('blur',function(){
    let value = $(this).val();
    if(value == ""){
      $('#product_name_error').text('入力してください');
      $(this).css('border-color','red');
    }else{
      $('#product_name_error').text('');
      $(this).css('border-color','rgb(204, 204, 204)');
    }
  });

  //商品説明
  $('#product_detail').on('blur',function(){
    let value = $(this).val();
    if(value == ""){
      $('#text_error').text('入力してください');
      $(this).css('border-color','red');
    }else{
      $('#text_error').text('');
      $(this).css('border-color','rgb(204, 204, 204)');
    }
  });

  //カテゴリー
  $('#category_id').on('blur',function(){
    let value = $(this).val();
    if(value == ""){
      $('#category_error').text('入力してください');
      $(this).css('border-color','red');
    }else{
      $('#category_error').text('');
      $(this).css('border-color','rgb(204, 204, 204)');
    }
  });

  //状態
  $('#state-select').on('blur',function(){
    let value = $(this).val();
    if(value == ""){
      $('#state_error').text('選択して下さい');
      $(this).css('border-color','red');
    }else{
      $('#state_error').text('');
      $(this).css('border-color','rgb(204, 204, 204)');
    }
  });

  //配送料の負担
  $('#postage-select').on('blur',function(){
    let value = $(this).val();
    if(value == ""){
      $('#postage_error').text('選択して下さい');
      $(this).css('border-color','red');
    }else{
      $('#postage_error').text('');
      $(this).css('border-color','rgb(204, 204, 204)');
    }
  });

  //配達の方法
  $('#delivery-company').on('blur',function(){
    let value = $(this).val();
    if(value == ""){
      $('#delivery_method_error').text('選択して下さい');
      $(this).css('border-color','red');
    }else{
      $('#delivery_method_error').text('');
      $(this).css('border-color','rgb(204, 204, 204)');
    }
  });
  
  //発送元の地域
  $('#address-select').on('blur',function(){
    let value = $(this).val();
    if(value == ""){
      $('#delivery_origin_error').text('選択して下さい');
      $(this).css('border-color','red');
    }else{
      $('#delivery_origin_error').text('');
      $(this).css('border-color','rgb(204, 204, 204)');
    }
  });

  //発送までの日数
  $('#delivery_days-select').on('blur',function(){
    let value = $(this).val();
    if(value == ""){
      $('#arrival_date_error').text('選択して下さい');
      $(this).css('border-color','red');
    }else{
      $('#arrival_date_error').text('');
      $(this).css('border-color','rgb(204, 204, 204)');
    }
  });

  //価格
  $('.sell-form__box__input__label__number').on('blur',function(){
    let value = $(this).val();
    if(value < 300 || value > 999999){
      $('#price_error').text('300以上999999以下で入力してください');
      $(this).css('border-color','red');
    }else{
      $('#price_error').text('');
      $(this).css('border-color','rgb(204, 204, 204)');
    }
  });
});