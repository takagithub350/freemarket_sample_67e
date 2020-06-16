class ToppagesController < ApplicationController
  def index
    @product = Product.includes(:images).order(updated_at: :desc)
    @category_parent_array = ["---"]
    @category_parent_array = Category.limit(13).pluck(:name)
    respond_to do |format|
      format.html
      format.json
    end
    @q = Product.ransack(params[:q])
    @product = @q.result(distinct: true)
  end
end
