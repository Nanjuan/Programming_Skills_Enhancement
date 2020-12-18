#!/usr/bin/python3

# We need import appropiate library
import xlrd #version 1.20.0 
import sys
import datetime
import re

from excelRow import excelRow
from dateValidation import dateConvertion2, htmlEncode, validateCompletionBoolean
from ingestExcelToSQLlite import ingestExcelTo

#Variable Section 
loc = ('inputData.xlsx')

#this is the main section that start the program
def openExcel():

    wb = xlrd.open_workbook(loc)
    sheet = wb.sheet_by_index(0)
    rows = sheet.nrows
    cols = sheet.ncols
    
    l = [] #Ths is the list where the values from each row get store

    for i in range(rows):
        excelNum = sheet.cell_value(i,0)
        excelDate = sheet.cell_value(i,1)
        excelDueDate = sheet.cell_value(i,2)
        excelTitle = sheet.cell_value(i,3)
        excelComment = sheet.cell_value(i,4)
        excelPriority = sheet.cell_value(i,5)
        excelCompletion = sheet.cell_value(i,6)
        excelStatus = sheet.cell_value(i,7)
        
        #sanitize character for title and comments
        excelSanitizeCharactersTitle = htmlEncode(excelTitle)
        excelSanitizeCharactersComment = htmlEncode(excelComment)

        #Date Conversion and Validation 
        excelSatizeDueDate = dateConvertion2(excelDueDate)
        excelSatizaDate = dateConvertion2(excelDate)

        excelCompletionTF = validateCompletionBoolean(excelCompletion)
        # print(excelCompletionTF)

        excelObjRow = excelRow(int(excelNum), excelSatizaDate, excelSatizeDueDate, excelSanitizeCharactersTitle, excelSanitizeCharactersComment, excelPriority, excelCompletionTF, excelStatus)
        l.append(excelObjRow)
    
    #ingestExcelTo(l)
    print(l)

def main():
    openExcel()
    
if __name__ == '__main__':   
    main()