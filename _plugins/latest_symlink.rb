# @todo reaplce this with redirects
Jekyll::Hooks.register :site, :post_write do |site|

    system("sh", "./_scripts/create_symlinks.sh", site.config['destination'], site.config['version'])
end
# bundle exec jekyll build --profil
