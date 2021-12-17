import sqlite3
import pathlib
from create_project import create_project
from manage_projects import manage_projects

def main():
    connection, cursor = init_db()
    start(connection, cursor)

def get_projects(connection, cursor, status):
    return cursor.execute("SELECT * FROM projects WHERE status=?", (status,)).fetchall()

def display_project_names(projects):
    for p in projects:
        print(p[1])

def init_db():
    p = pathlib.Path("dbs/")
    p.mkdir(exist_ok=True)

    connection = sqlite3.connect('dbs/projects.db')
    cursor = connection.cursor()

    init_projects_table(cursor)
    return (connection, cursor)



def start(connection, cursor):
    projects = get_projects(connection, cursor, "ongoing")

    print("\nWelcome to WordCount(Down)\n")

    if projects:
        print("These are your ongoing projects: \n")
        display_project_names(projects)
        print("\nType 'view' to view and update existing projects")

    print("Type 'add' to add a new writing project\nType 'quit' to exit the program")

    answer = input()
    if answer == "view":
        if not projects: 
            print("\nSneaky. You have to add a project before you can view it.\n")
            return start(connection, cursor)
        manage_projects(connection, cursor)
    elif answer == "add":
        create_project(connection, cursor)
    elif answer.lower() == "quit":
        quit()
    return start(connection, cursor)


def init_projects_table(cursor):
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS projects (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, 
        word_count_goal INTEGER,
        current_word_count INTEGER,
        words_today INTEGER,
        deadline TEXT,
        start_date TEXT,
        last_updated TEXT,
        status TEXT
        )
    """)


main()
