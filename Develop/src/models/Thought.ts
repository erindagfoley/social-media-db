import { Schema, model, type Document } from 'mongoose';

interface IThought extends Document {
    //not sure what to change these properties to
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions: Schema.Types.ObjectId[]
}

const thoughtSchema = new Schema<IThought>(
    {
        //not sure what to change these properties to
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: {
            type: Schema.Types.ObjectId[],
            // Sets a default value of 12 weeks from now
            default: () => new Reaction(0),
        },
        reaction: [
            {
                type: Schema.Types.ObjectId,
                ref: 'reaction',
            },
        ],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        timestamps: true
    },
);

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
