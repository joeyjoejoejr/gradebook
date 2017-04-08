require 'rails_helper'

RSpec.describe CreateCourse do
  describe "#save" do
    let!(:teacher) { create :teacher }

    let(:valid_attributes) {
      {
        name: "Biology 101",
        current_user: teacher
      }
    }

    it "saves a valid course" do
      create_course = CreateCourse.new valid_attributes

      expect(create_course).to be_valid

      expect { create_course.save }.to change { Course.count }.by 1
    end

    it "saves a valid course with students" do
      students = create_list :student, 3
      valid_attributes[:students] = students.map { |s| { id: s.id, grade: 50 }}

      create_course = CreateCourse.new valid_attributes

      expect(create_course).to be_valid
      expect{ create_course.save }.to change { Registration.count }.by 3
    end

    it "adds error messages for missing parameters" do
      invalid_attributes = { students: [{}] }
      create_course = CreateCourse.new invalid_attributes
      expect(create_course).not_to be_valid
      expect(create_course.errors.full_messages.join).to include('Name')
      expect(create_course.errors.full_messages.join).to include('Current user')
      expect(create_course.errors.full_messages.join).to include('Grade')
    end
  end
end
