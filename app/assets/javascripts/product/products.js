$(function(){
  // 画像が選択された時プレビュー表示、inputの親要素のdivをイベント元に指定
  $('#image-input').on('change', function(e){

    //ファイルオブジェクトを取得する
    let files = e.target.files;
    $.each(files, function(index, file) {
      let reader = new FileReader();

      //画像でない場合は処理終了
      if(file.type.indexOf("image") < 0){
        alert("画像ファイルを指定してください。");
        return false;
      }
      //アップロードした画像を設定する
      reader.onload = (function(file){
        return function(e){
          let imageLength = $('#output-box').children('li').length;
          // 表示されているプレビューの数を数える

          let labelLength = $("#image-input>label").eq(-1).data('label-id');
          // #image-inputの子要素labelの中から最後の要素のカスタムデータidを取得

          // プレビュー表示
          $('#image-input').before(`<li class="preview-image" id="upload-image${labelLength}" data-image-id="${labelLength}">
                                      <figure class="preview-image__figure">
                                        <img src='${e.target.result}' title='${file.name}' width="114" height="80">
                                      </figure>
                                      <div class="preview-image__button">
                                        <a class="preview-image__button__delete" data-image-id="${labelLength}">削除</a>
                                      </div>
                                    </li>`);
          $("#image-input>label").eq(-1).css('display','none');
          // 入力されたlabelを見えなくする

          if (imageLength < 4) {
            // 表示されているプレビューが4以下なら、新たにinputを生成する
            $("#image-input").append(`<label for="item_images${labelLength+1}" class="sell-form__image__dropbox__label" data-label-id="${labelLength+1}">
                                        <input id="item_images${labelLength+1}" style="display: none;" type="file" name="product[images_attributes][${labelLength+1}][image]">
                                        <div class="fas fa-camera fa-lg"></i>
                                      </label>`);
          };
        };
      })(file);
      reader.readAsDataURL(file);
    });
  });

  $(document).on('click', '.preview-image__button__delete', function(){
    let targetImageId = $(this).data('image-id');
    // イベント元のカスタムデータ属性の値を取得
    $(`#upload-image${targetImageId}`).remove();
    //プレビューを削除
    $(`[for=item_images${targetImageId}]`).remove();
    //削除したプレビューに関連したinputを削除

    let imageLength = $('#output-box').children('li').length;
    // 表示されているプレビューの数を数える
    if (imageLength ==9) {
      let labelLength = $("#image-input>label").eq(-1).data('label-id');
      // 表示されているプレビューが９なら,#image-inputの子要素labelの中から最後の要素のカスタムデータidを取得
      $("#image-input").append(`<label for="item_images${labelLength+1}" class="sell-form__image__dropbox__label" data-label-id="${labelLength+1}">
                                  <input class="sell-container__content__upload__items__box__input" id="item_images${labelLength+1}" style="display: none;" type="file" name="product[images_attributes][${labelLength+1}][image]">
                                  <div class="fas fa-camera fa-lg"></i>
                                </label>`);
    };
  });

 
  var dropArea = document.getElementById("output-box");

  //loadイベント発生時に発火するイベント
  window.onload = function(e){
    //ドラッグした要素がドロップターゲットの上にある時にイベントが発火
    dropArea.addEventListener("dragover", function(e){
      e.preventDefault();
      //ドロップエリアに影がつく
      $(this).children('#image-input').css({'border': '1px solid rgb(204, 204, 204)','box-shadow': '0px 0px 4px'})
    },false);
    //ドラッグした要素がドロップターゲットから離れた時に発火するイベント
    dropArea.addEventListener("dragleave", function(e){
      e.preventDefault();
       //ドロップエリアの影が消える
      $(this).children('#image-input').css({'border': '1px dashed rgb(204, 204, 204)','box-shadow': '0px 0px 0px'})      
    },false);

    //ドラッグした要素をドロップした時に発火するイベント
    dropArea.addEventListener("drop", function(e) {
      e.preventDefault();
      $(this).children('#item_images').css({'border': '1px dashed rgb(204, 204, 204)','box-shadow': '0px 0px 0px'});
      var files = e.dataTransfer.files;
      var dataBox = new DataTransfer();
      var file_field = document.querySelector('input[type=file]')
      // 画像を管理するための配列を定義する。
      var files_array = [];

      //ドラッグアンドドロップで取得したデータについて、プレビューを表示
      $.each(files, function(i,file){
        //アップロードされた画像を元に新しくfilereaderオブジェクトを生成
        var fileReader = new FileReader();
        //dataTransferオブジェクトに値を追加
        dataBox.items.add(file)
        file_field.files = dataBox.files
        //lengthで要素の数を取得
        let imageLength = $('#output-box').children('li').length;
        let labelLength = $("#image-input>label").eq(-1).data('label-id');
        //指定されたファイルを読み込む
        fileReader.readAsDataURL(file);
        
        //image fileがロードされた時に発火するイベント
        fileReader.onload = function() {
          //変数srcにresultで取得したfileの内容を代入
          var src = fileReader.result

          
          $('#image-input').before(`<li class="preview-image" id="upload-image${labelLength}" data-image-id="${labelLength}">
                                      <figure class="preview-image__figure">
                                        <img src='${src}' title='${file.name}' width="114" height="80">
                                      </figure>
                                      <div class="preview-image__button">
                                        <a class="preview-image__button__delete" data-image-id="${labelLength}">削除</a>
                                      </div>
                                    </li>`);
          $("#image-input>label").eq(-1).css('display','none');
          // 入力されたlabelを見えなくする

          if (imageLength < 9) {
            // 表示されているプレビューが９以下なら、新たにinputを生成する
            $("#image-input").append(`<label for="item_images${labelLength+1}" class="sell-form__image__dropbox__label" data-label-id="${labelLength+1}">
                                        <input type="file" value:"" style="display: none;" id="item_images${labelLength+1}" name="product[images_attributes][${labelLength+1}][image]">
                                        <div class="fas fa-camera fa-lg"></i>
                                      </label>`);
          };
        };
      })
    })
  }
  // file_fieldのnameに動的なindexをつける為の配列
  let fileIndex = [1,2,3,4,5,6,7,8,9,10];
  // 既に使われているindexを除外
  lastIndex = $('.js-file_group:last').data('index');
  fileIndex.splice(0, lastIndex);

  $('.hidden-destroy').hide();
  $('#output-box').on('click', '.preview-image__button__delete', function() {
    const targetIndex = $(this).parent().data('index');
    // 該当indexを振られているチェックボックスを取得する
    const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
    // もしチェックボックスが存在すればチェックを入れる
    if (hiddenCheck) hiddenCheck.prop('checked', true);

    $(this).parent().remove();
    $(`img[data-index="${targetIndex}"]`).remove();

    // 画像入力欄が0個にならないようにしておく
    if ($('.sell-container__content__upload__items__box__label').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
  });
});
