class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name, :students

  def students
    object.students.select(:id, :name, :grade).as_json
  end
end
