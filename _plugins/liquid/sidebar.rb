module Jekyll
  class SidebarTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
        @context = context
        @version = get_current_version
        @page_url = get_page_url
        sidebar_data = get_sidebar_data

        return '' if sidebar_data.nil? or sidebar_data['nested'].nil?

        '<ul class="sidebar-nav">' + build_sidebar_string(sidebar_data['nested']) + '</ul>'
    end

    def get_current_version()
        !@context['page']['version'].nil? ? @context['page']['version'] : @context['site']['version']
    end

    def get_page_url()
        @context['page']['url']
    end

    def get_sidebar_name()
        @context['page']['sidebar']
    end

    def get_sidebar_data()
        @context['site']['data']['sidebars'][get_sidebar_name]['entries'][0]
    end

    def build_sidebar_string(sidebar_data)
        sidebar_string = ''
        sidebar_data.each do |nested_item|
            sidebar_item_title = nested_item['title']
            sidebar_item_url = versionize_url(nested_item['url'])
            include_versions = nested_item['include_versions']
            sub_items = nested_item['nested']

            next nested_item unless include_versions.nil? or include_versions.include? @version

            if sidebar_item_url.nil? then
                sidebar_string += <<-EOF
<li>
    <a href="#" class="sidebar-nav__opener">
        <i class="icon-arrow-right"></i>
        <strong class="sidebar-nav__title">#{sidebar_item_title}</strong>
    </a>
EOF
            elsif !sub_items.nil? and sidebar_item_url == @page_url then
                sidebar_string += <<-EOF
<li class="active-page-item active">
    <a href="#" class="sidebar-nav__opener sidebar-nav__link">
        <i class="icon-arrow-right"></i>
        <strong class="sidebar-nav__title">#{sidebar_item_title}</strong>
    </a>
EOF
            else
                sidebar_item_title_clean = sidebar_item_title.dup
                sidebar_item_title_clean.gsub!(/[^0-9A-Za-z ]/, '')
                sidebar_string += <<-EOF
<li#{' class="active-page-item"' if sidebar_item_url == @page_url}>
    <a title="#{sidebar_item_title_clean}" href="#{sidebar_item_url}" class="sidebar-nav__link#{' sidebar-nav__link--shifted' unless sidebar_item_url.nil? || sub_items.nil? }">#{sidebar_item_title}</a>
EOF
                unless sidebar_item_url.nil? || sub_items.nil?
                    sidebar_string += <<-EOF
    <a href="#" class="sidebar-nav__opener sidebar-nav__opener--small">
        <i class="icon-arrow-right"></i>
    </a>
EOF
                end
            end

            if not sub_items.nil? then
                sidebar_string += '<ul>' + build_sidebar_string(sub_items) + '</ul>'
            end
            sidebar_string += '</li>'
        end

        return sidebar_string
    end
    
    def versionize_url(url)
        return url if url == nil or url.empty? or @version == nil or @version.empty?
    
        url.match(%r{\A/docs/(?<product>\w+)/(?<role>\w+)/(?<category>[\w-]+)/});
        product = Regexp.last_match(:product)
        role = Regexp.last_match(:role)
        category = Regexp.last_match(:category)
    
        return url if not shouldBeVersioned(product, role, category)
    
        url_prefix = "/docs/#{product}/#{role}/#{category}/"
        url.clone.insert(url_prefix.length, @version + "/")
    end
    
    def shouldBeVersioned(product, role, category)
        versioned_categories = @context.registers[:site].config['versioned_categories']
    
        versioned_categories[product] != nil and
            versioned_categories[product][role] != nil and
            versioned_categories[product][role].include? category
    end
  end
end

Liquid::Template.register_tag('render_sidebar', Jekyll::SidebarTag)
