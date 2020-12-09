#!/usr/bin/python3

# We need import appropiate library
import xlrd
import sys

#Variable Section 
loc = ("C:\Tools\Programming Skills Enhancement\inputData.xlsx")

#First open the excel file 
#Second Read the content of the excel file one line at a time 
def openExcel():
    wb = xlrd.open_workbook(loc)
    print(wb)
    sheet = wb.sheet_by_index(0)
    print(sheet)
    print(sheet.nrows)
#New Function for validation of data 


def main():
    openExcel()
    print("hello world!!")
    


if __name__ == '__main__':
    
    main()