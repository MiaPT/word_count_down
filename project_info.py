import sqlite3
from colorama import Fore, Style
from datetime import datetime, date
# TODO: give this file a better name
# here are the functions that fetch, calculate and display information about projects

def get_projects(cursor, status):
    return cursor.execute("SELECT * FROM projects WHERE status=?", (status,)).fetchall()

def display_project_names(projects):
    for p in projects:
        print(p['name'])

#def color_text()

def display_project_info_minimal(project):
    days_left = (text_to_date(project['deadline']) - date.today()).days
    current_wc = project['current_word_count']
    words_left = project['word_count_goal'] - current_wc

    print("\nProject ID:  ", project['ID'])
    print("Project title:  ", project['name'])
    print("Current word count:  ", (Fore.LIGHTGREEN_EX + str(current_wc) + Style.RESET_ALL))
    print("Words left to write:  ", words_left)
    print("Days until deadline:  ", days_left)

    return (days_left, current_wc, words_left)
    




def display_project_info_detailed(project):
    days_left, current_wc, words_left = display_project_info_minimal(project)
    print("")
    #avg words to write until deadline
    #avg words written per day so far
    #start date
    #deadline 
    #last updated



    # name, deadline, words left, word goal, avg per day so far, avg per day to finish, 
    # words written/registered today, start date, 
    pass

def days_diff(text_date1, text_date2):
    date1 = text_to_date(text_date1)
    date2 = text_to_date(text_date2)
    return date2-date1

def date_to_text(dt):
    return dt.strftime("%d-%m-%Y")

def text_to_date(text):
    return datetime.strptime(text, "%d-%m-%Y").date()

def even_length(s):
    