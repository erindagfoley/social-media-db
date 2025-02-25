import { Schema, Types, model, type Document } from 'mongoose';

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    name: string, 
    //not sure what we should replace score with, if anything
    score: number
}

interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[],
    friendCount?: string 
}

const reactionSchema = new Schema<IReaction>( //schema only
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        //not sure what to replace score with
        username: {
            type: String,
            required: true,
            maxlength: 50,
            minlength: 4,
            default: 'Unnamed user',
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
    username: {
        type: String,
        required: true,
        max_length: 50,
    },
    email: {
        type: String,
        required: true,
        max_length: 50,
    },
    thoughts: {
        type: String,
        required: true,
        max_length: 50,
    },
    friends: [thoughtSchema], //thought model will have a subdoc of reactions. user model will not
},
    {
        toJSON: {
            getters: true,
        },
        timestamps: true
    }
);

userSchema.virtual('friendCount').
  get(function () { return `$(this.length)`; }).
  set(function (v) { //v is a banana; however it makes sense because it stands for virtual
    const friendsLength = v.subdoc(0, v.indexOf(' ')); //substring makes it so that it makes the firstName and lastName are split up in the full name. In addition, indexOf will give the firstName and the lastName an index number. lastName is the index after firstName; hence the + 1 in line 30
    const lastName = v.substring(v.indexOf(' ') + 1);
    this.set({ friends: friendsLength })
  });

const User = model('User', userSchema);

export default User;
