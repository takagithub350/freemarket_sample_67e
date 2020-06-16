$(document).ready(function () {
  // カテゴリーセレクトボックスのオプションを作成
  function appendOption(category) {
    var html = `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
    return html;
  }
  // 子カテゴリーの表示作成
  function appendChidrenBox(insertHTML) {
    var childSelectHtml = "";
    childSelectHtml = `<div class='listing-select-wrapper__added' id= 'children_wrapper'>
                        <div class='listing-select-wrapper__box'>
                          <select class="listing-select-wrapper__box--select" id="child_search_category" name="q[category_id_eq]">
                            <option value="---" data-category="---">---</option>
                            ${insertHTML}
                          <select>
                        </div>
                      </div>`;
    $(".listing-product-detail__category").append(childSelectHtml);
  }
  // 孫カテゴリーの表示作成
  function appendGrandchidrenBox(insertHTML) {
    var grandchildSelectHtml = "";
    grandchildSelectHtml = `<div class='listing-select-wrapper__added' id= 'grandchildren_wrapper'>
                              <div class='listing-select-wrapper__box'>
                                <select class="listing-select-wrapper__box--select" id="grandchild_category" name="q[category_id_eq]">
                                  <option value="---" data-category="---">---</option>
                                  ${insertHTML}
                                </select>
                              </div>
                            </div>`;
    $(".listing-product-detail__category").append(grandchildSelectHtml);
  }
  // 親カテゴリー選択後のイベント
  $("#q_category_id_eq").on("change", function () {
    var parentCategory = document.getElementById("q_category_id_eq").value;
    console.log(parentCategory);
    //選択された親カテゴリーの名前を取得
    if (parentCategory != "---") {
      //親カテゴリーが初期値でないことを確認
      $.ajax({
        url: "/products/get_category_children",
        type: "GET",
        data: { parent_id: parentCategory },
        dataType: "json",
      })
        .done(function (children) {
          console.log(children);
          $("#children_wrapper").remove(); //親が変更された時、子以下を削除するする
          $("#grandchildren_wrapper").remove();
          $("#size_wrapper").remove();
          $("#brand_wrapper").remove();
          var insertHTML = "";
          children.forEach(function (child) {
            insertHTML += appendOption(child);
          });
          appendChidrenBox(insertHTML);
        })
        .fail(function () {
          alert("カテゴリー取得に失敗しました");
        });
    } else {
      $("#children_wrapper").remove(); //親カテゴリーが初期値になった時、子以下を削除するする
      $("#grandchildren_wrapper").remove();
      $("#size_wrapper").remove();
      $("#brand_wrapper").remove();
    }
  });
  // 子カテゴリー選択後のイベント
  $(".listing-product-detail__category").on(
    "change",
    "#child_search_category",
    function () {
      var childId = $("#child_search_category option:selected").data(
        "category"
      ); //選択された子カテゴリーのidを取得
      console.log(childId);
      if (childId != "---") {
        //子カテゴリーが初期値でないことを確認
        $.ajax({
          url: "/products/get_category_grandchildren",
          type: "GET",
          data: { child_id: childId },
          dataType: "json",
        })
          .done(function (grandchildren) {
            if (grandchildren.length != 0) {
              $("#grandchildren_wrapper").remove(); //子が変更された時、孫以下を削除するする
              $("#size_wrapper").remove();
              $("#brand_wrapper").remove();
              var insertHTML = "";
              grandchildren.forEach(function (grandchild) {
                insertHTML += appendOption(grandchild);
              });
              appendGrandchidrenBox(insertHTML);
            }
          })
          .fail(function () {
            alert("カテゴリー取得に失敗しました");
          });
      } else {
        $("#grandchildren_wrapper").remove(); //子カテゴリーが初期値になった時、孫以下を削除する
        $("#size_wrapper").remove();
        $("#brand_wrapper").remove();
        1;
      }
    }
  );
});
