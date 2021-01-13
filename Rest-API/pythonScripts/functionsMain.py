#!/usr/bin/python3
# import xlrd #version 1.20.0 
import sys
import datetime
import re
# from excelRow import excelRow


#Validation of title and comments            
def htmlEncode(strToEncode):
    
    lt = "&lt;" #<
    gt = "&gt;" #>
    amp = "&amp;" #&
    quot = "&quot;" #""
    singleQuot = "&#x27;" #'
    # validateExcelTitle = excelTitle
    # validateExcelComments = excelComment

    strEncoded = strToEncode.replace("&", amp).replace(">", gt).replace("<", lt).replace("\"", quot).replace("\'", singleQuot)

    # #Character to replace for title 
    # validateExcelTitle5 = validateExcelTitle.replace("&", amp).replace(">", gt).replace("<", lt).replace("\"", quot).replace("\'", singleQuot)

    # #Charecter to replace for comments
    # validateExcelComments5 = validateExcelComments.replace("&", amp).replace(">", gt).replace("<", lt).replace("\"", quot).replace("\'", singleQuot)

    return strEncoded

#Check for Completion Boolean
def validateCompletionBoolean(excelCompletion):
    complete = "complete"
    notComplete = "not complete"

    if excelCompletion == 1:
        return complete
    else:
        return notComplete

