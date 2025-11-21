source "https://rubygems.org"

# Specify the Ruby version for the project.
ruby '3.2.2'

gem "jekyll", "~> 4.2.0"

gem "webrick", "~> 1.7"

gem "jekyll-feed", "~> 0.12"
gem "jekyll-redirect-from"

group :jekyll_plugins do
  gem "jekyll-commonmark-ghpages"
  gem "jekyll-algolia", "~> 1.0"
  gem "page_template_validator", path: "./_plugins/page_template_validator"
  gem "jekyll-sitemap"
  gem "jekyll-last-modified-at"
  gem "jekyll-include-cache"
end

gem "rake"
gem "parallel"
gem "liquid-c"

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
