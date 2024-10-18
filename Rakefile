task "assets:precompile" do
  deploy_env = ENV['DEPLOY_ENV'] || 'production'

  if deploy_env == 'production'
    puts "Running Production Build"
    exec("jekyll build --config=_config.yml,_config_production.yml")
  else
    puts "Running Staging Build"
    exec("jekyll build --config=_config.yml,_config_staging.yml")
  end
end

require 'html-proofer'

# Method to run HTMLProofer with retries
def run_htmlproofer_with_retry(directory, options, max_retries = 3, delay = 5)
  retries = max_retries
  begin
    HTMLProofer.check_directory(directory, options).run
  rescue HTMLProofer::Error => e
    retries -= 1
    if retries > 0
      puts "Retrying... (#{max_retries - retries}/#{max_retries} attempts)"
      sleep(delay) # Wait before retrying
      retry
    else
      puts "HTMLProofer failed after #{max_retries} retries."
      raise e
    end
  end
end

commonOptions = {
  :allow_hash_href => true,
  :ignore_urls => [
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
    /www.blackfire.io\/[\.\w\-\/\?]+/,
    /linux.die.net\/[\.\w\-\/\?]+/,
    # check next url's
    /redisdesktop.com\/[\.\w\-\/\?]+/,
    /xdebug.org\/[\.\w\-\/\?]+/,
    /www.javaworld.com\/[\.\w\-\/\?]+/,
    /www.billpay.de\/[\.\w\-\/\?]+/,
    /code.visualstudio.com\/[\.\w\-\/\?]+/,
    /www.jetbrains.com\/[\.\w\-\/\?]+/,
    /docs.spring.io\/[\.\w\-\/\?]+/,
    'http://redisdesktop.com/',
  ],
  :ignore_files => [],
  :typhoeus => {
    :ssl_verifypeer => false,
    :ssl_verifyhost => 0
  },
  :ignore_missing_alt => true,
  :only_4xx => false,
  :ignore_status_codes => [429],
  :enforce_https => false,
  # delete and fix next rules
  :allow_missing_href => true,
  :check_external_hash => false,
}

task :check_ca do
  options = commonOptions.dup
  options[:ignore_files] = [
    /docs\/scos\/.+/,
    /docs\/fes\/.+/,
    /docs\/pbc\/.+/,
    /docs\/about\/.+/,
    /docs\/dg\/.+/,
    /docs\/acp\/.+/
  ]
  run_htmlproofer_with_retry("./_site", options)
end

task :check_about do
  options = commonOptions.dup
  options[:ignore_files] = [
    /docs\/ca\/.+/,
    /docs\/acp\/.+/,
    /docs\/scos\/dev\/.+/,
    /docs\/fes\/.+/,
    /docs\/pbc\/.+/,
    /docs\/dg\/.+/
  ]
  run_htmlproofer_with_retry("./_site", options)
end

task :check_pbc do
  options = commonOptions.dup
  options[:ignore_files] = [
    /docs\/scos\/.+/,
    /docs\/about\/.+/,
    /docs\/ca\/.+/,
    /docs\/fes\/.+/,
    /docs\/acp\/.+/,
    /docs\/dg\/.+/,
    /docs\/pbc\/\w+\/[\w-]+\/202307\.0\/.+/,
    /docs\/pbc\/\w+\/[\w-]+\/202403\.0\/.+/,
    /docs\/pbc\/\w+\/[\w-]+\/202400\.0\/.+/,
    /docs\/pbc\/\w+\/[\w-]+\/202410\.0\/.+/
  ]
  run_htmlproofer_with_retry("./_site", options)
end


task :check_dg do
  options = commonOptions.dup
  options[:ignore_files] = [
    /docs\/scos\/.+/,
    /docs\/ca\/.+/,
    /docs\/acp\/.+/,
    /docs\/about\/.+/,
    /docs\/fes\/.+/,
    /docs\/pbc\/.+/,
    /docs\/dg\/\w+\/[\w-]+\/202212\.0\/.+/,
    /docs\/dg\/\w+\/[\w-]+\/202307\.0\/.+/,
    /docs\/dg\/\w+\/[\w-]+\/202410\.0\/.+/,
    /docs\/dg\/\w+\/[\w-]+\/202411\.0\/.+/
  ]
  run_htmlproofer_with_retry("./_site", options)
end
