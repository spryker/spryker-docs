class Wistia < Liquid::Tag

  def initialize(tagName, markup, tokens)
    super
    @content = markup
    if markup =~ /^\s*([^\s]+)(?:\s+(\d+)\s+(\d+)\s*)?/i
      @videoId = $1

      if $3.nil? then
          @width = 960
          @height = 540
      else
          @width = $2.to_i
          @height = $3.to_i
      end
    else
      raise "No Wistia ID provided in the \"wistia\" tag"
    end
  end

  def render(context)
    w = @width
    h = @height
    intrinsic = ((h.to_f / w.to_f) * 100)
    padding_top = ("%.2f" % intrinsic).to_s  + "%"
    "<div class='post-content__video'>
      <div class='post-content__video-wrapper' style='padding-top: #{padding_top}'>
        <iframe  class='post-content__video-iframe' width='#{@width}' height='#{@height}' src='https://fast.wistia.net/embed/iframe/#{@videoId}' allowfullscreen title='video iframe'></iframe>
      </div>
    </div>"
  end

  Liquid::Template.register_tag "wistia", self
end
