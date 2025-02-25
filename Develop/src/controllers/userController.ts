import { Request, Response } from 'express';
// import { ObjectId } from 'mongodb';
import { User, Thoughts } from '../models/index.js';

// Aggregate function to get number of students overall

// export const headCount = async () => {
//     const numberOfStudents = await Student.aggregate()
//         .count('studentCount');
//     return numberOfStudents;
// }

// // Aggregate function for getting the overall grade using $avg
// export const grade = async (studentId: string) =>
//     Student.aggregate([
//         // only include the given student by using $match
//         { $match: { _id: new ObjectId(studentId) } },
//         {
//             $unwind: '$assignments',
//         },
//         {
//             $group: {
//                 _id: new ObjectId(studentId),
//                 overallGrade: { $avg: '$assignments.score' },
//             },
//         },
//     ]);

/**
 * GET All Users /users
 * @returns an array of Users
*/
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();

        const userObj = {
            users,
            headCount: await headCount(),
        }

        res.json(userObj);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET User based on id /users/:id
 * @param string id
 * @returns a single User object
*/
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json({
                user,
                //not sure what I should change grades to, or if I get rid of it
                grade: await grade(userId)
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * POST User /users
 * @param object user
 * @returns a single User object
*/

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
/**
 * DELETE User based on id /users/:id
 * @param string id
 * @returns string 
*/

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }

        const thought = await Thought.findOneAndUpdate(
            { users: req.params.userId },
            { $pull: { users: req.params.userId } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({
                message: 'User deleted, but no thoughts found',
            });
        }

        return res.json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

/**
 * POST Reaction based on /users/:userId/reactions
 * @param string id
 * @param object reactions
 * @returns object user 
*/
//the code below is commented out as it doesn't pertain to users
// export const addAssignment = async (req: Request, res: Response) => {
//     console.log('You are adding an assignment');
//     console.log(req.body);
//     try {
//         const student = await Student.findOneAndUpdate(
//             { _id: req.params.studentId },
//             { $addToSet: { assignments: req.body } },
//             { runValidators: true, new: true }
//         );

//         if (!student) {
//             return res
//                 .status(404)
//                 .json({ message: 'No student found with that ID :(' });
//         }

//         return res.json(student);
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// }

// /**
//  * DELETE Assignment based on /students/:studentId/assignments
//  * @param string assignmentId
//  * @param string studentId
//  * @returns object student 
// */

// export const removeAssignment = async (req: Request, res: Response) => {
//     try {
//         const student = await Student.findOneAndUpdate(
//             { _id: req.params.studentId },
//             { $pull: { assignments: { assignmentId: req.params.assignmentId } } },
//             { runValidators: true, new: true }
//         );

//         if (!student) {
//             return res
//                 .status(404)
//                 .json({ message: 'No student found with that ID :(' });
//         }

//         return res.json(student);
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// }
