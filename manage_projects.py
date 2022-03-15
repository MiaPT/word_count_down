import keyboard
from project_info import *
from create_project import *


def manage_projects(connection, cursor, projects):
    project_ids = list(map((lambda x: x['ID']), projects))


    print("\nYour projects: ")
    for p in projects:
        display_project_info_minimal(p)

    print("To update a project/view more details about your progress, enter the ID of the project.")
    print("To return to the main menu, write 'menu'")
    answer = input()
    while not (answer.lower() == "menu" or (answer.isnumeric() and int(answer) in project_ids)):
        print("That is not a valid input, you fool!")
        answer = input()
    if answer == "menu":
        return 
    project = list(filter(lambda x: x['ID'] == int(answer), projects))[0]
    update_project(connection, cursor, project)
    return manage_projects(connection, cursor, projects)
    
    """if not (answer.isnumeric() and int(answer) in range(1,len(projects)+1)):
        print("That's not a valid input!!!>:(")
        return manage_projects(connection, cursor, projects)"""


def update_project(connection, cursor, project):
    #TODO: entering nothing when updating the project should be possible, and should cause no changes. This is a temporary solution.
    display_project_info_detailed(project)
    print(type(project))

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
        print("The currently registered wordcount is", project['current_word_count'], "\nWhat is the new word count?")
        new_wc = enter_wordcount()
        #TODO: update wc in db

    elif answer == "2":
        print("The word count goal for this project is", project['word_count_goal'], "\nWhat is the new word count goal?")
        new_wc = enter_wordcount()
        #TODO: update wc goal in db

    elif answer == "3":
        print("The current deadline is", project['deadline'], "\nWhat is the new deadline?")
        date = enter_date()
        start_date = project['start_date']
        while date < text_to_date(start_date):
            print("The deadline can't be before the start date ("+start_date+")")
            date = enter_date()
        #TODO: update deadline in db

        
    elif answer == "4":
        print("The current title is", project['name'], "\nWhat is the new title?")
        new_title = name_project()
        #TODO: update title
    
    elif answer == "5":
        print("""Are you sure you want to archive this project? (y/n)\n(It will no longer show up in the normal list of projects, 
                but you'll be able to access the archive and change the project status)""")
        inp = input()
        while inp.lower() != "y" and inp.lower() != "n":
            inp = input()
        #TODO: update project status


    if answer == "menu":
        return 

