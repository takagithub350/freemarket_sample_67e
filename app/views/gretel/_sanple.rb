crumb :root do
  link "Home", root_path
end

crumb :tag do |tag|
  if current_page?(:controller => 'post', :action => 'show')
    # current_page?(URL)で指定したページにいるか判定してくれる
    show_post_tag_id = TagMap.find_by(post_id: params[:id]).tag_id
    show_post_tag = Tag.find_by(id: show_post_tag_id)
    link show_post_tag.name
  else
    tag_page = Tag.find_by(id: params[:id])
    link tag_page.name
  end
  parent :root
end

crumb :show_title do |show_title|
  show_title = Post.find_by(id: params[:id])
  link show_title.title
  parent :tag
end