require 'rails_helper'

RSpec.describe "Admin Can View Courses" do
  let!(:admin) { create :admin, password: "password" }
  let!(:student) { create :student }
  let!(:courses) { create_list :course, 3, student_ids: [student.id] }

  before :each do
    Registration.update_all grade: 75

    visit "/"
    fill_in "Email", with: admin.email
    fill_in "Password", with: "password"
    click_button "Sign In"
  end

  after :each do
    click_button "Sign Out"
  end


  it "can see courses with average grade and attendance" do
    expect(page).to have_content courses.first.name
    expect(page).to have_content "Enrollment 1"
  end
end
