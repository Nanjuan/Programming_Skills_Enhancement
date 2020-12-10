#!/usr/bin/python3

# We need import appropiate library
import xlrd
import sys
#import datetime

#Variable Section 
loc = ("C:\Tools\Programming Skills Enhancement\inputData.xlsx")

#First open the excel file 
#Second Read the content of the excel file one line at a time 
def openExcel():


    wb = xlrd.open_workbook(loc)
    sheet = wb.sheet_by_index(0)
    l = []
    init = 

    for i in range(sheet.nrows):

        l.append(init + ())
        print(l)
        #print(sheet.cell_value(i, 0))
        #print(sheet.row_values(i))
        #print(sheet.cell_value(0,1))
    


#New Function for validation of data 


def main():
    openExcel()
    #print("hello world!!")
    


if __name__ == '__main__':
    
    main()