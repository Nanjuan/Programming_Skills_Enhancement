#!/usr/bin/python3
import sqlite3

conn = sqlite3.connect("dataStored.db")

def ingestExcelTo(TaskList):
    for myTask in TaskList:
        conn.execute("""INSERT INTO
                TaskList (rowNum, dateTaskEnter, dueDate, title, comments, priority, completion, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)""", (myTask.excelNum, myTask.excelDate, myTask.excelDueDate, myTask.excelTitle, myTask.excelComment, myTask.excelPriority, myTask.excelCompletion, myTask.excelStatus))

    conn.commit()