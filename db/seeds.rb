# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Rails.application.eager_load!

Registration.destroy_all
Course.destroy_all
User.destroy_all

Admin.create!(
  name: "Richard Weber",
  email: "rweber@example.com",
  password: "password",
  password_confirmation: "password",
)

teacher = Teacher.create!(
  name: "Jill Smith",
  email: "jsmith@example.com",
  password: 'password',
  password_confirmation: 'password',
)

Student.create!(
  name: "Joe Jackson",
  email: "jjackson@example.com",
  password: 'password',
  password_confirmation: 'password',
)

Student.create!(
  name: "Daniel Higgenbotham",
  email: "dhiggenbotham@example.com",
  password: 'password',
  password_confirmation: 'password',
)

Student.create!(
  name: "Jess Higgenbotham",
  email: "jhiggenbotham@example.com",
  password: 'password',
  password_confirmation: 'password',
)

Course.create!(
  name: "Biology 101",
  teacher: teacher,
)

Course.create!(
  name: "World History",
  teacher: teacher,
)

Course.create!(
  name: "Linear Algebra",
  teacher: teacher,
)
