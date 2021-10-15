task "assets:precompile" do
  exec("jekyll build --config=_config.yml,_config_production.yml")
end

require 'html-proofer'

task :check do
  options = {
    :allow_hash_href => true,
    :url_ignore => [
      /mysprykershop.com\/[\.\w\-\/\?]+/,
      /mysprykershop.com:10007\/[\.\w\-\/\?]+/,
      /github.com\/[\.\w\-\/]+\.md/
    ],
    :file_ignore => [
      /docs\/scos\/\w+\/[\w-]+\/201811\.0\/.+/,
      /docs\/scos\/\w+\/[\w-]+\/201903\.0\/.+/,
      /docs\/scos\/\w+\/[\w-]+\/201907\.0\/.+/,
      /docs\/scos\/\w+\/[\w-]+\/202001\.0\/.+/,
      /docs\/scos\/\w+\/[\w-]+\/202005\.0\/.+/,
      /docs\/scos\/\w+\/[\w-]+\/202009\.0\/.+/
    ],
    :typhoeus => {
      :ssl_verifypeer => false,
      :ssl_verifyhost => 0
    },
    :disable_external => true,
    :check_html => false,
    :empty_alt_ignore => true,
    :only_4xx => true,
    :http_status_ignore => [429],
    :parallel => { :in_processes => 4},
    :cache => { :timeframe => '2w' }
  }
  HTMLProofer.check_directory("./_site", options).run
end
