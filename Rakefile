task "assets:precompile" do
  exec("jekyll build --config=_config.yml,_config_production.yml")
end

require 'html-proofer'

commonOptions = {
  :allow_hash_href => true,
  :url_ignore => [
    /mysprykershop.com\/[\.\w\-\/\?]+/,
    /b2c-demo-shop.local\/[\.\w\-\/\?]+/,
    /b2b-demo-shop.local\/[\.\w\-\/\?]+/,
    /mydomain.com\/[\.\w\-\/\?]+/,
    /demoshop.local\/[\.\w\-\/\?]+/,
    /zed.mysprykershop.com:10007/,
    /www.pexels.com\/[@\.\w\-\/\?]+/,
    /pixabay.com\/[\.\w\-\/\?]+/,
    /xentral.com\/[\.\w\-\/\?]+/,
    /github.com\/[\.\w\-\/]+\.md/,
    /www.virtualbox.org\/[@\.\w\-\/\?]+/,
    /de.linkedin.com\/[@\.\w\-\/\?]+/,
    /www.linkedin.com\/[@\.\w\-\/\?]+/,
    /www.instagram.com\/[\.\w\-\/\?]+/,
    /eur-lex.europa.eu\/[\.\w\-\/\?]+/,
    /docs.adyen.com\/[\.\w\-\/\?]+/,
    /www.adyen.com\/[\.\w\-\/\?]+/,
    /bugs.php.net\/[\.\w\-\/\?]+/,
    /pci.payone.de\/[\.\w\-\/\?]+/,
    /www.iso.org\/[\.\w\-\/\?]+/,
    /www.vagrantup.com\/[\.\w\-\/\?]+/,
    /stackoverflow.com\/[\.\w\-\/\?]+/,
    /symfony.com\/[\.\w\-\/\?]+/,
    /code.jquery.com\/[\.\w\-\/\?]+/,
    /console.aws.amazon.com\/[\.\w\-\/\?]+/,
    /www.computop.com\/[\.\w\-\/\?]+/,
    /shopify.github.io\/[\.\w\-\/\?]+/
  ],
  :file_ignore => [],
  :typhoeus => {
    :ssl_verifypeer => false,
    :ssl_verifyhost => 0
  },
  :disable_external => false,
  :check_html => true,
  :validation => {
    :report_eof_tags => true,
    :report_invalid_tags => true,
    :report_mismatched_tags => true,
    :report_missing_doctype => true,
    :report_missing_names => true,
    :report_script_embeds => true,
  },
  :empty_alt_ignore => true,
  :only_4xx => false,
  :http_status_ignore => [429],
  :parallel => { :in_threads => 3}
}

task :check_cloud do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/fes\/.+/,
    /docs\/marketplace\/.+/,
    /docs\/paas-plus\/.+/,
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_mp_dev do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/cloud\/.+/,
    /docs\/fes\/.+/,
    /docs\/paas-plus\/.+/,
    /docs\/marketplace\/user\/.+/,
    /docs\/marketplace\/\w+\/[\w-]+\/202200\.0\/.+/
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_mp_user do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/cloud\/.+/,
    /docs\/fes\/.+/,
    /docs\/paas-plus\/.+/,
    /docs\/marketplace\/dev\/.+/,
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_scos_dev do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/fes\/.+/,
    /docs\/paas-plus\/.+/,
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

task :check_scos_dev_2020090 do
  options = commonOptions.dup
  options[:only_4xx] = false
  options[:file_ignore] = [
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/scos\/user\/.+/,
    /docs\/fes\/.+/,
    /docs\/paas-plus\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201811\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201903\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201907\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202001\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202005\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202108\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202200\.0\/.+/
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_scos_user do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/scos\/dev\/.+/,
    /docs\/fes\/.+/,
    /docs\/paas-plus\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201811\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201903\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201907\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202001\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202005\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202200\.0\/.+/
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_fes do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/aop\/.+/,
    /docs\/paas-plus\/.+/,
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_paas_plus do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/aop\/.+/,
    /docs\/fes\/.+/,
  ]
  HTMLProofer.check_directory("./_site", options).run
end
