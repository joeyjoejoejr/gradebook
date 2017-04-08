require 'rails_helper'

RSpec.describe CreateCourse do
  describe "#save" do
    let!(:course) { create :course }

    let(:valid_attributes) {
      {
        course: course,
        params: {
          name: "Biology 102",
        }
      }
    }

    it "updates a course" do
      update_course = UpdateCourse.new valid_attributes

      update_course.update

      expect(update_course).to be_valid
      expect(update_course.course_name).to eql "Biology 102"
    end

    it "updates a course with new students" do
      students = create_list :student, 3
      valid_attributes.fetch(:params)[:students] = students.map { |s|
        { id: s.id, grade: 50 }
      }

      update_course = UpdateCourse.new valid_attributes

      expect { update_course.update }.to change { Registration.count }.by 3
      expect(update_course).to be_valid
    end

    it "updates a course with existing students" do
      students = create_list :student, 2
      course.update(student_ids: students.map(&:id))

      new_students = create_list :student, 2
      valid_attributes.fetch(:params)[:students] =
        (students + new_students).map { |s|
          { id: s.id, grade: 50 }
        }

      update_course = UpdateCourse.new valid_attributes

      expect { update_course.update }.to change { Registration.count }.by 2
      expect(course.registrations.map(&:grade)).to eql Array.new(4) { 50 }
    end

    it "adds error messages for missing parameters" do
      update_course = UpdateCourse.new({})

      expect(update_course).not_to be_valid
      expect(update_course.errors.full_messages.join).to include('Course')
      expect(update_course.errors.full_messages.join).to include('Params')
    end
  end
end
