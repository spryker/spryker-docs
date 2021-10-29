task "assets:precompile" do
  exec("jekyll build --config=_config.yml,_config_production.yml")
end

require 'html-proofer'

commonOptions = {
  :allow_hash_href => true,
  :url_ignore => [
    /mysprykershop.com\/[\.\w\-\/\?]+/,
    /b2c-demo-shop.local\/[\.\w\-\/\?]+/,
    /zed.de.b2b-demo-shop.local\/[\.\w\-\/\?]+/,
    /mydomain.com\/[\.\w\-\/\?]+/,
    /demoshop.local\/[\.\w\-\/\?]+/,
    /mysprykershop.com:10007\/[\.\w\-\/\?]+/,
    /www.pexels.com\/[@\.\w\-\/\?]+/,
    /pixabay.com\/[\.\w\-\/\?]+/,
    /xentral.com\/[\.\w\-\/\?]+/,
    /github.com\/[\.\w\-\/]+\.md/
  ],
  :file_ignore => [],
  :typhoeus => {
    :ssl_verifypeer => false,
    :ssl_verifyhost => 0
  },
  :disable_external => false,
  :check_html => false,
  :empty_alt_ignore => true,
  :only_4xx => true,
  :http_status_ignore => [429],
  :parallel => { :in_processes => 4},
  :cache => { :timeframe => '2w' }
}

task :check_Cloud do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/marketplace\/.+/,
  ]
  HTMLProofer.check_directory("./_site", options).run
end
task :check_MP_Dev do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/cloud\/.+/,
    /docs\/marketplace\/user\/.+/,
  ]
  HTMLProofer.check_directory("./_site", options).run
end
task :check_MP_User do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/cloud\/.+/,
    /docs\/marketplace\/dev\/.+/,
  ]
  HTMLProofer.check_directory("./_site", options).run
end
task :check_SCOS_Dev do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/scos\/user\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201811\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201903\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201907\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202001\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202005\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202009\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202200\.0\/.+/
  ]
  HTMLProofer.check_directory("./_site", options).run
end
task :check_SCOS_User do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/cloud\/.+/,
    /docs\/scos\/dev\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201811\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201903\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201907\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202001\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202005\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202009\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202200\.0\/.+/
  ]
  HTMLProofer.check_directory("./_site", options).run
end
