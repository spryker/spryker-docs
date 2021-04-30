def get_latest_page_version_url(page)
    full_url_pattern = %r{\A#{page.url.gsub(%r{/\d+\.\d+/}, '(?<version>/\d+\.\d+/)')}\Z}
    versioned_urls = page.site.pages.select { |site_page| site_page.url.match full_url_pattern }.map(&:url)

    return page.url if versioned_urls.size === 0

    versioned_urls.sort_by { |version| version.scan(/\d+/).first.to_i }.pop
end

Jekyll::Hooks.register :pages, :post_init do |page|
    next page unless File.extname(page.path).match?(/md|html/)
    next page if not page.name == 'marketplace-concept.md'

    latest_page_version_url = get_latest_page_version_url page
    page.data['canonical_url'] = latest_page_version_url if page.data['canonical_url'].nil?
end
