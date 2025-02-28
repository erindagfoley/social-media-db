import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js'; //user and thought for challenge

/**
 * GET All Courses /courses
 * @returns an array of Courses
*/
export const getAllThoughts = async(_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find(); //user.find or thought.find for controllers
        res.json(thoughts);
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET Thought based on id /thought/:id
 * @param string id
 * @returns a single Thought object
*/
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findById(thoughtId);
      if(thought) {
        res.json(thought);
      } else {
        res.status(404).json({
          message: 'Thought not found'
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  /**
 * POST Thought /thoughts
 * @param object username
 * @returns a single Thought object
*/
export const createThought = async (req: Request, res: Response) => {
    const { thought } = req.body;
    try {
      const newThought = await Thought.create({
        thought
      });
      res.status(201).json(newThought);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

/**
 * PUT Thought based on id /thoughts/:id
 * @param object id, username
 * @returns a single Thought object
*/
export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

  /**
 * DELETE Thought based on id /thoughts/:id
 * @param string id
 * @returns string 
*/
export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});
      
      if(!thought) {
        res.status(404).json({
          message: 'No thought with that ID'
        });
      } else {
        await User.deleteMany({ _id: { $in: thought.users } });
        res.json({ message: 'Thoughts and users deleted!' });
      }
      
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };
