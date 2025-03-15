import os

def isExists(data) -> bool:
    if list(data)==[]:
        return False
    return True

def get_new_task_id() -> int:
    new_task_id = 1

    folder_path = '../tasks'

    files_and_folders = os.listdir(folder_path)

    only_files = [f for f in files_and_folders if os.path.isfile(os.path.join(folder_path, f))]

    print("Список файлов:")
    for file_name in only_files:
        new_task_id += 1
    return new_task_id

# print(get_new_task_id())