require 'rails_helper'

RSpec.describe Api::CoursesController, type: :controller do
  describe "POST #create" do
    let(:course_name) { "Biology 101" }

    it "creates a course" do
      post :create, params: { course: { name: course_name } }
      expect(response).to have_http_status(:created)
      expect(response.body).to match /#{course_name}/
    end

    it "handles errors" do
      post :create, params: { course: { name: "" } }
      puts response.body
      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.body).to match /can't be blank/
    end
  end
end
