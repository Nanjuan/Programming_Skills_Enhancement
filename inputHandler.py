#!/usr/bin/python3

# We need import appropiate library
import xlrd
import sys
#import datetime

from excelRow import excelRow

#Variable Section 
loc = ("C:\Tools\Programming Skills Enhancement\inputData.xlsx")

#First open the excel file 
#Second Read the content of the excel file one line at a time 
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
        #excelCorrectDate = somethignfixday(excelDate)

        excelObjRow = excelRow(excelNum, excelDate, excelTitle, excelComment, excelPriority, excelStatus)
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