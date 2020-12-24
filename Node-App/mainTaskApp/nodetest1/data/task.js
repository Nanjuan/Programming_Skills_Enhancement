class Task{
    constructor(taskNum, taskDate, taskDueDate, taskTitle, taskComment, taskPriority, taskCompletion, taskStatus) {
        this.taskNum = taskNum;
        this.taskDate = taskDate;
        this.taskDueDate = taskDueDate;
        this.taskTitle = taskTitle;
        this.taskComment = taskComment;
        this.taskPriority = taskPriority;
        this.taskCompletion = taskCompletion;
        this.taskStatus = taskStatus;
    }
// install the settter and getter on Visio code to get this working. 
// google visibility modifier in node js 
    getTaskDate() {
        return this.taskDate;
    }

    setTaskDate (taskDate) {
        this.taskDate = taskDate;
    }

// 	public = getTaskNum() {
//     return this.taskNum;
// }

// 	public void setTaskNum(= taskNum) {
//     this.taskNum = taskNum;
// }

// public = getTaskDate() {
//     return this.taskDate;
// }

// 	public void setTaskDate(= taskDate) {
//     this.taskDate = taskDate;
// }

// public = getTaskDueDate() {
//     return this.taskDueDate;
// }

// 	public void setTaskDueDate(= taskDueDate) {
//     this.taskDueDate = taskDueDate;
// }

// public = getTaskTitle() {
//     return this.taskTitle;
// }

// 	public void setTaskTitle(= taskTitle) {
//     this.taskTitle = taskTitle;
// }

// public = getTaskComment() {
//     return this.taskComment;
// }

// 	public void setTaskComment(= taskComment) {
//     this.taskComment = taskComment;
// }

// public = getTaskPriority() {
//     return this.taskPriority;
// }

// 	public void setTaskPriority(= taskPriority) {
//     this.taskPriority = taskPriority;
// }

// public = getTaskCompletion() {
//     return this.taskCompletion;
// }

// 	public void setTaskCompletion(= taskCompletion) {
//     this.taskCompletion = taskCompletion;
// }

// public = getTaskStatus() {
//     return this.taskStatus;
// }

// 	public void setTaskStatus(= taskStatus) {
//     this.taskStatus = taskStatus;
// }

// 	public Object get}() {
//     return this.};
// 	}

// 	public void set}(Object }) {
//     this.} = };
// 	}

}
module.exports = Task
