FactoryGirl.define do
  sequence(:name) { |n| "Biology 10#{n}" }
  factory :course do
    name
    teacher
  end
end
