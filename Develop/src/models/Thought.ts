import { Schema, model, type Document } from 'mongoose';

interface IThought extends Document {
    //not sure what to change these properties to
    name: string,
    inPerson: boolean,
    start: Date,
    end: Date,
    thoughts: Schema.Types.ObjectId[]
}

const thoughtSchema = new Schema<IThought>(
    {
        //not sure what to change these properties to
        name: {
            type: String,
            required: true,
        },
        inPerson: {
            type: Boolean,
            default: true,
        },
        start: {
            type: Date,
            default: Date.now(),
        },
        end: {
            type: Date,
            // Sets a default value of 12 weeks from now
            default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
