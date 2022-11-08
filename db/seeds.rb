require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Member.destroy_all
    Message.destroy_all
    Server.destroy_all
    User.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')

    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'Demo-lition',
      email: 'demo@user.io',
      password: 'password',
      birthday: Date.new(),
      color:  "##{SecureRandom.hex(3)}"
    )

    # More users
    10.times do
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password',
        birthday: Date.new(),
        color: "##{SecureRandom.hex(3)}"
      })
    end

    puts "creating servers..."
    
    5.times do 
      Server.create!({
        name: Faker::Name.unique.name,
        owner_id: Faker::Number.between(from: 1, to: 9)
      })
    end 

    puts "creating channels..."

    Channel.create!(
      name: "General",
      server_id: 1,
      channel_type: "text"
    )

    Channel.create!(
      name: "gardnin",
      server_id: 1,
      channel_type: "text"
    )

    Channel.create!(
      name: 'baby plants',
      server_id: 1,
      channel_type: 'text'
    )

    puts "adding members..."

    Member.create!({
      server_id: 1,
      user_id: 1
    })
    Member.create!({
      server_id: 2,
      user_id: 1
    })

    puts "Done!"
  end


# Member.destroy_all
# Message.destroy_all
# Server.destroy_all
# User.destroy_all