import sqlite3
import pathlib

projects = None

p = pathlib.Path("dbs/")
p.mkdir(exist_ok=True)

connection = sqlite3.connect('dbs/projects.db')
connection.row_factory = sqlite3.Row
cursor = connection.cursor()
