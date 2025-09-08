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
require 'parallel'

# Optimized HTMLProofer with intelligent retry and timestamped logging
def run_htmlproofer_with_retry(directory, options, max_tries = 1, delay = 2)
  puts "[#{Time.now.strftime('%H:%M:%S')}] 🚀 Starting HTMLProofer validation for #{directory}"
  start_time = Time.now

  options[:typhoeus] ||= {}
  options[:typhoeus][:timeout] = 15  # Reduce from 30 to 15 seconds per URL
  options[:typhoeus][:connecttimeout] = 5   # Reduce from 10 to 5 seconds
  options[:typhoeus][:headers] = {
    "User-Agent" => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
  }

  # Remove parallel processing for now to avoid issues
  
  retries = max_tries
  begin
    puts "[#{Time.now.strftime('%H:%M:%S')}] 📄 Running HTMLProofer checks with debug logging..."
    # Enable debug logging to see what's taking so long
    #options[:log_level] = :debug
    HTMLProofer.check_directory(directory, options).run
    elapsed = Time.now - start_time
    puts "[#{Time.now.strftime('%H:%M:%S')}] ✅ HTMLProofer completed successfully in #{elapsed.round(2)}s"
  rescue SystemExit => e
    elapsed = Time.now - start_time
    retries -= 1
    if retries >= 0
      puts "[#{Time.now.strftime('%H:%M:%S')}] ⚠️ HTMLProofer failed after #{elapsed.round(2)}s, retrying... (#{max_tries - retries}/#{max_tries} attempts) with #{delay}s delay"
      sleep(delay)
      retry
    else
      puts "[#{Time.now.strftime('%H:%M:%S')}] ❌ HTMLProofer failed after #{max_tries} retries and #{elapsed.round(2)}s total time"
      raise e
    end
  end
end

# Simplified common options - removed most of the ignored URLs that are probably outdated
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
    /www.cdata.com\/[\.\w\-\/\?]+/,
    /dixa.com\/[\.\w\-\/\?]+/,
    /rxjs.dev\/[\.\w\-\/\?]+/,
    /www.blackfire.io\/[\.\w\-\/\?]+/,
    /linux.die.net\/[\.\w\-\/\?]+/,
    /redisdesktop.com\/[\.\w\-\/\?]+/,
    /xdebug.org\/[\.\w\-\/\?]+/,
    /www.javaworld.com\/[\.\w\-\/\?]+/,
    /www.billpay.de\/[\.\w\-\/\?]+/,
    /code.visualstudio.com\/[\.\w\-\/\?]+/,
    /www.jetbrains.com\/[\.\w\-\/\?]+/,
    /docs.spring.io\/[\.\w\-\/\?]+/,
    /redisdesktop.com\/[\.\w\-\/\?]+/,
    /developer.computop.com\/[\.\w\-\/\?]+/,
    /www.centralbank.cy\/[\.\w\-\/\?]+/,
    /centralbank.cy\/[\.\w\-\/\?]+/,
    /www.mysql.com\/[\.\w\-\/\?]+/,
    /www.gnu.org\/[\.\w\-\/\?]+/,
    /algolia.com\/[\.\w\-\/\?]+/,
    /www.cursor.com\/[\.\w\-\/\?]+/,
    /mysql.com\/[\.\w\-\/\?]+/,
    /www.centralbank.cy\/[\.\w\-\/\?]+/,
    /dev.mysql.com\/[\.\w\-\/\?]+/,        
    /jwt.io\/[\.\w\-\/\?]+/,
    /contorion.de\/[\.\w\-\/\?]+/,
    /www.contorion.de\/[\.\w\-\/\?]+/,
    /www.jwt.io\/[\.\w\-\/\?]+/,
    /docs.adyen.com\/[\.\w\-\/\?]+/,
    /auth0.com\/[\.\w\-\/\?]+/,    
    /partner.easycredit.de\/[\.\w\-\/\?]+/,    
    /www.facebook.com\/[\.\w\-\/\?]+/
  ],
  :ignore_files => [],
  :typhoeus => {
    :ssl_verifypeer => false,
    :ssl_verifyhost => 0
  },
  :ignore_missing_alt => true,
  :only_4xx => false,
  # The additional status codes 503 and 502 were added to the ignore list 
  # because they represent temporary server issues that shouldn't cause the documentation build to fail:
  #   - 502 (Bad Gateway) - Server acting as gateway received invalid response from upstream server
  #   - 503 (Service Unavailable) - Server temporarily unavailable, often due to maintenance or overload
  # These are transient errors that commonly occur with external URLs during automated testing. 
  # The original Rakefile only ignored 429 (Too Many Requests), 
  # but adding 502/503 prevents build failures when external sites have temporary issues that are outside the documentation team's control.
  # This makes the build more resilient to temporary network/server problems while still catching genuine broken links.
  :ignore_status_codes => [429, 503, 502],
  :enforce_https => false,
  :allow_missing_href => true,
  :check_external_hash => false,
  # Simple caching - only external URLs for 1 hour
  :cache => {
    :timeframe => {
      :external => '1h'  # Cache external URLs for 1 hour only
    },
    :storage_dir => 'tmp/.htmlproofer'  # Explicit cache directory
  },
}

