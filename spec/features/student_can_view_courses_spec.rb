require 'rails_helper'

RSpec.describe "Student Can View Their Courses" do
  before :each do
    @student = create :student, password: "password"
    @courses = create_list :course, 3, student_ids: [@student.id]
    Registration.update_all grade: 75

    visit "/"
    fill_in "Email", with: @student.email
    fill_in "Password", with: "password"
    click_button "Sign In"
  end

  after :each do
    click_button "Sign Out"
  end


  it "can see courses with grades and GPA" do
    expect(page).to have_content @courses.first.name
    expect(page).to have_content "GPA 2.0"
  end
end
