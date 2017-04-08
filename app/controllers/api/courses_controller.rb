class Api::CoursesController < ApiController
  before_action :authenticate_user

  def create
    course_creator = CreateCourse.new(
      course_params.merge(current_user: current_user)
    )

    if course_creator.save
      render json: course_creator, status: :created, serializer: CourseResourceSerializer
    else
      render json: { errors: course_creator.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  def update
    course = Course.find params[:id]
    update_course = UpdateCourse.new course: course, params: course_params
    if update_course.update
      render json: update_course, serializer: CourseResourceSerializer
    else
      render json: { errors: update_course.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  def destroy
    Course.destroy params[:id]
  end

  private

  def course_params
    params.require(:course).permit(:name, students: [:id, :grade])
  end

  def student_params
    params.require(:course).permit(students: [:id, :grade])
  end
end
