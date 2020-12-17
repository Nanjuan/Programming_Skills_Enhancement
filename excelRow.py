class excelRow:
    def __init__(self, excelNum, excelDate, excelDueDate, excelTitle, excelComment, excelPriority, excelCompletion, excelStatus):
        self.excelNum = excelNum
        self.excelDate = excelDate
        self.excelDueDate = excelDueDate
        self.excelTitle = excelTitle
        self.excelComment = excelComment
        self.excelPriority = excelPriority
        self.excelCompletion = excelCompletion
        self.excelStatus = excelStatus
    
    def __repr__(self):
        return str(self.__dict__)