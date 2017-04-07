require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  let!(:student) { create :student }
  let(:auth_header) {
    token = Knock::AuthToken.new(payload: { sub: student.id }).token

    { "Authorization": "Bearer #{token}" }
  }

  before(:each) { request.headers.merge! auth_header }

  describe "GET #index" do
    it "returns your own user information" do
      get :index
      expect(response).to have_http_status(:success)
      expect(response.body).to match student.name
    end
  end

  describe "GET #dashboard" do
    let!(:courses) { create_list :course, 3, student_ids: [student.id] }
    before(:each) { Registration.update_all grade: 85 }

    it "returns a personalized dashboard for your user" do
      get :dashboard
      gpa = JSON.parse(response.body)["gpa"]
      expect(response).to have_http_status(:success)
      expect(gpa).to match '3.0'
    end
  end
end
