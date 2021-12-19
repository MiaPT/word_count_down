from datetime import datetime, date
from project_info import *

def create_project(connection, cursor):
    name = name_project()
    print("What is the word count goal for this project?")
    wordcount = enter_wordcount()
    print("What is the current word count for the project?")
    current_wordcount = enter_wordcount()
    deadline = set_deadline()
    start_date = set_startdate()
    while start_date > deadline:
        print("You can't set the start date after the deadline!!")
        start_date = set_startdate()
    if start_date == date.today():
        words_today = current_wordcount
    else: words_today = 0
    today = date_to_text(date.today())
    project_values = (name, wordcount, current_wordcount, words_today, date_to_text(deadline), date_to_text(start_date), today, "ongoing")

    cursor.executemany("INSERT INTO projects VALUES (null,?,?,?,?,?,?,?,?)", (project_values,))
    connection.commit()

    print("Your project has been successfully added! You can now view it and register your progress.\n")



def name_project():
    print("Give a name to your project:")
    name = input()
    name = ' '.join(name.split())
    if name == "":
        print("You can't skip this step! Just write something weird, you can change it later.")
        name = name_project()
    return name

def enter_wordcount():
    wordcount = input()
    if not wordcount.isnumeric():
        print("The word count has to be a whole number, you dummy!")
        wordcount = enter_wordcount()
    return wordcount

def set_deadline():
    print("What is the deadline for this project? (DD-MM-YYYY)\n(if you don't enter a date, today will be the deadline, and that will be quite stressful!)")
    deadline = enter_date()
    if deadline < date.today():
        print("You can't set the deadline in the past, silly!\n")
        deadline = set_deadline()
    return deadline

def set_startdate():
    print("Enter the start date for this project (DD-MM-YYYY) (leave it blank to put today as the start date)")
    return enter_date()

def enter_date():
    inp = input()
    if inp == "":
        return date.today()
    try:
        dt = text_to_date(inp)
    except:
        print("Wrong format or invalid date, try again:")
        dt = enter_date()
    return dt


def date_to_text(dt):
    return dt.strftime("%d-%m-%Y")

def text_to_date(text):
    return datetime.strptime(text, "%d-%m-%Y").date()

