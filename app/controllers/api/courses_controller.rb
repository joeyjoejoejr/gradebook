class Api::CoursesController < ApiController
  def index
    render json: Course.all
  end

  def create
    course = Course.new course_params

    if course.save
      render json: course, status: :created
    else
      render json: { errors: course.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  def update
    course = Course.find params[:id]
    if course.update course_params
      render json: course
    else
      render json: { errors: course.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  def destroy
    Course.destroy params[:id]
  end

  private

  def course_params
    params.require(:course).permit(:name, :semester_id, :teacher_id)
  end
end
