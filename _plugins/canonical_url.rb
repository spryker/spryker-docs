Jekyll::Hooks.register :pages, :pre_render do |page, config|
    next page unless File.extname(page.path).match?(/md|html/)

    config['page']['canonical_url'] = page.url
end
