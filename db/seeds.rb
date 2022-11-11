require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Channel.destroy_all
    Dm.destroy_all
    Friendship.destroy_all
    Member.destroy_all
    Message.destroy_all
    Server.destroy_all
    User.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('servers')
    ApplicationRecord.connection.reset_pk_sequence!('messages')
    ApplicationRecord.connection.reset_pk_sequence!('members')
    ApplicationRecord.connection.reset_pk_sequence!('friendships')
    ApplicationRecord.connection.reset_pk_sequence!('dms')
    ApplicationRecord.connection.reset_pk_sequence!('channels')

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
    
    Server.create!({
      name: 'League of Legos',
      owner_id: Faker::Number.between(from: 1, to: 9)
    }).icon.attach(io: URI.open('https://parley--seeds.s3.us-west-2.amazonaws.com/extraneous/league.jpeg'), filename: "server_1_icon")


    Server.create!({
      name: 'Just chatting',
      owner_id: Faker::Number.between(from: 1, to: 9),
    }).icon.attach(io: URI.open('https://parley--seeds.s3.us-west-2.amazonaws.com/extraneous/chatting.jpeg'), filename: "server_2_icon")

    Server.create!({
      name: 'Job Hunt',
      owner_id: Faker::Number.between(from: 1, to: 9)
    }).icon.attach(io: URI.open('https://parley--seeds.s3.us-west-2.amazonaws.com/extraneous/jobhunt.jpeg'), filename: "server_3_icon")

    Server.create!({
      name: 'Memes',
      owner_id: Faker::Number.between(from: 1, to: 9)
    }).icon.attach(io: URI.open('https://parley--seeds.s3.us-west-2.amazonaws.com/extraneous/memes.jpeg'), filename: "server_4_icon")

    Server.create!({
      name: 'How great is William?',
      owner_id: Faker::Number.between(from: 1, to: 9)
    }).icon.attach(io: URI.open('https://parley--seeds.s3.us-west-2.amazonaws.com/extraneous/william.webp'), filename: "server_2_icon")


    puts "creating channels..."

    Channel.create!(
      name: "General",
      server_id: 1,
      channel_type: "text"
    )

    Channel.create!(
      name: "General",
      server_id: 2,
      channel_type: "text"
    )

    Channel.create!(
      name: "General",
      server_id: 3,
      channel_type: "text"
    )

    Channel.create!(
      name: "General",
      server_id: 4,
      channel_type: "text"
    )

    Channel.create!(
      name: "General",
      server_id: 5,
      channel_type: "text"
    )

    Channel.create!(
      name: "lego pics",
      server_id: 1,
      channel_type: "text"
    )

    Channel.create!(
      name: 'league pics',
      server_id: 3,
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

    puts "adding messages..."
    
    Message.create!({
      text: 'Hey!',
      user_id: 1,
      channel_id: 1
    })

    Message.create!({
      text: 'why hello there :)',
      user_id: 3,
      channel_id: 1
    })

    Message.create!({
      text: 'Hey yalll',
      user_id: 5,
      channel_id: 1
    })

    Message.create!({
      text: 'wanna talk about legos',
      user_id: 4,
      channel_id: 1
    })

    Message.create!({
      text: 'ew no',
      user_id: 1,
      channel_id: 1
    })
    Message.create!({
      text: 'why would we do that.',
      user_id: 6,
      channel_id: 1
    })
    Message.create!({
      text: 'Hey sorry im lat3e!',
      user_id: 7,
      channel_id: 1
    })
    Message.create!({
      text: 'oooh we talkin about legos?',
      user_id: 8,
      channel_id: 1
    })
    

    puts "Done!"



# Member.destroy_all
# Message.destroy_all
# Server.destroy_all
# User.destroy_all