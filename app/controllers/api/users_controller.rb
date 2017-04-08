class Api::UsersController < ApiController
  before_action :authenticate_user

  def index
    render json: current_user, serializer: UserSerializer
  end

  def dashboard
    user_dashboard = UserDashboard.for current_user

    render json: user_dashboard
  end
end
