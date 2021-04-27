module Jekyll
  class RenderInfoBlock < Liquid::Block

    def initialize(tag_name, markup, tokens)
      super
      params = Shellwords.split(markup)

      @type  = params[0] || "infoBox" #infoBox warningBox errorBox
      @title = params[1] || ""
    end

    def render(context)
      titleSection = ''
      if @title != ''
        titleSection = "<div class=\"title\">#{@title}</div>"
      end
      content = super
      "<section class='#{@type}'>#{titleSection}<div class='content'>#{content}</div></section>"
    end

  end
end

Liquid::Template.register_tag('info_block', Jekyll::RenderInfoBlock)

