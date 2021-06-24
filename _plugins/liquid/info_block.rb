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
      blockIcon = ''
      blockModifier = ''
      if @title != ''
        titleSection = "<div class=\"info-block__title\">#{@title}</div>"
      end
      if @type == 'warningBox'
        blockIcon = 'icon-warning'
        blockModifier = 'info-block--warning'
      elsif @type == 'errorBox'
        blockIcon = 'icon-error'
        blockModifier = 'info-block--error'
      else
        blockIcon = 'icon-info'
      end
      content = super
      "<section class='info-block #{blockModifier}'><i class='info-block__icon #{blockIcon}'></i><div class='info-block__content'>#{titleSection}#{content}</div></section>"
    end

  end
end

Liquid::Template.register_tag('info_block', Jekyll::RenderInfoBlock)

