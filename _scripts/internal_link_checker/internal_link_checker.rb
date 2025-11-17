#!/usr/bin/env ruby
# frozen_string_literal: true

require 'nokogiri'
require 'set'
require 'pathname'
require 'parallel'
require 'find'
require 'uri'
require 'yaml'

class InternalLinkChecker
  attr_reader :site_dir, :errors, :ignore_patterns

  def initialize(site_dir, ignore_patterns: [])
    @site_dir = Pathname.new(site_dir)
    @errors = []
    @ignore_patterns = ignore_patterns
    @valid_files = Set.new
    @checked_links = {}
  end

  def run
    puts "🔍 Scanning for HTML files in #{site_dir}..."
    html_files = collect_html_files
    
    puts "📝 Found #{html_files.size} HTML files"
    puts "🏗️  Building valid files index..."
    build_valid_files_index(html_files)
    
    puts "🔗 Processing redirects from markdown files..."
    process_redirects
    
    puts "🔗 Checking internal links..."
    check_links(html_files)
    
    report_results
    exit(1) if errors.any?
  end

  private

  def collect_html_files
    html_files = []
    Find.find(site_dir.to_s) do |path|
      next unless path.end_with?('.html')
      
      relative_path = Pathname.new(path).relative_path_from(site_dir).to_s
      
      # Skip if matches any ignore pattern
      if ignore_patterns.any? { |pattern| pattern.match?(relative_path) }
        Find.prune
        next
      end
      
      html_files << path
    end
    html_files
  end

  def build_valid_files_index(html_files)
    html_files.each do |file_path|
      relative_path = Pathname.new(file_path).relative_path_from(site_dir).to_s
      
      # Add the file path
      @valid_files.add("/#{relative_path}")
      
      # For index.html files, also add directory path
      if relative_path.end_with?('/index.html')
        dir_path = relative_path.gsub(/index\.html$/, '')
        @valid_files.add("/#{dir_path}")
      end
      
      # Add without extension (Jekyll clean URLs)
      if relative_path.end_with?('.html') && !relative_path.end_with?('index.html')
        without_ext = relative_path.gsub(/\.html$/, '')
        @valid_files.add("/#{without_ext}")
        @valid_files.add("/#{without_ext}/")
      end
    end
    
    puts "✅ Indexed #{@valid_files.size} valid paths"
  end

  def process_redirects
    # Find project root (parent of _site)
    project_root = site_dir.parent
    redirect_count = 0
    
    # Find all markdown files in docs/
    docs_dir = project_root.join('docs')
    return unless docs_dir.exist?
    
    Find.find(docs_dir.to_s) do |path|
      next unless path.end_with?('.md')
      
      begin
        content = File.read(path)
        
        # Extract frontmatter
        if content =~ /\A---\s*\n(.*?)\n---\s*\n/m
          frontmatter = YAML.safe_load($1)
          
          if frontmatter && frontmatter['redirect_from']
            redirects = Array(frontmatter['redirect_from'])
            redirects.each do |redirect_path|
              # Add redirect path as valid (it should redirect to actual file)
              @valid_files.add(redirect_path)
              redirect_count += 1
            end
          end
        end
      rescue => e
        # Skip files that can't be parsed
      end
    end
    
    puts "✅ Added #{redirect_count} redirect paths"
  end

  def check_links(html_files)
    results = Parallel.map(html_files, in_threads: 4) do |file_path|
      check_file_links(file_path)
    end
    
    @errors = results.flatten.compact
  end

  def check_file_links(file_path)
    file_errors = []
    relative_file_path = Pathname.new(file_path).relative_path_from(site_dir).to_s
    
    begin
      doc = File.open(file_path) { |f| Nokogiri::HTML(f) }
      current_dir = File.dirname("/#{relative_file_path}")
      
      doc.css('a[href]').each do |link|
        href = link['href']
        next if skip_link?(href)
        
        # Parse the link
        target_path, anchor = parse_link(href, current_dir)
        next unless target_path # Skip if parsing failed or external link
        
        # Check if target exists (including cross-section links)
        unless link_exists?(target_path)
          file_errors << {
            file: relative_file_path,
            link: href,
            target: target_path,
            line: link.line
          }
        end
      end
    rescue => e
      puts "⚠️  Error processing #{relative_file_path}: #{e.message}"
    end
    
    file_errors
  end

  def skip_link?(href)
    return true if href.nil? || href.empty?
    return true if href.start_with?('#') # Same-page anchor
    return true if href.start_with?('http://', 'https://', '//', 'mailto:', 'tel:', 'javascript:')
    return true if href.start_with?('data:')
    
    # Skip non-HTML resources (XML, images, CSS, JS, etc)
    # We only validate internal HTML links
    return true if href.match?(/\.(xml|json|css|js|jpg|jpeg|png|gif|svg|pdf|zip|ico)$/i)
    
    false
  end

  def parse_link(href, current_dir)
    # Remove anchor
    path, anchor = href.split('#', 2)
    
    # Decode only percent-encoded characters (like %20 for space, %E2%80%93 for –)
    # But keep + as + (not decode to space, because + is valid in file paths)
    begin
      path = URI.decode_uri_component(path)
    rescue
      # If decode fails, use path as-is
    end
    
    # Handle absolute paths
    if path.start_with?('/')
      return [normalize_path(path), anchor]
    end
    
    # Handle relative paths
    if path.include?('../') || !path.start_with?('/')
      absolute_path = File.expand_path(path, current_dir)
      return [normalize_path(absolute_path), anchor]
    end
    
    [normalize_path(path), anchor]
  end

  def normalize_path(path)
    # Remove trailing slash for consistency, but keep root
    path = path.chomp('/') unless path == '/'
    
    # Ensure it starts with /
    path = "/#{path}" unless path.start_with?('/')
    
    path
  end

  def link_exists?(target_path)
    return true if @checked_links.key?(target_path)
    
    # Root is always valid
    return true if target_path == '/'
    
    exists = @valid_files.include?(target_path) ||
             @valid_files.include?("#{target_path}/") ||
             @valid_files.include?("#{target_path}.html") ||
             @valid_files.include?("#{target_path}/index.html")
    
    @checked_links[target_path] = exists
    exists
  end

  def report_results
    if errors.empty?
      puts "\n✅ All internal links are valid!"
    else
      puts "\n❌ Found #{errors.size} broken internal links:\n\n"
      
      # Group errors by file
      errors_by_file = errors.group_by { |e| e[:file] }
      
      errors_by_file.each do |file, file_errors|
        puts "📄 #{file}"
        file_errors.each do |error|
          puts "   Line #{error[:line]}: #{error[:link]} -> #{error[:target]}"
        end
        puts ""
      end
      
      puts "Total: #{errors.size} broken links in #{errors_by_file.size} files"
    end
  end
end

# CLI interface
if __FILE__ == $0
  require 'optparse'
  
  options = {
    site_dir: './_site',
    ignore_patterns: []
  }
  
  OptionParser.new do |opts|
    opts.banner = "Usage: internal_link_checker.rb [options]"
    
    opts.on("-d", "--dir DIR", "Site directory (default: ./_site)") do |dir|
      options[:site_dir] = dir
    end
    
    opts.on("-i", "--ignore PATTERN", "Regex pattern to ignore (can be used multiple times)") do |pattern|
      options[:ignore_patterns] << Regexp.new(pattern)
    end
  end.parse!
  
  checker = InternalLinkChecker.new(options[:site_dir], ignore_patterns: options[:ignore_patterns])
  checker.run
end
