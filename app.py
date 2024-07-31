import os
import sys
from flask import Flask, send_file, render_template
from pycmarkgfm import gfm_to_html

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/content/<string:content_name>")
def content(content_name):
    md_files_list = []
    for content_file_name in os.listdir("static/content"):
        if content_file_name.endswith(".md"):
            md_files_list.append(content_file_name[:-3])
    if content_name in md_files_list:
        with open(f"static/content/{content_name}.md", "r", encoding="utf-8") as md_file:
            md_str = md_file.read()
        html = gfm_to_html(md_str)
        return html
    else:
        return "Content not found :("

@app.route("/hello")
def hello_world():
    return "<h1 style=\"font-family: Sans-serif\">Hello World!</h1>"