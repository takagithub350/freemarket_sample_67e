class ProductsController < ApplicationController
  before_action :set_product, only: [:edit, :update]
  before_action :move_to_index, except: [:index, :show, :search]

  def new
    @product = Product.new
    @product.images.build 
    @category_parent_array = ["---"]
    @category_parent_array = Category.limit(13).pluck(:name)
    respond_to do |format|
      format.html
      format.json
    end
  end

  # 親カテゴリーが選択された後に動くアクション
  def get_category_children
    @category_children = Category.find_by(name: "#{params[:parent_name]}", ancestry: nil).children    #親カテゴリーに紐付く子カテゴリーを取得
  end

  # 子カテゴリーが選択された後に動くアクション
  def get_category_grandchildren
    @category_grandchildren = Category.find("#{params[:child_id]}").children
    #子カテゴリーに紐付く孫カテゴリーの配列を取得
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      redirect_to root_path
    else
      render :edit
    end
  end

  def edit
    @grandchild = Category.find(@product.category_id)
    @child = @grandchild.parent
    @parent = @grandchild.parent.parent

    @category_grandchild_array = ["---"]
    Category.where(ancestry: @grandchild.ancestry).each do |grandchild|
      @category_grandchild_array << grandchild.name
    end

    @category_parent_array = ["---"]
    Category.where(ancestry: nil).each do |parent|
      @category_parent_array << parent.name
    end
    @category = Category.find(@product.category_id)
    @child_categories = Category.where('ancestry = ?', "#{@category.parent.ancestry}")
    @grand_child = Category.where('ancestry = ?', "#{@category.ancestry}")
  end

  def update
    if @product.update(product_params)
      redirect_to root_path
    else
      redirect_to edit_product_path
    end
  end

  def show
    @product= Product.find(params[:id])
    @user= User.find_by(id: @product.user_id)
    @category = Category.find(@product.category_id)
  end

  def index
    @products = Product.includes(:images).all.order(updated_at: :desc)
  end

  def search
    @products = Product.search(params[:keyword])
  end

  def destroy
    @product = Product.find(params[:id])
    if @product.destroy
      redirect_to root_path
    else
      redirect_to product_path
    end
  end

  private
  def product_params
    params.require(:product).permit(:product_name, :price, :category_id, :size, :status, :postage, :explanation, :transaction_status, :delivery_method, :delivery_origin, :arrival_date, :brand, images_attributes: [:image, :_destroy, :id]).merge(user_id: current_user.id)
  end

  def set_product
    @product = Product.find(params[:id])
  end
end
