import keyboard
from datetime import datetime, date
import shared
import project_info


def name_project(allow_blank=False): 
    print("Give a title to your project:")
    name = input()
    name = ' '.join(name.split())
    if name == "":
        if allow_blank:
            return 
        print("You can't skip this step! Just write something weird, you can change it later.")
        name = name_project(allow_blank)
    return name


def enter_wordcount(allow_blank=False):
    wordcount = input()
    if not wordcount.isnumeric():
        if not wordcount and allow_blank:
            return
        print("The word count has to be a whole number, you dummy!")
        wordcount = enter_wordcount(allow_blank)
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

def set_deadline(allow_blank=False, allow_past=False):
    deadline = enter_date(allow_blank)
    if not deadline: 
        return
    if deadline < date.today():
        if not allow_past:
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
    print("\nTo update a project/view more details about your progress, enter the ID of the project.")
    print("To return to the main menu, write 'menu'")
    print("To view the archive, type 'archive'")
    answer = input()
    while not (answer.lower() in ["menu", "archive"] or (answer.isnumeric() and int(answer) in project_ids)):
        print("That is not a valid input, you fool!")
        answer = input()
    if answer == "menu":
        return 
    elif answer == "archive":
        manage_archive(connection, cursor)

    else:
        project = list(filter(lambda x: x['ID'] == int(answer), shared.projects))[0]
        update_project(connection, cursor, project)
    return manage_projects(connection, cursor)


def manage_archive(connection, cursor):
    archived_projects = project_info.get_projects(cursor, status="archived")
    if not archived_projects:
        print("\nYou don't have any archived projects.\nPress enter to return.")
        inp = input()
        return 

    print("Your archived projects:")
    for project in archived_projects:
        project_info.display_project_info_minimal(project)
    print("\nIf you want to unarchive any of these projects, type the ID of the project")
    print("To return to the previous menu, type 'menu'")

    project_ids = list(map((lambda x: x['ID']), archived_projects))
    answer = input()
    while not (answer.lower() == "menu"  or (answer.isnumeric() and int(answer) in project_ids)):
        print("That is not a valid input, you fool!")
        answer = input()
    if answer == "menu":
        return
    else:
        new_values =  ("ongoing", answer)
        cursor.executemany("UPDATE projects SET status = ? WHERE ID = ?", (new_values,))
        connection.commit()
        shared.projects = project_info.get_projects(cursor)
        return manage_archive(connection, cursor)




def update_project(connection, cursor, project):
    project_info.display_project_info_detailed(project)

    print("Do you want to update or edit this project?\nEnter the corresponding number, or write 'menu' to go back\n")
    print(" 1  Update current word count")
    print(" 2  Update word count goal")
    print(" 3  Change project deadline")
    print(" 4  Change project title")
    print(" 5  Archive or delete project")
    
    answer = input()
    while not (answer.lower() == "menu" or (answer.isnumeric() and int(answer) in range(1,6))):
        print("That is not a valid input, you fool!")
        answer = input()

    if answer == "1":
        current_wc =  project['current_word_count']
        print("The currently registered wordcount is", current_wc, "\nWhat is the new word count?")

        new_wc = enter_wordcount(allow_blank=True)
        if not new_wc:
            print("No changes made")
            return update_project(connection, cursor, project)
        
        words_today = int(new_wc) - current_wc
        last_updated = project_info.date_to_text(date.today())
        new_values =  (new_wc, words_today, last_updated, project['ID'])

        cursor.executemany("UPDATE projects SET current_word_count = ?, words_today = ?, last_updated = ? WHERE ID = ?", (new_values,))
        connection.commit()

        

    elif answer == "2":
        print("The word count goal for this project is", project['word_count_goal'], "\nWhat is the new word count goal?")
        new_wc = enter_wordcount(allow_blank=True)
        if not new_wc:
            print("No changes made")
            return update_project(connection, cursor, project)

        new_values =  (new_wc, project['ID'])
        cursor.executemany("UPDATE projects SET word_count_goal = ? WHERE ID = ?", (new_values,))
        connection.commit()


    #TODO: find a better structure for this
    elif answer == "3":
        print("The current deadline is", project['deadline'], "\nWhat is the new deadline?")
        new_date = set_deadline(allow_blank=True, allow_past=True)
        if not new_date:
            print("No changes made")
            return update_project(connection, cursor, project)
        start_date = project['start_date']
        while new_date < project_info.text_to_date(start_date):
            print("The deadline can't be before the start date ("+start_date+")")
            new_date = set_deadline(allow_blank=True, allow_past=True) 
            if not new_date:
                print("No changes made")
                return update_project(connection, cursor, project)
        
        new_values =  (project_info.date_to_text(new_date), project['ID'])
        cursor.executemany("UPDATE projects SET deadline = ? WHERE ID = ?", (new_values,))
        connection.commit()
  


        
    elif answer == "4":
        print("The current title is", project['title'], "\nWhat is the new title?")
        new_title = name_project(allow_blank=True)
        if not new_title:
            print("No changes made")
            return update_project(connection, cursor, project)
        
        new_values =  (new_title, project['ID'])
        print(type(new_values))
        cursor.executemany("UPDATE projects SET title = ? WHERE ID = ?", (new_values,))
        connection.commit()
        
    
    elif answer == "5":
        print("""To archive this project, type 'archive' (this can be undone later).
        \nTo permanently delete this project, type 'delete'.
        \nTo go back without making changes, type anything else or leave input field blank""")

        inp = input()
        if inp.lower() not in ['archive', 'delete']:
            return update_project(connection, cursor, project)
        
        elif inp.lower() == 'archive':
            new_values =  ("archived", project['ID'])
            cursor.executemany("UPDATE projects SET status = ? WHERE ID = ?", (new_values,))
            connection.commit()
            shared.projects = project_info.get_projects(cursor)
            return 
        
        elif inp.lower() == 'delete':
            delete_project(connection, cursor, project['ID'])
            shared.projects = project_info.get_projects(cursor)
            return 


    if answer == "menu":
        return 
    
    shared.projects = project_info.get_projects(cursor)
    project = list(filter(lambda x: x['ID'] == project['ID'], shared.projects))[0]
    return update_project(connection, cursor, project)


def delete_project(connection, cursor, project_id):
    print(type(project_id))
    values = (project_id,)
    cursor.executemany("DELETE FROM projects WHERE ID = ?", (values,))
    connection.commit()


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





