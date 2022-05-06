module Jekyll
    module Algolia
        module Hooks
            def self.before_indexing_each(record, node, context)
                @context = context
                page_versions = self.get_page_versions record

                if self.should_be_indexed(record, page_versions)
                    return self.set_record_versions record, page_versions
                end

                return nil
            end

            def self.get_page_versions(record)
                page_versions = self.is_multiversion(record) ? self.get_page_versions_from_record_url(record)
                    : @context.config['versions'].keys

                page_versions = page_versions.select do |page_version|
                    !self.is_upcoming_version(page_version)
                end

                return page_versions
            end

            def self.get_page_versions_from_record_url(record)
                page_url = record[:url]
                all_pages = @context.pages
                full_url_pattern = %r{\A#{page_url.gsub(%r{/\d+\.\d+/}, '/\d+\.\d+/')}\Z}
                versioned_page_urls = all_pages.select do |site_page|
                  site_page.url.match full_url_pattern
                end.map(&:url)

                return versioned_page_urls.map do |url|
                    self.get_page_version_from_url url
                end
            end

            def self.should_be_indexed(record, page_versions)
                return true if not self.is_multiversion record

                self.get_page_version_from_url(record[:url]) == page_versions.max
            end

            def self.get_page_version_from_url(url)
                version_pattern = %r{/(?<page_version>\d+\.\d+)/}
                version_pattern.match(url)

                return Regexp.last_match(:page_version)
            end

            def self.set_record_versions(record, page_versions)
                page_version_labels = page_versions.map do |page_version|
                    @context.config['versions'][page_version]
                end

                record[:versions] = page_version_labels

                return record
            end

            def self.is_upcoming_version(page_version)
                global_documentation_version = @context.config['version']

                Gem::Version.new(page_version) > Gem::Version.new(global_documentation_version)
            end

            def self.is_multiversion(record)
                record[:url].match(%r{\A/docs/(?<product>[\w-]+)/(?<role>[\w-]+)/(?<category>[\w-]+)/});
                product = Regexp.last_match(:product)
                role = Regexp.last_match(:role)
                category = Regexp.last_match(:category)
                versioned_categories = @context.config['versioned_categories']

                return false if versioned_categories[product] == nil or
                    versioned_categories[product][role] == nil

                return versioned_categories[product][role].include? category
            end
        end
    end
end
