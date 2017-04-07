require 'rails_helper'

RSpec.describe Api::CoursesController, type: :controller do
  let!(:teacher) { create :teacher }
  let(:auth_header) {
    token = Knock::AuthToken.new(payload: { sub: teacher.id }).token

    { "Authorization": "Bearer #{token}" }
  }

  #FIXME https://github.com/rspec/rspec-rails/issues/1655
  # have to merge directly on to the request heades rather than passing them
  # as a hash to the request. It appears rspec is loading a depricated module.
  before(:each) { request.headers.merge! auth_header }

  describe "GET #index" do
    let!(:course) { create :course }

    it "returns courses" do
      get :index
      expect(response).to have_http_status(:success)
      expect(response.body).to match course.name
    end
  end

  describe "POST #create" do
    let(:course_name) { "Biology 101" }

    it "creates a course with students" do
      student = create :student
      course_params = {
        course: {
          name: "Biology 101",
          students: [{
            id: student.id,
            name: student.name,
            grade: "90"
          }]
        }
      }

      post :create, params: course_params
      expect(response).to have_http_status(:success)
      expect(response.body).to match student.name
      expect(response.body).to match teacher.name
    end

    it "handles errors" do
      post :create, params: { course: { name: "" } }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.body).to match /can't be blank/
    end

  end

  describe "PUT #update" do
    let!(:course) { create :course }
    let!(:new_name) { "Biology 102" }

    it "updates a course" do
      put :update, params: { id: course.id, course: { name: new_name } }
      expect(response).to have_http_status(:success)
      expect(response.body).to match new_name
    end

    it "updates a course with students" do
      student = create :student
      course_params = { students: [{
        id: student.id,
        name: student.name,
        grade: "90"
      }] }
      put :update, params: { id: course.id, course: course_params }
      expect(response).to have_http_status(:success)
      expect(response.body).to match student.name
    end
  end

  describe "DELETE #destroy" do
    let!(:course) { create :course }

    it "deletes a course" do
      expect {
        delete :destroy, params: { id: course.id }
      }.to change(Course, :count).by -1

      expect(response).to have_http_status(:success)
    end
  end
end
