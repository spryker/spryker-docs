module Jekyll
  class SidebarTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
        @context = context
        @page_url = get_page_url
        sidebar_data = get_sidebar_data

        return '' if sidebar_data.nil? or sidebar_data['nested'].nil?

        '<ul class="sidebar-nav">' + build_sidebar_string(sidebar_data['nested']) + '</ul>'
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
            sidebar_item_url = nested_item['url']
            sub_items = nested_item['nested']

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
  end
end

Liquid::Template.register_tag('render_sidebar', Jekyll::SidebarTag)
