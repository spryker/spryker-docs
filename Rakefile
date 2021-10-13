task "assets:precompile" do
  exec("jekyll build --config=_config.yml,_config_production.yml")
end

require 'html-proofer'

task :check do
  options = {
    :allow_hash_href => true,
    :url_ignore => ["/glue.mysprykershop.com\/[\.\w\-\/\?]+/", "/github.com\/[\.\w\-\/]+\.md/"],
    :check_html => false,
    :empty_alt_ignore => true,
    :only_4xx => false,
    :http_status_ignore => [429],
    :parallel => { :in_processes => 4},
    :cache => { :timeframe => '2w' }
  }
  HTMLProofer.check_directory("./_site", options).run
end