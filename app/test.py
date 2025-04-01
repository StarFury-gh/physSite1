import sqlite3
import config
import utils
import json
def get_teachers():
    conn = sqlite3.connect(config.db_name)
    cursor = conn.cursor()
    teachers = cursor.execute("SELECT login FROM users").fetchall()
    # print(list(teachers))
    result = [el[0] for el in list(teachers)]
    # print(result)
    if(utils.isExists(result)):
        return {
            "status": True,
            "code": 200,
            "teachers": result
        }
    else:
        return {
            "status": False,
            "code": 400,
            "info": "no teachers yet."
        }

print(get_teachers())
