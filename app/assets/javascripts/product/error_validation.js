// 商品の出品・編集
$(function(){
  $('input:submit[id="submit"]').click(function(){
    if(!products_input_check()){
      return false;
    }
  });
});
// 入力内容チェックのための関数(商品)
function products_input_check(){
  var result = true;
  // 入力エラー文をリセット
  $("#img_error").empty();
  $("#product_name_error").empty();
  $("#text_error").empty();
  $("#category_error").empty();
  $("#state_error").empty();
  $("#postage_error").empty();
  $("#delivery_method_error").empty();
  $("#delivery_origin_error").empty();
  $("#arrival_date_error").empty();
  $("#price_error").empty();
  // 入力内容セット
  var product_name = $("#product_name").val();
  var product_detail = $("#product_detail").val();
  var parent_category = $("#parent_category").val();
  var status = $("#state-select").val();
  var postage = $("#postage-select").val();
  var delivery_method = $("#delivery-company").val();
  var delivery_origin = $("#address-select").val();
  var arrival_date = $("#delivery_days-select").val();
  var item_price = $("#product_price").val();
  var img = $("#img-file").val();
  var image = $("#item_images0").val();
  console.log(img)
  //編集画面に既に画像があればimgの中身をセット
  var pre_img = document.getElementById('pre_img');
  if(!pre_img == ""){
    img = "1"
  }
  // 入力内容チェック
  //画像（出品）
  if(image == ""){
    $("#img_error").html("出品画像は必須です。");
    $(".sell-form__image__dropbox__label").css('border-color','red');
    result = false;
  }
  //画像（編集）
  if(img == ""){
    $("#img_error").html("出品画像は必須です。");
    $(".js-file_group").css('border-color','red');
    result = false;
  }
  // 商品名
  if(product_name == ""){
    $("#product_name_error").html("商品名を記入してください。");
    $("#product_name").css('border-color','red');
    result = false;
  }
  //商品の説明
  if(product_detail == ""){
    $("#text_error").html("商品の説明記入してください。");
    $("#product_detail").css('border-color','red');
    result = false;
  }
  //カテゴリー(出品)
  if(parent_category == ""){
    $("#category_error").html("カテゴリーを選択してください。");
    $("#parent_category").css('border-color','red');
    result = false;
  }else{  //子カテゴリーのチェック
    var child_category = $("#child_category").val();
    if(child_category == "---"){
    $("#category_error").html("二番目のカテゴリーを選択してください。");
    $("#child_category").css('border-color','red');
    result = false;
    }else{  //孫カテゴリーのチェック
      var grandchild_category = $("#grandchild_category").val()
      if(grandchild_category == "---" || grandchild_category == ""){
      $("#category_error").html("三番目のカテゴリーを選択してください。");
      $("#grandchild_category").css('border-color','red');
      result = false;
      }
    }
  }
  //カテゴリー(編集)
  if(parent_category == "---"){
    $("#category_error").html("カテゴリーを選択してください。");
    $("#parent_category").css('border-color','red');
    result = false;
  }else{  //子カテゴリーのチェック
    var child_category = $("#child_category").val();
    if(child_category == "---"){
    $("#category_error").html("二番目のカテゴリーを選択してください。");
    $("#child_category").css('border-color','red');
    result = false;
    }else{  //孫カテゴリーのチェック
      var grandchild_category = $("#grandchild_category").val()
      if(grandchild_category == "---" || grandchild_category == ""){
      $("#category_error").html("三番目のカテゴリーを選択してください。");
      $("#grandchild_category").css('border-color','red');
      result = false;
      }
    }
  }
  //商品の状態
  if(status == ""){
    $("#state_error").html("商品の状態を選択してください。");
    $("#state-select").css('border-color','red');
    result = false;
  }
  //配送料の負担
  if(postage == ""){
    $("#postage_error").html("配送料の負担を選択してください。");
    $("#postage-select").css('border-color','red');
    result = false;
  }
  //配達の方法
  if(delivery_method == ""){
    $("#delivery_method_error").html("配達の方法を選択してください。");
    $("#delivery-company").css('border-color','red');
    result = false;
  }
  //発送元の地域
  if(delivery_origin == ""){
    $("#delivery_origin_error").html("発送元の地域を選択してください。");
    $("#address-select").css('border-color','red');
    result = false;
  }
  //発送までの日数
  if(arrival_date == ""){
    $("#arrival_date_error").html("発送までの日数を選択してください。");
    $("#delivery_days-select").css('border-color','red');
    result = false;
  }
  if(item_price == "" ){
    $("#price_error").html("価格を入力してください。");
    $("#product_price").css('border-color','red');
    result = false;
  }else if(!item_price.match(/[0-9]/)){
    $("#price_error").html("半角数字で入力してください。");
    $("#product_price").css('border-color','red');
    result = false;
  }else if(item_price <300){
    $("#price_error").html("300円以上で入力してください。");
    $("#product_price").css('border-color','red');
    result = false;
  }else if(item_price > 9999999){
    $("#price_error").html("1000万円以下で入力してください。");
    $("#product_price").css('border-color','red');
    result = false;
  }
  return result;
}