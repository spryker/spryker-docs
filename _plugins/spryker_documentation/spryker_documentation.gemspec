# frozen_string_literal: true

require_relative "lib/spryker_documentation/version"

Gem::Specification.new do |spec|
  spec.name          = "spryker_documentation"
  spec.version       = SprykerDocumentation::VERSION
  spec.authors       = ["Anton Sakharov"]
  spec.email         = ["anton.sakharov@spryker.com"]

  spec.summary       = "Summary of the gem."
  spec.description   = "Gem description."
  spec.homepage      = "https://github.com/spryker/spryker.github.io"
  spec.required_ruby_version = Gem::Requirement.new(">= 2.4.0")

  spec.metadata["allowed_push_host"] = "TODO: Set to 'http://mygemserver.com'"

  spec.metadata["homepage_uri"] = 'https://github.com/spryker/spryker.github.io'
  spec.metadata["source_code_uri"] = "https://github.com/spryker/spryker.github.io"
  spec.metadata["changelog_uri"] = "https://github.com/spryker/spryker.github.io"

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = Dir.chdir(File.expand_path(__dir__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{\A(?:test|spec|features)/}) }
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{\Aexe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  # Uncomment to register a new dependency of your gem
  # spec.add_dependency "example-gem", "~> 1.0"

  # For more information and examples about making a new gem, checkout our
  # guide at: https://bundler.io/guides/creating_gem.html
end
