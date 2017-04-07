class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name, :students, :teacher

  def students
    object.students.select(:id, :name, :grade).as_json
  end

  def teacher
    object.teacher.name
  end
end
