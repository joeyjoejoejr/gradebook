class Api::CoursesController < ApiController
  def create
    course = Course.new course_params

    if course.save
      render json: course, status: :created
    else
      render json: { errors: course.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  private

  def course_params
    params.require(:course).permit(:name, :semester_id, :teacher_id)
  end
end
