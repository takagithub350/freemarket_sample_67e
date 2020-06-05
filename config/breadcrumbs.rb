crumb :root do
  link "トップページ", root_path
end

crumb :mypages do
  link "マイページ", user_path(current_user)
  parent :root

end

crumb :categorys do
  link "カテゴリー", categorys_path
end

