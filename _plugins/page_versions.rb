# page_versions.rb

def setup_current_page_version(page, config)
  return if config['page']['version']

  if page.url.match(%r{/(?<version>\d+\.\d+)/})
    config['page']['version'] = Regexp.last_match(:version)
  end
end

def setup_all_page_versions(page, config)
  pattern = page.url.gsub(%r{/\d+\.\d+/}, '/\d+\\.\\d+/')
  full_url_pattern = Regexp.new("^#{pattern}$")

  versioned_urls = page.site.pages.select { |p| p.url.match(full_url_pattern) }.map(&:url)
  versions = extract_versions(versioned_urls)

  config['page']['all_versions'] = versions.sort_by { |v| v['version'] }.reverse
end

def extract_versions(urls)
  version_pattern = %r{/(?<page_version>\d+\.\d+)/}

  urls.map do |url|
    if version_pattern.match(url)
      { 'version' => Regexp.last_match(:page_version), 'url' => url }
    end
  end.compact
end

Jekyll::Hooks.register :pages, :pre_render do |page, config|
  next unless File.extname(page.path).match?(/md|html/)
  next unless page.url.start_with?('/docs/')
  next unless page.url.match(%r{/\d+\.\d+/})  # must be a versioned path

  setup_current_page_version(page, config)
  setup_all_page_versions(page, config)
end
