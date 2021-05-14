module Jekyll
    module VersionizeFilter
        def versionize(url, version)
            return url if url == nil or url.empty? or version == nil or version.empty?

            url.match(%r{\A/docs/(?<product>\w+)/(?<role>\w+)/(?<category>[\w-]+)/});
            product = Regexp.last_match(:product)
            role = Regexp.last_match(:role)
            category = Regexp.last_match(:category)

            # check if url should be versioned
            versioned_categories = @context.registers[:site].config['versioned_categories']

            return url if versioned_categories[product] == nil or
                versioned_categories[product][role] == nil or not
                versioned_categories[product][role].include? category

            url_prefix = "/docs/#{product}/#{role}/#{category}/"
            url.clone.insert(url_prefix.length, version + "/")
        end
    end
end

Liquid::Template.register_filter(Jekyll::VersionizeFilter)
