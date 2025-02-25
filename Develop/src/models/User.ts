import { Schema, Types, model, type Document } from 'mongoose';

interface IAssignment extends Document {
    reactionId: Schema.Types.ObjectId,
    name: string, 
    //not sure what we should replace score with, if anything
    score: number
}

interface IUser extends Document {
    first: string,
    last: string,
    github: string,
    assignments: Schema.Types.ObjectId[]
}

const reactionSchema = new Schema<IReaction>( //schema only
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        //not sure what to replace name and score with
        name: {
            type: String,
            required: true,
            maxlength: 50,
            minlength: 4,
            default: 'Unnamed assignment',
        },
        score: {
            type: Number,
            required: true,
            default: () => Math.floor(Math.random() * (100 - 70 + 1) + 70),
        },
    },
    {
        timestamps: true,
        _id: false
    }
);

const userSchema = new Schema<IUser>({
    //not sure what to replace first with
    first: {
        type: String,
        required: true,
        max_length: 50,
    },
    //not sure what to replace last with
    last: {
        type: String,
        required: true,
        max_length: 50,
    },
    //not sure what to replace github with
    github: {
        type: String,
        required: true,
        max_length: 50,
    },
    assignments: [thoughtSchema], //thought model will have a subdoc of reactions. user model will not
},
    {
        toJSON: {
            getters: true,
        },
        timestamps: true
    }
);

const User = model('User', userSchema);

export default User;
