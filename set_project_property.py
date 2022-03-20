from datetime import datetime, date
from project_info import text_to_date

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
        dt = text_to_date(inp)
    except:
        print("Wrong format or invalid date, try again:")
        dt = enter_date(allow_blank)
    return dt    

def deadline(allow_blank=False):
    deadline = enter_date(allow_blank)
    if not deadline: 
        return
    if deadline < date.today():
        print("You can't set the deadline in the past, silly!\n")
        deadline = set_deadline()
    return deadline


def startdate(allow_blank=False):
    return enter_date(allow_blank)


