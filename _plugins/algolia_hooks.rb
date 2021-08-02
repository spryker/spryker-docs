module Jekyll
    module Algolia
        module Hooks
            def self.before_indexing_each(record, node, context)
                @context = context

                return nil if not self.should_be_indexed record

                record
            end

            def self.should_be_indexed(record)
                page_version = self.get_page_version record

                return false if self.is_upcoming_version page_version

                return true if not self.is_multiversion record

                self.is_latest_version page_version, record
            end

            def self.get_page_version(record)
                record[:url].match(%r{/(?<version>\d+\.\d+)/});
                Regexp.last_match(:version)
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

            def self.is_latest_version(version, record)
                version == self.get_latest_page_version(record)
            end

            def self.get_latest_page_version(record)
                page_url = record[:url]
                all_pages = @context.pages
                full_url_pattern = %r{\A#{page_url.gsub(%r{/\d+\.\d+/}, '/\d+\.\d+/')}\Z}
                versioned_page_urls = all_pages.select do |site_page|
                  site_page.url.match full_url_pattern
                end.map(&:url)

                version_pattern = %r{/(?<page_version>\d+\.\d+)/}
                page_versions = versioned_page_urls.map do |url|
                    version_pattern.match(url)
                    Regexp.last_match(:page_version)
                end

                page_versions = page_versions.select do |page_version|
                    !self.is_upcoming_version(page_version)
                end

                page_versions.max
            end
        end
    end
end
