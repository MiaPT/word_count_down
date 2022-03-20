import sqlite3
import pathlib
from colorama import init
import project_info
from manage_projects import manage_projects, create_project

def main():
    init()
    connection, cursor = init_db()
    start(connection, cursor)


def init_db():
    p = pathlib.Path("dbs/")
    p.mkdir(exist_ok=True)

    connection = sqlite3.connect('dbs/projects.db')
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    init_projects_table(cursor)
    return (connection, cursor)



def start(connection, cursor):
    projects = project_info.get_projects(cursor, "ongoing")

    print("\nWelcome to WordCount(Down)\n")

    if projects:
        print("These are your ongoing projects: \n")
        project_info.display_project_names(projects)
        print("\nType 'view' to view and update existing projects")

    print("Type 'add' to add a new writing project\nType 'quit' to exit the program")

    answer = input()
    if answer == "view":
        if not projects: 
            print("\nSneaky. You have to add a project before you can view it.\n")
            return start(connection, cursor)
        manage_projects(connection, cursor, projects)
    elif answer == "add":
        create_project(connection, cursor)
    elif answer.lower() == "quit":
        quit()
    return start(connection, cursor)


def init_projects_table(cursor): #TODO: change 'name' -> 'title'. Why on earth would I call it "name"...
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
