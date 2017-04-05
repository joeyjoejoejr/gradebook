require 'rails_helper'

RSpec.describe "Teacher Can Manage Their Course Roster" do
  let!(:course) { create :course }

  it "can create a course" do
    visit "/"
    within "#course" do
      fill_in "Name", with: "Biology 101"
      select "Spring 2017", from: "Semester"
      click_button "Add Course"
    end

    expect(page).to have_content "Biology 101"
  end
end
