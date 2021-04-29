module Jekyll
  module Algolia
    module Hooks
      def self.before_indexing_each(record, node, context)
        return nil if not record[:url].match? %r{/#{context.config['current_version']}/}

        record
      end
    end
  end
end
