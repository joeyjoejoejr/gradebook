class Student < User
  has_many :registrations
  has_many :courses, through: :registrations

  def self.search(name)
    where("name ILIKE :search", search: "%#{name}%")
  end
end
