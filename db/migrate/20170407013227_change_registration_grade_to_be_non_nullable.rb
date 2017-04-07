class ChangeRegistrationGradeToBeNonNullable < ActiveRecord::Migration[5.1]
  def change
    change_column :registrations, :grade, :integer, default: 0, null: false
  end
end
