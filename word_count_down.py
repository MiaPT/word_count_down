import shared
import colorama
import project_info
from manage_projects import manage_projects, create_project

def main():
    init_projects_table()
    colorama.init()
    start()



def start():
    shared.projects = project_info.get_projects()
    project_info.reset_words_written_today()
    print("\n~~~~~ Welcome to WordCount(Down) ~~~~~\n")

    if shared.projects:
        print("These are your ongoing projects: \n")
        project_info.display_project_titles()
        print("\nType 'view' to view and update existing projects")

    print("Type 'add' to add a new writing project\nType 'quit' to exit the program")

    answer = input()
    if answer == "view":
        if not shared.projects: 
            print("\nSneaky. You have to add a project before you can view it.\n")
            return start()
        manage_projects()
    elif answer == "add":
        create_project()
    elif answer.lower() == "quit":
        shared.connection.close()
        quit()
    return start()


def init_projects_table(): 
    shared.cursor.execute("""
    CREATE TABLE IF NOT EXISTS projects (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT, 
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
