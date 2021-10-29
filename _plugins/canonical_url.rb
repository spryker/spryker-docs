def get_page_versioned_urls(page)
    full_url_pattern = %r{\A#{page.url.gsub(%r{/\d+\.\d+/}, '/\d+\.\d+/')}\Z}
    page.site.pages.select { |site_page| site_page.url.match full_url_pattern }.map(&:url)
end

def get_page_latest_version_url(versioned_urls)
    versioned_urls.sort_by { |version| version.scan(/(?<=\/v)\d+(?=\/)/).first.to_i }.max
end

def is_multiversion(page)
    product = page['product']
    role = page['role']

    return false if page.site.config['versioned_categories'][product] == nil or
        page.site.config['versioned_categories'][product][role] == nil

    versioned_categories = page.site.config['versioned_categories'][product][role]
    page.url.match(%r{\A/docs/#{product}/#{role}/(?<category>[\w-]+)/});
    page_category = Regexp.last_match(:category)

    return versioned_categories.include? page_category
end

Jekyll::Hooks.register :pages, :pre_render do |page, config|
    next page unless File.extname(page.path).match?(/md|html/)
    next page unless is_multiversion page

    versioned_urls = get_page_versioned_urls page

    next page if versioned_urls.size === 1

    latest_page_version_url = get_page_latest_version_url versioned_urls

    next page unless latest_page_version_url != page.url

    config['page']['canonical_url'] = latest_page_version_url if page.data['canonical_url'].nil? and not
        latest_page_version_url.nil?
    config['page']['latest_version'] = config['page']['all_versions'].first if defined?(config['page']['all_versions']) and not config['page']['all_versions'].nil?
end
