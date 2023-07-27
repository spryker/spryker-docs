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
    /www.project-a.com\/[\.\w\-\/\?]+/,
    /help.github.com\/[\.\w\-\/\?]+/,
    /guides.github.com\/[\.\w\-\/\?]+/,
    /docs.github.com\/[\.\w\-\/\?]+/,
    /shopify.github.io\/[\.\w\-\/\?]+/,
    /marketplace.visualstudio.com\/[\.\w\-\/\?]+/,
    /www.nekom.com\/[\.\w\-\/\?]+/,
    /www.phpunit.de\/[\.\w\-\/\?]+/,
    /rpm.newrelic.com\/[\.\w\-\/\?]+/,
    /martin-loetzsch.de\/[\.\w\-\/\?]+/,
    /php.net\/[\.\w\-\/\?]+/,
    /atom.io\/[\.\w\-\/\?]+/,
    /www.acunetix.com\/[\.\w\-\/\?]+/,
    /gcc.gnu.org\/[\.\w\-\/\?]+/,
    /github.com\/[\.\w\-\/\?]+/,
    /www.collect.ai\/[\.\w\-\/\?]+/,
    /twitter.com\/[\.\w\-\/\?]+/,
    /www.optimise-it.de\/[\.\w\-\/\?]+/,
    /blackfire.io\/[\.\w\-\/\?]+/,
    /dixa.com\/[\.\w\-\/\?]+/,
    /rxjs.dev\/[\.\w\-\/\?]+/,
    /www.blackfire.io\/[\.\w\-\/\?]+/
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

task :check_acp_user do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/fes\/.+/,
    /docs\/scu\/.+/,
    /docs\/pbc\/.+/,
    /docs\/sdk\/.+/
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_cloud do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/fes\/.+/,
    /docs\/marketplace\/.+/,
    /docs\/scu\/.+/,
    /docs\/pbc\/.+/,
    /docs\/acp\/.+/,
    /docs\/sdk\/.+/
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_mp_dev do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/cloud\/.+/,
    /docs\/fes\/.+/,
    /docs\/scu\/.+/,
    /docs\/acp\/.+/,
    /docs\/marketplace\/user\/.+/,
    /docs\/pbc\/.+/,
    /docs\/marketplace\/\w+\/[\w-]+\/202108\.0\/.+/,
    /docs\/sdk\/.+/,
    /docs\/marketplace\/\w+\/[\w-]+\/202204\.0\/.+/,
    /docs\/marketplace\/\w+\/[\w-]+\/202204\.0\/.+/,
    /docs\/marketplace\/\w+\/[\w-]+\/202212\.0\/.+/,
    /docs\/marketplace\/\w+\/[\w-]+\/202400\.0\/.+/
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_mp_user do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/cloud\/.+/,
    /docs\/fes\/.+/,
    /docs\/scu\/.+/,
    /docs\/acp\/.+/,
    /docs\/marketplace\/dev\/.+/,
    /docs\/marketplace\/\w+\/[\w-]+\/202108\.0\/.+/,
    /docs\/pbc\/.+/,
    /docs\/sdk\/.+/,
    /docs\/marketplace\/\w+\/[\w-]+\/202204\.0\/.+/,
    /docs\/marketplace\/\w+\/[\w-]+\/202212\.0\/.+/,
    /docs\/marketplace\/\w+\/[\w-]+\/202400\.0\/.+/
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_scos_dev do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/fes\/.+/,
    /docs\/scu\/.+/,
    /docs\/acp\/.+/,
    /docs\/sdk\/.+/,
    /docs\/scos\/user\/.+/,
    /docs\/pbc\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201811\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201903\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201907\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202001\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202005\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202009\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202108\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202204\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202400\.0\/.+/
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_scos_user do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/acp\/.+/,
    /docs\/scos\/dev\/.+/,
    /docs\/fes\/.+/,
    /docs\/scu\/.+/,
    /docs\/pbc\/.+/,
    /docs\/sdk\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201811\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201903\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/201907\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202001\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202005\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202009\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202108\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202204\.0\/.+/,
    /docs\/scos\/\w+\/[\w-]+\/202400\.0\/.+/
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_scu do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/acp\/.+/,
    /docs\/fes\/.+/,
    /docs\/pbc\/.+/,
    /docs\/sdk\/.+/
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_pbc do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/marketplace\/.+/,
    /docs\/sdk\/.+/,
    /docs\/cloud\/.+/,
    /docs\/fes\/.+/,
    /docs\/acp\/.+/,
    /docs\/scu\/.+/,
    /docs\/pbc\/\w+\/[\w-]+\/202307\.0\/.+/,
    /docs\/pbc\/\w+\/[\w-]+\/202400\.0\/.+/
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_sdk do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/acp\/.+/,
    /docs\/fes\/.+/,
    /docs\/pbc\/.+/,
    /docs\/paas-plus\/.+/
  ]
  HTMLProofer.check_directory("./_site", options).run
end
