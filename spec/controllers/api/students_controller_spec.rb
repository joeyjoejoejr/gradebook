require 'rails_helper'

RSpec.describe Api::StudentsController, type: :controller do
  describe "GET #index" do
    let!(:student) { create :student }

    it "searches for students" do
      get :index, params: { name: student.name.first(2) }
      expect(response).to have_http_status(:success)
      expect(response.body).to match /#{student.name}/
    end

    it "non-matching search should return no results" do
      get :index, params: { name: "notamatch" }
      expect(response.body).not_to match /#{student.name}/
    end
  end
end
