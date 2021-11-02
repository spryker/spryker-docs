module Jekyll
    module VersionizeFilter
        def versionize(url, version)
            return url if url == nil or url.empty? or version == nil or version.empty?

            url.match(%r{\A/docs/(?<product>\w+)/(?<role>\w+)/(?<category>[\w-]+)/});
            product = Regexp.last_match(:product)
            role = Regexp.last_match(:role)
            category = Regexp.last_match(:category)

            return url if not shouldBeVersioned(product, role, category)

            url_prefix = "/docs/#{product}/#{role}/#{category}/"
            url.clone.insert(url_prefix.length, version + "/")
        end

        def shouldBeVersioned(product, role, category)
            versioned_categories = @context.registers[:site].config['versioned_categories']

            versioned_categories[product] != nil and
                versioned_categories[product][role] != nil and
                versioned_categories[product][role].include? category
        end
    end
end

Liquid::Template.register_filter(Jekyll::VersionizeFilter)
