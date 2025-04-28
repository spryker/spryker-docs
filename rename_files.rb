# rename_files.rb

require 'fileutils'

# Define the directory
directory = '_site'

# Traverse through the directory
Dir.glob("#{directory}/**/*").each do |file|
  next unless File.file?(file) # Skip if not a file

  new_name = file.gsub(/[#?]/, '_') # Replace # and ? with underscores
  if new_name != file # Check if renaming is needed
    FileUtils.mv(file, new_name) # Rename the file
    puts "Renamed: #{file} -> #{new_name}"
  end
end