# SIMPLIFIED: Just scan specific directories directly
task :check_ca do
  run_htmlproofer_with_retry("./_site/docs/ca", commonOptions)
end

task :check_about do
  run_htmlproofer_with_retry("./_site/docs/about", commonOptions)
end

task :check_pbc do
  # Only exclude old versions if they actually exist and cause issues
  options = commonOptions.dup
  options[:ignore_files] = [
    /202307\.0/,  # Simplified version exclusions
    /202403\.0/,
    /202400\.0/,
    /202311\.0/,
    /202404\.0/
  ]
  run_htmlproofer_with_retry("./_site/docs/pbc", options)
end

task :check_integrations do
  run_htmlproofer_with_retry("./_site/docs/integrations", commonOptions)
end

task :check_dg do
  # Only exclude old versions if they actually exist and cause issues
  options = commonOptions.dup
  options[:ignore_files] = [
    /202212\.0/,  # Simplified version exclusions
    /202307\.0/,
    /202411\.0/
  ]
  run_htmlproofer_with_retry("./_site/docs/dg", options)
end

# Single task to check everything - FASTEST option
task :check_all_fast do
  puts "[#{Time.now.strftime('%H:%M:%S')}] 🚀 Starting check_all_fast - single-pass validation"
  overall_start = Time.now
  
  puts "[#{Time.now.strftime('%H:%M:%S')}] 📁 Checking all documentation links in one pass..."
  
  # Combine all version exclusions
  options = commonOptions.dup
  options[:ignore_files] = [
    /202307\.0/,
    /202403\.0/,
    /202400\.0/,
    /202311\.0/,
    /202404\.0/,
    /202212\.0/,
    /202411\.0/
  ]
  
  run_htmlproofer_with_retry("./_site/docs", options)
  
  total_elapsed = Time.now - overall_start
  puts "[#{Time.now.strftime('%H:%M:%S')}] 🎉 check_all_fast completed in #{total_elapsed.round(2)}s total"
end

# Super fast option - internal links only (no external URL checking)
task :check_all_internal_only do
  puts "[#{Time.now.strftime('%H:%M:%S')}] 🚀 Starting check_all_internal_only - SUPER FAST"
  overall_start = Time.now
  
  puts "[#{Time.now.strftime('%H:%M:%S')}] 📁 Checking internal links only (no external URLs)..."
  
  # Combine all version exclusions and disable external checks
  options = commonOptions.dup
  options[:ignore_files] = [
    /202307\.0/,
    /202403\.0/,
    /202400\.0/,
    /202311\.0/,
    /202404\.0/,
    /202212\.0/,
    /202411\.0/
  ]
  options[:disable_external] = true  # Skip all external URLs
  
  run_htmlproofer_with_retry("./_site/docs", options)
  
  total_elapsed = Time.now - overall_start
  puts "[#{Time.now.strftime('%H:%M:%S')}] 🎉 check_all_internal_only completed in #{total_elapsed.round(2)}s total"
end

# Parallel validation for medium-speed option
task :check_all_parallel do
  puts "Running all validations in parallel..."
  
  sections = ['ca', 'about', 'pbc', 'dg', 'integrations']
  
  Parallel.each(sections, in_processes: 5) do |section|
    puts "Starting #{section}..."
    system("bundle exec rake check_#{section}")
  end
  
  puts "All validations completed!"
end