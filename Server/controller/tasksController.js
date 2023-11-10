import ErrorHandler from "../middleware/error.js";
import { Task } from "../models/taskModel.js";

export const AddTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const task = await Task.create({ title, description, user: req.user });
        res.status(201).json({
            message: `${req.user.name} your task is created successfully`,
        })
    }
    catch (error) {
        next(error);
    }
}

export const GetTasks = async (req, res, next) => {
    try {
        const user = req.user._id;
        const myTasks = await Task.find({ user });

        if (!myTasks) {
            return next(new ErrorHandler("Task not found", 404))
        }

        res.status(200).json({
            myTasks
        })

    } catch (err) {
        next(err);
    }
}

export const UpdateTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            next(new ErrorHandler("Task not found"), 404);
        }

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            message: "updated"
        })

    } catch (error) {
        next(error);
    }
}

export const DeleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const taskdlt = await Task.deleteOne({ _id: id });

        if (!taskdlt) {
            next(new ErrorHandler("Task not Found to delete", 404))
        }

        res.status(200).json({
            message: "Task Deleted"
        })

    }
    catch (err) {
        next(err);
    }
}