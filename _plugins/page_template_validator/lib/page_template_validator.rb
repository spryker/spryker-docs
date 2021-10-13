# frozen_string_literal: true

require_relative "page_template_validator/version"
require 'yaml'

module Spryker
  class PageTemplateValidationCommand < Jekyll::Command
    class << self
      def init_with_program(prog)
        prog.command(:validate) do |c|
          c.syntax "validate"
          c.description 'Validate Spryker doc pages.'
          c.action do |args, options|
            exitCode = PageValidator.run_validation
            exit(exitCode)
          end
        end
      end
    end
  end

  class PageValidator
    def self.run_validation
      result = true
      doc_path = get_docs_path
      page_files = get_md_files(doc_path)
      page_files.each do |file_name|
        next if file_name.include? "/drafts-dev/"
        begin
          validation_result =validate_page(doc_path + file_name)
        rescue StandardError => e
          puts "Failed to read front matter for page:" + file_name
          result = result && false
        end
        if !validation_result
          puts "Page has no template id: " + file_name
        end
        result = result && validation_result
      end
      return result
    end

    def self.validate_page(file_name)
      front_matter = get_front_matter(file_name)
      if nil == front_matter || nil == front_matter['template']
        return false
      end
      return true
    end

    def self.get_md_files(doc_path)
      return Dir.glob(File.join("**", "*.md"), base: doc_path)
    end

    def self.get_docs_path
      return File.dirname(__FILE__) + "/../../../docs/"
    end

    def self.get_front_matter(file_name)
      contents = File.read(file_name)
      front_matter_data = contents[/^---(.*?)---/m]
      if !front_matter_data
        front_matter_data = '------'
      end

      return YAML.load(front_matter_data)
    end
  end
end
