import sys
from jinja2 import Environment, FileSystemLoader, select_autoescape


env = Environment(
    loader=FileSystemLoader(["./", "_includes/"]),
    autoescape=select_autoescape()
)

template = env.get_template(sys.argv[1])
print(template.render(the="variables", go="here"))