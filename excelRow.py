class excelRow:
    def __init__(self, excelNum, excelDate, excelTitle, excelComment, excelPriority, excelStatus):
        self.excelNum = excelNum
        self.excelDate = excelDate
        self.excelTitle = excelTitle
        self.excelComment = excelComment
        self.excelPriority = excelPriority
        self.excelStatus = excelStatus
    
    def __repr__(self):
        return str(self.__dict__)