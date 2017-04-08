class CourseResourceSerializer < ActiveModel::Serializer
  attributes :id, :name, :students, :teacher

  def students
    object.course_students.select(:id, :name, :grade)
  end

  def teacher
    object.teacher.name
  end

  def name
    object.course_name
  end
end
