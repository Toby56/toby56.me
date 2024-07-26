import os
import sys
from flask import Flask, send_file

app = Flask(__name__)

@app.route("/")
def hello_world():
    return send_file("../build/index.html")