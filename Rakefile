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
      puts "Checking #{options[:files].length} files..."
      
      # Create a temporary directory for the files to check
      Dir.mktmpdir do |temp_dir|
        # Copy all files to check into the temp directory maintaining their structure
        options[:files].each do |file|
          relative_path = file.sub(/^_site\//, '')
          target_file = File.join(temp_dir, relative_path)
          FileUtils.mkdir_p(File.dirname(target_file))
          FileUtils.cp(file, target_file)
        end

        # Copy the entire _site directory structure for proper link resolution
        FileUtils.cp_r(Dir.glob('_site/*'), temp_dir)

        # Configure HTMLProofer options
        check_options = options.reject { |k| k == :files }.merge({
          :disable_external => true,
          :allow_hash_href => true,
          :check_internal_hash => true,
          :check_html => false,
          :log_level => :info,
          :validation => {
            :links => true,
            :fragments => true
          }
        })

        # Check all files in the temporary directory
        HTMLProofer.check_directory(temp_dir, check_options).run
      end
    else
      HTMLProofer.check_directory(directory, options).run
    end
  rescue StandardError => e
    puts "Error details: #{e.class} - #{e.message}"
    puts e.backtrace.join("\n") if options[:log_level] == :debug
    
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
  
  # Convert markdown file paths to their HTML equivalents
  html_files = files.map do |file|
    if file.start_with?('_includes/')
      file.sub(/^_includes\//, '_site/_includes/').sub(/\.md$/, '.html')
    else
      file.sub(/^docs\//, '_site/docs/').sub(/\.md$/, '.html')
    end
  end.select { |f| File.exist?(f) && File.file?(f) }  # Only select files, not directories

  if html_files.empty?
    puts "No valid files to check"
    next
  end

  puts "Processing files: #{html_files.join(', ')}"

  # Run HTMLProofer with minimal options
  options = {
    :files => html_files,
    :ignore_urls => commonOptions[:ignore_urls],
    :url_ignore => [
      /\{\{.*?\}\}/,  # Ignore template variables
      %r{^#$},        # Ignore standalone hash links
      %r{^/$}         # Ignore root path
    ],
    :parallel => { :in_processes => 3 }  # Run checks in parallel for speed
  }
  
  begin
    run_htmlproofer_with_retry(nil, options)
    puts "\nLink validation completed successfully"
  rescue StandardError => e
    puts "\nErrors found in changed files:"
    puts e.message
    raise "HTML-Proofer found errors in changed files"
  end
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
