#!/usr/bin/python3
import sqlite3

conn = sqlite3.connect("dataStored.db")

# def ingestExcelTo(excelNum, excelSatizaDate, excelSatizeDueDate, excelSanitizeCharactersTitle, excelSanitizeCharactersComment, excelPriority, excelCompletionTF, excelStatus):
def ingestExcelTo(TaskList):
    # print(TaskList)
    for myList in TaskList:
        conn.executemany("""INSERT INTO
                TaskList (rowNum, dateTaskEnter, dueDate, title, comments, priority, completion, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            myList)

    conn.commit()