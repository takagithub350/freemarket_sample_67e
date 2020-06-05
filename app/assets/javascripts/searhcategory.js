$(document).ready(function () {
  function appendOption(category) {
    var html = `<option value=“${category.id}” data-category=“${category.id}“>${category.name}</option>`;
    return html;
  }
  function appendChidrenBox(insertHTML) {
    var childSelectHtml = “”;
    childSelectHtml = `<div class=‘listing-select-wrapper__added’ id= ‘children_wrapper’>
                        <div class=‘listing-select-wrapper__box’>
                          <select class=“listing-select-wrapper__box--select” id=“child_search_category” name=“q[category_id_eq]“>
                            <option value=“---” data-category=“---“>---</option>
                            ${insertHTML}
                          <select>
                        </div>
                      </div>`;
    $(“.listing-product-detail__category”).append(childSelectHtml);
  }
  function appendGrandchidrenBox(insertHTML) {
    var grandchildSelectHtml = “”;
    grandchildSelectHtml = `<div class=‘listing-select-wrapper__added’ id= ‘grandchildren_wrapper’>
                              <div class=‘listing-select-wrapper__box’>
                                <select class=“listing-select-wrapper__box--select” id=“grandchild_category” name=“q[category_id_eq]“>
                                  <option value=“---” data-category=“---“>---</option>
                                  ${insertHTML}
                                </select>
                              </div>
                            </div>`;
    $(“.listing-product-detail__category”).append(grandchildSelectHtml);
  }
  $(“#q_category_id_eq”).on(“change”, function () {
    var parentCategory = document.getElementById(“q_category_id_eq”).value;
    console.log(parentCategory);
    if (parentCategory != “---“) {
      $.ajax({
        url: “/products/get_category_children”,
        type: “GET”,
        data: { parent_id: parentCategory },
        dataType: “json”,
      })
        .done(function (children) {
          console.log(children);
          $(“#children_wrapper”).remove(); 
          $(“#grandchildren_wrapper”).remove();
          $(“#size_wrapper”).remove();
          $(“#brand_wrapper”).remove();
          var insertHTML = “”;
          children.forEach(function (child) {
            insertHTML += appendOption(child);
          });
          appendChidrenBox(insertHTML);
        })
        .fail(function () {
          alert(“カテゴリー取得に失敗しました“);
        });
    } else {
      $(“#children_wrapper”).remove(); 
      $(“#grandchildren_wrapper”).remove();
      $(“#size_wrapper”).remove();
      $(“#brand_wrapper”).remove();
    }
  });
  $(“.listing-product-detail__category”).on(
    “change”,
    “#child_search_category”,
    function () {
      var childId = $(“#child_search_category option:selected”).data(
        “category”
      ); 
      console.log(childId);
      if (childId != “---“) {
        $.ajax({
          url: “/products/get_category_grandchildren”,
          type: “GET”,
          data: { child_id: childId },
          dataType: “json”,
        })
          .done(function (grandchildren) {
            if (grandchildren.length != 0) {
              $(“#grandchildren_wrapper”).remove(); 
              $(“#size_wrapper”).remove();
              $(“#brand_wrapper”).remove();
              var insertHTML = “”;
              grandchildren.forEach(function (grandchild) {
                insertHTML += appendOption(grandchild);
              });
              appendGrandchidrenBox(insertHTML);
            }
          })
          .fail(function () {
            alert(“カテゴリー取得に失敗しました“);
          });
      } else {
        $(“#grandchildren_wrapper”).remove(); 
        $(“#size_wrapper”).remove();
        $(“#brand_wrapper”).remove();
        1;
      }
    }
  );
});

