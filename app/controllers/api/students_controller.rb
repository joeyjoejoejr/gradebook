class Api::StudentsController < ApiController
  def index
    render json: Student.search(params[:name])
  end
end
