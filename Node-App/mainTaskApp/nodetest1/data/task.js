class Task{
    constructor (taskNum, taskDate, taskDueDate, taskTitle, taskComment, taskPriority, taskCompletion, taskStatus){
        this.taskNum = taskNum;
        this.taskDate = taskDate;
        this.taskDueDate = taskDueDate;
        this.taskTitle = taskTitle;
        this.taskComment = taskComment;
        this.taskPriority = taskPriority;
        this.taskCompletion = taskCompletion;
        this.taskStatus = taskStatus;
    }
}
module.exports = Task
