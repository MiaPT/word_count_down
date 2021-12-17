import sqlite3
# TODO: give this file a better name
# here are the functions that fetch, calculate and display information about projects

def get_projects(connection, cursor, status):

    return cursor.execute("SELECT * FROM projects WHERE status=?", (status,)).fetchall()

def display_project_names(projects):
    for p in projects:
        print(p['name'])


def display_project_info_minimal(project):
    # name, days left, words left
    pass


def display_project_info_detailed(project):
    # name, deadline, words left, word goal, avg per day so far, avg per day to finish, 
    # words written/registered today, start date, 
    pass
