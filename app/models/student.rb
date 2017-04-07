class Student < User
  def self.search(name)
    where("name ILIKE :search", search: "%#{name}%")
  end
end
