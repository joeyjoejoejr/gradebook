require 'rails_helper'

RSpec.describe UserDashboard do
  describe '.for' do
    %w{ Student Teacher Admin }.each do |type|
      it "retrieves a dashboard for #{type} type" do
        user = build type.downcase
        dashboard_type = "UserDashboard::#{type}Dashboard".constantize
        expect(UserDashboard.for user).to be_a dashboard_type
      end
    end
  end
end
