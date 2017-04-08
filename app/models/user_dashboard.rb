module UserDashboard
  def self.for(current_user)
    dashboard_class = "UserDashboard::#{current_user.type}Dashboard".constantize
    dashboard_class.new current_user
  end
end
