def set_page_version(page, config)
    return if config['page']['version']

    page.url.match(%r{/(?<version>\d+\.\d+)/});
    version = Regexp.last_match(:version)

    config['page']['version'] = version
end

def build_page_full_url_pattern(page)
    %r{\A#{page.url.gsub(%r{/\d+\.\d+/}, '/\d+\.\d+/')}\Z}
end

def get_versioned_page_urls(page, full_url_pattern)
    page.site.pages.select do |site_page|
        site_page.url.match full_url_pattern
    end.map(&:url)
end

def get_versions(versioned_page_urls)
    version_pattern = %r{/(?<page_version>\d+\.\d+)/}

    versioned_page_urls.map do |url|
        version_pattern.match(url)
        {
            'version' => Regexp.last_match(:page_version),
            'url' => url
        }
    end
end

Jekyll::Hooks.register :pages, :pre_render do |page, config|
    next page unless File.extname(page.path).match?(/md|html/)
    next page unless page.url.start_with? '/docs/'

    set_page_version page, config
    full_url_pattern = build_page_full_url_pattern page
    versioned_page_urls = get_versioned_page_urls page, full_url_pattern
    versions = get_versions versioned_page_urls
    config['page']['all_versions'] = versions.sort_by { |version| version['version'] }
end
