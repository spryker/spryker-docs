module Jekyll
  module Algolia
    module Hooks
      def self.before_indexing_each(record, node, context)
        return nil if not self.is_latest_version record, context

        record
      end

      def self.is_latest_version(record, context)
        page_url = record[:url]
        latest_version_url = self.get_latest_version_url record, context
        latest_version_url === page_url
      end

      def self.get_latest_version_url(record, context)
        page_url = record[:url]
        all_pages = context.pages
        full_url_pattern = %r{\A#{page_url.gsub(%r{/\d+\.\d+/}, '(?<version>/\d+\.\d+/)')}\Z}
        versioned_urls = all_pages.select { |site_page| site_page.url.match full_url_pattern }.map(&:url)
        versioned_urls.sort_by { |version| version.scan(/\d+/).first.to_i }.pop
      end
    end
  end
end
