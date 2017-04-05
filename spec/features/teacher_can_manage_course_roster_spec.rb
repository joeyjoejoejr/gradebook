require 'rails_helper'

RSpec.describe "Teacher Can Manage Their Course Roster" do
  it "basic smoke test" do
    visit "/"
    expect(page).to have_content "Hello React"
  end
end
