FROM ruby:3.2.2-slim

# Set UTF-8 locale and noninteractive apt (for any Debian-based image)
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8 \
    DEBIAN_FRONTEND=noninteractive

# Install build tools and other dependencies
RUN apt-get update && apt-get install -y \
    build-essential git curl nodejs npm  \
    && rm -rf /var/lib/apt/lists/*

# Set working directory for the Jekyll app
WORKDIR /usr/src/app

# Copy the project (Jekyll site source) into the image
COPY . .

# Install Bundler and project gems (including Jekyll)
RUN gem install bundler jekyll && bundle install

# Expose Jekyll's default preview port (4000) and LiveReload port (35729)
EXPOSE 4000 35729

# Default command to serve the Jekyll site with live-reloading
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--incremental", "--livereload", "--force_polling"]
