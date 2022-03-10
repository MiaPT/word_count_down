import keyboard
from project_info import *


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
    return manage_projects(connection, cursor, project)
    
    """if not (answer.isnumeric() and int(answer) in range(1,len(projects)+1)):
        print("That's not a valid input!!!>:(")
        return manage_projects(connection, cursor, projects)"""


def update_project(connection, cursor, project):
    display_project_info_detailed(project)

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
    if answer == "menu":
        return 

