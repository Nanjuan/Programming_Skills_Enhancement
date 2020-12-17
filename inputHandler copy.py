#!/usr/bin/python3

# We need import appropiate library
import xlrd #version 1.20.0 
import sys
import datetime
import re

from excelRow import excelRow

#Variable Section 
loc = ('inputData.xlsx')

#First open the excel file 
#Second Read the content of the excel file one line at a time 

# this is the Function to validate the date will go here
#def validateDate():

def dateConvertion(excelDate):
    wb = xlrd.open_workbook(loc)
    sheet = wb.sheet_by_index(0)
    rows = sheet.nrows
    cols = sheet.ncols

    #convert the date to the correct format for xlrd
    date_mode = datetime.datetime(*xlrd.xldate_as_tuple(excelDate, wb.datemode))
    start_date_full = date_mode
    split_start_date_full = str(start_date_full)

    #split the date the date from time with 2 new variable incase we used date in the future
    split_start_date_full = split_start_date_full.split(" ")
    excelCorrectDate = split_start_date_full[0]
    time_split = split_start_date_full[1]
    return excelCorrectDate




def openExcel():

    wb = xlrd.open_workbook(loc)
    sheet = wb.sheet_by_index(0)
    rows = sheet.nrows
    cols = sheet.ncols
    
    #print(sheet.row_values(0))
    
    l = [] #Ths is the list where the values from each row get store

    for i in range(rows):
        excelNum = sheet.cell_value(i,0)
        excelDate = sheet.cell_value(i,1)
        excelTitle = sheet.cell_value(i,2)
        excelComment = sheet.cell_value(i,3)
        excelPriority = sheet.cell_value(i,4)
        excelStatus = sheet.cell_value(i,5)
        
        #convert the date to the correct format for xlrd
        #date_mode = datetime.datetime(*xlrd.xldate_as_tuple(excelDate, wb.datemode))
        #start_date_full = date_mode
        #split_start_date_full = str(start_date_full)

        #split the date the date from time with 2 new variable incase we used date in the future
        #split_start_date_full = split_start_date_full.split(" ")
        #excelCorrectDate = split_start_date_full[0]
        #time_split = split_start_date_full[1]

        #validate that the value is just date with re
        
        excelCorrectDate = dateConvertion(excelDate)

        #t = []
        #error = "error"
        #if bool(re.match("^20[0-9][0-9](.|-)([1-9] |1[0-2])(.|-|)([1-9] |1[0-9]| 2[0-9]|3[0-1])$",excelCorrectDate)) == True:
        #    excelObjRowValidated = excelRow(int(excelNum), excelCorrectDate, excelTitle, excelComment, excelPriority, excelStatus)
        #    t.append(excelObjRowValidated)
            
        #else:
        #    excelObjRowValidated = excelRow(int(excelNum), error, excelTitle, excelComment, excelPriority, excelStatus)
        #    t.append(excelObjRowValidated)

        #print(t)


        excelObjRow = excelRow(int(excelNum), excelCorrectDate, excelTitle, excelComment, excelPriority, excelStatus)
        l.append(excelObjRow)        

    print(l)
        #print(sheet.cell_value(i, 2))
        #print(sheet.row_values(i))
        #print(sheet.cell_value(0,0))
    


#New Function for validation of data 


def main():
    openExcel()
    #print("hello world!!")
    


if __name__ == '__main__':   
    main()