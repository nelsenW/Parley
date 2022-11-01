# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

#transform keys from snakecase to camel from back to front
Jbuilder.key_format camelize: :lower
Jbuilder.deep_format_keys true
