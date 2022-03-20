import sqlite3
from colorama import Fore, Style
from datetime import datetime, date
import shared


def get_projects(cursor, status="ongoing"):
    return cursor.execute("SELECT * FROM projects WHERE status=?", (status,)).fetchall()

def display_project_names():
    for p in shared.projects:
        print(p['name'])

def display_project_info_minimal(project):
    days_left = (text_to_date(project['deadline']) - date.today()).days
    current_wc = project['current_word_count']
    words_left = project['word_count_goal'] - current_wc

    print("\nProject ID:".ljust(23), project['ID'])
    print("Project title:".ljust(23), project['name'])
    print("Current word count:".ljust(23), current_wc)
    print("Words left to write:".ljust(23), words_left)
    print("Days until deadline:".ljust(23), days_left)

    return (days_left, current_wc, words_left)
    


def display_project_info_detailed(project):
    days_left, current_wc, words_left = display_project_info_minimal(project)
    start_date = project['start_date']
    if days_left == 0:
        avg_words_until_deadline = words_left
    else: avg_words_until_deadline = int(words_left/days_left)

    start_date_dateobj = text_to_date(start_date)
    if date.today() == start_date_dateobj:
        avg_words_so_far = current_wc
    else: avg_words_so_far = int(current_wc/((date.today() - text_to_date(start_date)).days)) 

    print("Avg words/day from now:".ljust(23), avg_words_until_deadline)
    print("Avg words/day so far:".ljust(23), avg_words_so_far)
    print("")
    print("Deadline:".ljust(20), project['deadline'])
    print("Word count goal:".ljust(20), project['word_count_goal']) 
    print("Start date:".ljust(20), start_date)
    print("Last updated".ljust(20), project['last_updated'])
    print("")
    


#are these are a bit out of place in this file or am I overthinking it?
def days_diff(text_date1, text_date2):
    date1 = text_to_date(text_date1)
    date2 = text_to_date(text_date2)
    return date2-date1

def date_to_text(dt):
    return dt.strftime("%d-%m-%Y")

def text_to_date(text):
    return datetime.strptime(text, "%d-%m-%Y").date()

#def determine_avgwords_color(so_far, from_now):

