#!/usr/bin/python3
import xlrd #version 1.20.0 
import sys
import datetime
import re
from excelRow import excelRow

loc = ('inputData.xlsx')
wb = xlrd.open_workbook(loc)
sheet = wb.sheet_by_index(0)
rows = sheet.nrows
cols = sheet.ncols

#This section perform the date Conversion. 
def dateConvertion2(a):
    wb = xlrd.open_workbook(loc)
    sheet = wb.sheet_by_index(0)

    #convert the date to the correct format for xlrd
    try:
        date_mode = datetime.datetime(*xlrd.xldate_as_tuple(a, wb.datemode))
        start_date_full = date_mode
        split_start_date_full = str(start_date_full)
        split_start_date_full = split_start_date_full.split(" ")
        excelCorrectDate2 = split_start_date_full[0]
        time_split = split_start_date_full[1]
        #Validate Date format
        dateExcelForVali = excelCorrectDate2
        if bool(re.match("^20[0-9][0-9](.|-)([1-9] |1[0-2])(.|-|)([1-9] |1[0-9]| 2[0-9]|3[0-1])$",excelCorrectDate2)) is not None:
            return dateExcelForVali      
        else:
            return #this return nothing if is not valid 
    except:
        #Print invalid value for date
        error = "Field have invalid value"
        if wb is not None:
            return error

#Validation of title and comments            
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

#Check for Completion Boolean
def validateCompletionBoolean(excelCompletion):
    complete = "complete"
    notComplete = "not complete"

    if excelCompletion == 1:
        return complete
    else:
        return notComplete

