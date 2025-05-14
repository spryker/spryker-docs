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
def run_htmlproofer_with_retry(directory, options, max_tries = 1, delay = 5)
  options[:typhoeus] ||= {}
  options[:typhoeus][:timeout] = 60
  options[:typhoeus][:headers] = {
    "User-Agent" => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
  }

  retries = max_tries
  begin
    if options[:files]
      # Check each file individually since HTMLProofer doesn't support multiple files in one call
      options[:files].each do |file|
        puts "Checking file: #{file}"
        HTMLProofer.check_file(file, options.reject { |k| k == :files }).run
      end
    else
      HTMLProofer.check_directory(directory, options).run
    end
  rescue SystemExit => e
    retries -= 1
    if retries >= 0
      puts "Retrying... (#{max_tries - retries}/#{max_tries} attempts)"
      sleep(delay) # Wait before retrying
      retry
    else
      puts "HTMLProofer failed after #{max_tries} retries."
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
    /jwt.io\/[\.\w\-\/\?]+/,
    /developer.computop.com\/[\.\w\-\/\?]+/,
    /www.centralbank.cy\/[\.\w\-\/\?]+/,
    /www.mysql.com\/[\.\w\-\/\?]+/,
    /www.gnu.org\/[\.\w\-\/\?]+/,
    /algolia.com\/[\.\w\-\/\?]+/,
    /www.cursor.com\/[\.\w\-\/\?]+/,
    /mysql.com\/[\.\w\-\/\?]+/,
    /dev.mysql.com\/[\.\w\-\/\?]+/,        
    /jwt.io\/[\.\w\-\/\?]+/,
    /auth0.com\/[\.\w\-\/\?]+/,    
    /www.facebook.com\/[\.\w\-\/\?]+/

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
    /docs\/pbc\/\w+\/[\w-]+\/202311\.0\/.+/,
    /docs\/pbc\/\w+\/[\w-]+\/202505\.0\/.+/,
    /docs\/pbc\/\w+\/[\w-]+\/202404\.0\/.+/
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
    /docs\/dg\/\w+\/[\w-]+\/202411\.0\/.+/
  ]
  run_htmlproofer_with_retry("./_site", options)
end

task :check_changed_files, [:file_list] do |t, args|
  puts "Running link validation on changed files..."
  
  # Split by spaces and clean up paths
  files = args[:file_list].split(/\s+/).map(&:strip).reject(&:empty?)
  
  # Convert markdown file paths to their corresponding HTML paths in _site
  site_files = files.map do |file|
    if file.start_with?('_includes/')
      # Handle _includes files
      file = file.sub(/^_includes\//, '').sub(/\.md$/, '.html')
      "_site/_includes/#{file}"
    else
      # Handle docs files - convert .md to .html
      file = file.sub(/^docs\//, '').sub(/\.md$/, '.html')
      "_site/docs/#{file}"
    end
  end
  
  # Filter out non-existent files
  existing_files = site_files.select do |file|
    exists = File.exist?(file)
    puts "Warning: File not found: #{file}" unless exists
    exists
  end
  
  if existing_files.empty?
    puts "No files to check - all specified files were not found in _site directory"
    next # Use 'next' instead of 'return' in Rake tasks
  end
  
  puts "Checking files: #{existing_files.join(', ')}"
  
  options = commonOptions.dup
  options[:files] = existing_files
  
  run_htmlproofer_with_retry("./_site", options)
  
  puts "Link validation completed for changed files"
end

task :check_all do
  puts "Running all link validation checks..."
  
  [:check_ca, :check_about, :check_pbc, :check_dg].each do |check|
    begin
      puts "\nRunning #{check}..."
      Rake::Task[check].invoke
      puts "#{check} completed successfully"
    rescue => e
      puts "#{check} failed: #{e.message}"
      raise e
    end
  end
  
  puts "\nAll link validation checks completed successfully"
end
