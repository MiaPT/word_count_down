import keyboard
from datetime import datetime, date
import shared
import project_info



def name_project(allow_blank=False): 
    print("Give a name to your project:")
    name = input()
    name = ' '.join(name.split())
    if name == "":
        if allow_blank:
            return 
        print("You can't skip this step! Just write something weird, you can change it later.")
        name = name_project()
    return name


def enter_wordcount(allow_blank=False):
    wordcount = input()
    if not wordcount.isnumeric():
        if not wordcount and allow_blank:
            return
        print("The word count has to be a whole number, you dummy!")
        wordcount = enter_wordcount()
    return wordcount



def enter_date(allow_blank):
    inp = input()
    if inp == "":
        if allow_blank:
            return
        return date.today()
    try:
        dt = project_info.text_to_date(inp)
    except:
        print("Wrong format or invalid date, try again:")
        dt = enter_date(allow_blank)
    return dt    

def set_deadline(allow_blank=False):
    deadline = enter_date(allow_blank)
    if not deadline: 
        return
    if deadline < date.today():
        print("You can't set the deadline in the past, silly!\n")
        deadline = set_deadline()
    return deadline


def set_startdate(allow_blank=False):
    return enter_date(allow_blank)



def manage_projects(connection, cursor):
    project_ids = list(map((lambda x: x['ID']), shared.projects))


    print("\nYour projects: ")
    for p in shared.projects:
        project_info.display_project_info_minimal(p)

    print("To update a project/view more details about your progress, enter the ID of the project.")
    print("To return to the main menu, write 'menu'")
    answer = input()
    while not (answer.lower() == "menu" or (answer.isnumeric() and int(answer) in project_ids)):
        print("That is not a valid input, you fool!")
        answer = input()
    if answer == "menu":
        return 
    project = list(filter(lambda x: x['ID'] == int(answer), shared.projects))[0]
    update_project(connection, cursor, project)
    return manage_projects(connection, cursor)
    


def update_project(connection, cursor, project):
    project_info.display_project_info_detailed(project)

    print("Do you want to update or edit this project?\nEnter the corresponding number, or write 'menu' to go back\n")
    print(" 1  Update current word count")
    print(" 2  Update word count goal")
    print(" 3  Change project deadline")
    print(" 4  Change project title")
    print(" 5  Archive project")
    
    answer = input()
    while not (answer.lower() == "menu" or (answer.isnumeric() and int(answer) in range(1,6))):
        print("That is not a valid input, you fool!")
        answer = input()

    if answer == "1":
        current_wc =  project['current_word_count']
        print("The currently registered wordcount is", current_wc, "\nWhat is the new word count?")

        new_wc = enter_wordcount(allow_blank=True)
        if not new_wc:
            new_wc = current_wc

        words_today = int(new_wc) - current_wc
        last_updated = project_info.date_to_text(date.today())
        new_values =  (new_wc, words_today, last_updated, project['ID'])

        cursor.executemany("UPDATE projects SET current_word_count = ?, words_today = ?, last_updated = ? WHERE ID = ?", (new_values,))
        connection.commit()
        shared.projects = project_info.get_projects(cursor, "ongoing")
        

    elif answer == "2":
        print("The word count goal for this project is", project['word_count_goal'], "\nWhat is the new word count goal?")
        new_wc = enter_wordcount(allow_blank=True)
        #TODO: update wc goal in db

    elif answer == "3":
        print("The current deadline is", project['deadline'], "\nWhat is the new deadline?")
        new_date = set_deadline(allow_blank=True)
        if not new_date:
            print("No changes made")
            return
        start_date = project['start_date']
        while new_date < text_to_date(start_date):
            print("The deadline can't be before the start date ("+start_date+")")
            new_date = set_deadline(allow_blank=True)
        #TODO: update deadline in db

        
    elif answer == "4":
        print("The current title is", project['name'], "\nWhat is the new title?")
        new_title = name_project(allow_blank=True)
        if new_title:
            pass
            #TODO: update title
        return
    
    elif answer == "5":
        print("""Are you sure you want to archive this project? (y/n)\n(It will no longer show up in the normal list of projects, 
                but you'll be able to access the archive and change the project status)""")
        inp = input()
        while inp.lower() != "y" and inp.lower() != "n":
            inp = input()
        #TODO: update project status


    if answer == "menu":
        return 




def create_project(connection, cursor):
    name = name_project()

    print("What is the word count goal for this project?")
    wordcount = enter_wordcount()

    print("What is the current word count for the project?")
    current_wordcount = enter_wordcount()

    print("What is the deadline for this project? (DD-MM-YYYY)\n(if you don't enter a date, today will be the deadline, and that will be quite stressful!)")
    deadline = set_deadline()
    print("Enter the start date for this project (DD-MM-YYYY) (leave it blank to put today as the start date)")
    start_date = set_startdate()

    while start_date > deadline:
        print("You can't set the start date after the deadline!!")
        start_date = set_startdate()
    if start_date == date.today():
        words_today = current_wordcount
    else: words_today = 0
    today = project_info.date_to_text(date.today())
    project_values = (name, wordcount, current_wordcount, words_today, project_info.date_to_text(deadline), project_info.date_to_text(start_date), today, "ongoing")

    cursor.executemany("INSERT INTO projects VALUES (null,?,?,?,?,?,?,?,?)", (project_values,))
    connection.commit()

    print("Your project has been successfully added! You can now view it and register your progress.\n")





