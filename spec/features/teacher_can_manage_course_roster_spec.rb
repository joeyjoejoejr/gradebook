require 'rails_helper'

RSpec.describe "Teacher Can Manage Their Course Roster" do
  let(:course_name) { "Biology 101" }
  let(:new_course_name) { "Biology 102" }
  let(:teacher) { create :teacher, password: "password" }

  before :each do
    visit "/"
    fill_in "Email", with: teacher.email
    fill_in "Password", with: "password"
    click_button "Sign In"
  end

  after :each do
    click_button "Sign Out"
  end

  it "can manage a course" do
    within "#course" do
      fill_in "Name", with: course_name
      click_button "Add Course"
    end

    expect(page).to have_content course_name

    click_button "Edit Course"

    within "#course" do
      fill_in "Name", with: new_course_name
      click_button "Update Course"
    end

    expect(page).to have_content new_course_name

    within "li", text: new_course_name do
      click_button "Delete Course"
    end

    expect(page).to have_no_content new_course_name
  end

  it "can manage a course's students" do
    create :course, teacher: teacher
    student = create :student

    visit "/"

    click_button "Edit Course"

    within "#course" do
      fill_in "Search Students", with: student.name
      click_button "Add Student"
      fill_in "Grade", with: 90
      click_button "Update Course"
    end

    expect(page).to have_content student.name
  end
end
