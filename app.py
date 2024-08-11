import os
import sys
from platform import platform

from flask import Flask, request, url_for, render_template, redirect
from requests import get
from markupsafe import Markup

from pycmarkgfm import gfm_to_html


content_list = []
for file_name in os.listdir("static/content"):
    if file_name.endswith(".md"):
        content_list.append(file_name[:-3])


app = Flask(__name__)


@app.route("/")
def index(content_html=""):
    if "toby56.me" in request.host:
        static_url = "https://static.toby56.me"
    else:
        static_url = "/static"

    return render_template(
        "index.html",
        content_list=content_list,
        content_html=content_html,
        index=True,
        static_url=static_url
    )

from requests import get

@app.route('/ptv', defaults={'path': ''})
@app.route('/ptv/<path:path>')
def proxy(path):
  return get(os.path.join("http://127.0.0.1:8080", path)).content


@app.route("/page/<string:content_name>")
def page(content_name):
    if content_name in content_list:
        with open(f"static/content/{content_name}.md", "r", encoding="utf-8") as md_file:
            md_str = md_file.read()

        content_html = gfm_to_html(md_str)

        return index(content_html)
    else:
        return redirect("/")



@app.route("/content/<string:content_name>")
def content(content_name):
    if content_name in content_list:
        with open(f"static/content/{content_name}.md", "r", encoding="utf-8") as md_file:
            md_str = md_file.read()
        html = gfm_to_html(md_str)

        return html
    else:
        return "Content not found :("


@app.route("/hello")
def hello_world():
    return f"""<span style=\"font-family: monospace\">
        Hello World!<br>
        Python v{sys.version.split()[0]}<br>
        Serving from {request.host}<br>
        Running on {platform()}
    </span>"""