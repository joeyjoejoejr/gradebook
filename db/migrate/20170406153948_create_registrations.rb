class CreateRegistrations < ActiveRecord::Migration[5.1]
  def change
    create_table :registrations do |t|
      t.references :student, foreign_key: { to_table: :users }
      t.integer :grade
      t.references :course, foreign_key: true

      t.timestamps
    end
  end
end
