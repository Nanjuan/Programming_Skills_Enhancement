#!/usr/bin/python3

# We need import appropiate library
import xlrd #version 1.20.0 
import sys
import datetime
import re

from excelRow import excelRow

#Variable Section 
loc = ('inputData.xlsx')

#This section perform the date Conversion. 
def dateConvertion(excelDate):
    wb = xlrd.open_workbook(loc)
    sheet = wb.sheet_by_index(0)

    #convert the date to the correct format for xlrd
    try:
        date_mode = datetime.datetime(*xlrd.xldate_as_tuple(excelDate, wb.datemode))
        start_date_full = date_mode
        split_start_date_full = str(start_date_full)
    except:
        pass

    #split the date the date from time with 2 new variable incase we used date in the future
    try:
        split_start_date_full = split_start_date_full.split(" ")
        excelCorrectDate = split_start_date_full[0]
        time_split = split_start_date_full[1]
        return excelCorrectDate
    except:
        pass

#This section does the date Validation
def validateDate(excelCorrectDate):
    try:
        dateExcelForVali = excelCorrectDate
        if bool(re.match("^20[0-9][0-9](.|-)([1-9] |1[0-2])(.|-|)([1-9] |1[0-9]| 2[0-9]|3[0-1])$",dateExcelForVali)) is not None:
            return dateExcelForVali      
        else:
            return #this return nothing if is not valid 
    except:
        pass
#This section does the Title and Comments Validation
def validateTitleComments(excelTitle, excelComment):
    
    lt = "&lt;" #<
    gt = "&gt;" #>
    amp = "&amp;" #&
    quot = "&quot;" #""
    singleQuot = "&#x27;" #'
    validateExcelTitle = excelTitle
    validateExcelComments = excelComment

    #Character to replace for title 
    validateExcelTitle5 = validateExcelTitle.replace("&", amp).replace(">", gt).replace("<", lt).replace("\"", quot).replace("\'", singleQuot)

    #Charecter to replace for comments
    validateExcelComments5 = validateExcelComments.replace("&", amp).replace(">", gt).replace("<", lt).replace("\"", quot).replace("\'", singleQuot)

    return validateExcelTitle5, validateExcelComments5

#This section check if the date is None to return a error message
def verifyDateNone(excelValidateDate):
    error = "Field have invalid value"
    if excelValidateDate is not None:
        return excelValidateDate
    else:
        return error

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
        
        #date convertion and validation
        excelCorrectDate = dateConvertion(excelDate)
        excelValidateDate = validateDate(excelCorrectDate)
        excelValidateDateError = verifyDateNone(excelValidateDate)

        #sanitize character
        excelSanitizeCharacters = validateTitleComments(excelTitle, excelComment)
        excelSanitizeCharactersTitle = excelSanitizeCharacters[0]
        excelSanitizeCharactersComment = excelSanitizeCharacters[1]

        excelObjRow = excelRow(int(excelNum), excelValidateDateError, excelDueDate, excelSanitizeCharactersTitle, excelSanitizeCharactersComment, excelPriority, excelCompletion, excelStatus)
        l.append(excelObjRow) 
    print(l)

def main():
    openExcel()
    #print("hello world!!")
    
if __name__ == '__main__':   
    main()