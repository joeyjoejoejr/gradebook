class AddTeacherToCourse < ActiveRecord::Migration[5.1]
  def change
    add_reference :courses, :teacher, foreign_key: { to_table: :users }
  end
end
