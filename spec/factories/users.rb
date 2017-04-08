FactoryGirl.define do
  sequence(:email) { |n| "user#{n}@example.com" }

  factory :student do
    name "Joe Jackson"
    password "password"
    email
  end

  factory :teacher do
    name "Bob Smith"
    password "password"
    email
  end

  factory :admin do
    name "Jane Williams"
    password "password"
    email
  end
end
