import db from '../config/connection.js';
import { Thought, User } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { getRandomName, getRandomReaction } from './data.js'; //not sure what random name should be changed to

try {
  await db();
  await cleanDB();

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    // Get some random reaction objects using a helper function that we imported from ./data
    const reactions = getRandomReactions(20);
//not sure what full name, first, last, and github should be changed to
    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;
//not sure what first, last, and github should be changed to
    users.push({
      first,
      last,
      github,
      reactions,
    });
  }

  // Add users to the collection and await the results
  const userData = await User.create(users);

  // Add thoughts to the collection and await the results
  await Thought.create({
    name: 'SpongeBob is the best cartoon ever',
    inPerson: false, //not sure what to change inPerson to
    users: [...userData.map(({ _id }: { [key: string]: any }) => _id)],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}

