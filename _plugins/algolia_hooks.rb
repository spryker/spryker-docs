module Jekyll
    module Algolia
        module Hooks
            def self.before_indexing_each(record, node, context)
                return record if not self.is_multiversion_page record, context

                return nil if not self.is_latest_version record, context

                record
            end

            def self.is_multiversion_page(record, context)
                record[:url].match(%r{\A/docs/(?<product>[\w-]+)/(?<role>[\w-]+)/(?<category>[\w-]+)/});
                product = Regexp.last_match(:product)
                role = Regexp.last_match(:role)
                category = Regexp.last_match(:category)
                versioned_categories = context.config['versioned_categories']

                return false if versioned_categories[product] == nil or
                    versioned_categories[product][role] == nil

                return versioned_categories[product][role].include? category
            end

            def self.is_latest_version(record, context)
                page_url = record[:url]
                latest_version_url = self.get_latest_version_url record, context
                latest_version_url === page_url
            end

            def self.get_latest_version_url(record, context)
                page_url = record[:url]
                all_pages = context.pages
                full_url_pattern = %r{\A#{page_url.gsub(%r{/v\d+/}, '/v\d+/')}\Z}
                versioned_urls = all_pages.select { |site_page| site_page.url.match full_url_pattern }.map(&:url)
                versioned_urls.sort_by { |version| version.scan(/(?<=\/v)\d+(?=\/)/).first.to_i }.pop
            end
        end
    end
end
