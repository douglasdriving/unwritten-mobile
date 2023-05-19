// FAKE BACKEND, TO KEEP PROTOTYPE ALIVE WHILE SERVER IS DOWN

//placeholder vars
const user = {
  id: 500,
  displayName: 'CoolWriter32',
  keys: 5,
}
const userStats = {
  camps: 6,
  finished: 2,
  contributions: 12,
  user_exist: 1
}
const activeCamps = [
  {
    id: 93,
    title: 'Chessmate',
    description: null,
    creator_name: 'Lgooper',
    node_count: '3',
    contributor_count: '3',
    created_at: '2023-04-19T14:23:54.516Z'
  },
  {
    id: 59,
    title: 'Urban Flamingo Hunt',
    description: 'At the age of 53, Greg moves to Bangkok in search of "flamingos"',
    creator_name: 'Doggen',
    node_count: '21',
    contributor_count: '8',
    created_at: '2023-01-06T02:11:01.280Z'
  },
  {
    id: 60,
    title: 'The curse of the carrot cake',
    description: 'A strange woman one day arrives and opens up a pastry shop in the quiet town of Wimborne, changing the life for its citizens forever.',
    creator_name: 'Doggen',
    node_count: '20',
    contributor_count: '10',
    created_at: '2023-01-08T04:12:03.451Z'
  },
  {
    id: 61,
    title: 'Come fly with me',
    description: 'A man wakes up in an unmanned airballoon, somewhere out in the countryside. How he ended up there is a mystery.',
    creator_name: 'Goostav',
    node_count: '12',
    contributor_count: '8',
    created_at: '2023-01-08T17:54:23.234Z'
  },
  {
    id: 78,
    title: 'Dark clouds on the horizon',
    description: 'A man with deep secrets with may destroy the perfect lives of the inhabitants in the town of happiness ',
    creator_name: 'Fredrik',
    node_count: '15',
    contributor_count: '7',
    created_at: '2023-03-06T02:41:38.807Z'
  },
  {
    id: 91,
    title: 'The alien brain',
    description: null,
    creator_name: 'Bill G',
    node_count: '5',
    contributor_count: '4',
    created_at: '2023-03-16T14:46:50.031Z'
  },
  {
    id: 92,
    title: 'The place to be',
    description: null,
    creator_name: 'Doko J',
    node_count: '8',
    contributor_count: '4',
    created_at: '2023-03-25T22:44:03.209Z'
  }
]
const playerCamps = [
  {
    id: 93,
    title: 'Chessmate',
    description: null,
    creator_name: 'Lgooper',
    node_count: '3',
    contributor_count: '3',
    created_at: '2023-04-19T14:23:54.516Z'
  },
  {
    id: 59,
    title: 'Urban Flamingo Hunt',
    description: 'At the age of 53, Greg moves to Bangkok in search of "flamingos"',
    creator_name: 'Doggen',
    node_count: '21',
    contributor_count: '8',
    created_at: '2023-01-06T02:11:01.280Z'
  },
  {
    id: 60,
    title: 'The curse of the carrot cake',
    description: 'A strange woman one day arrives and opens up a pastry shop in the quiet town of Wimborne, changing the life for its citizens forever.',
    creator_name: 'Doggen',
    node_count: '20',
    contributor_count: '10',
    created_at: '2023-01-08T04:12:03.451Z'
  },
  {
    id: 61,
    title: 'Come fly with me',
    description: 'A man wakes up in an unmanned airballoon, somewhere out in the countryside. How he ended up there is a mystery.',
    creator_name: 'Goostav',
    node_count: '12',
    contributor_count: '8',
    created_at: '2023-01-08T17:54:23.234Z'
  },
  {
    id: 78,
    title: 'Dark clouds on the horizon',
    description: 'A man with deep secrets with may destroy the perfect lives of the inhabitants in the town of happiness ',
    creator_name: 'Fredrik',
    node_count: '15',
    contributor_count: '7',
    created_at: '2023-03-06T02:41:38.807Z'
  },
  {
    id: 91,
    title: 'The alien brain',
    description: null,
    creator_name: 'Bill G',
    node_count: '5',
    contributor_count: '4',
    created_at: '2023-03-16T14:46:50.031Z'
  }
]
const exampleCampData = {
  id: 91,
  title: 'The alien brain',
  description: null,
  creator_id: 97,
  finished: false,
  created_at: '2023-03-16T14:46:50.031Z',
  players: [
    { id: 95, name: 'Smogg' },
    { id: 97, name: 'Bill G' },
    { id: 100, name: 'Gusten' },
    { id: 108, name: 'Zoltan' }
  ],
  scenarios: [
    {
      node_id: 333,
      scenario: 'In an unremarkable town, with an unremarkable name. Our protagonist walk the streets, up and down at a slow pace. They lost their job at the library after being caught sleeping in a pile of books for the fourth time. The money they had left would last for a couple of months.',
      creator_id: 97,
      prompt: null,
      likes: []
    },
    {
      node_id: 335,
      scenario: `In front of them, an old lady was blocking the path, moving very slowly. Our protagonist becomes annoyed and yells 
      at the lady to move.It startles her, and her sudden movement makes something drop out of her pocket.It's a walnut.`,
      creator_id: 100,
      prompt: 'A small object falls from someones pocket',
      likes: []
    },
    {
      node_id: 338,
      scenario: `Before the lady was able to react, our protagonist bent down and took a bite out of the walnut. Scraping their teeth on the pavement while doing so. The lady pulled a pistol out of her other pocket, and 
      pointed it at them.She pushed the trigger,
            but nothing happened...She screamed in angst and scurried away like a crab.`,
      creator_id: 97,
      prompt: 'A piece of technology malfunctions',
      likes: []
    },
    {
      node_id: 380,
      scenario: `They just stood there for a minute, 
      wondering what could've scared the old lady away. Then all of a sudden they were hit with a wave of a very strange smell. 
      Upon turning around they quickly realized the smell was coming from an enormous creature that could only be described as a giant squirrel.
      At that moment the creature opened it's mouth, like it was about to say something.`,
      creator_id: 108,
      prompt: 'An overpowering scent fills the air',
      likes: []
    },
    {
      node_id: 382,
      scenario: `As our confused protagonist stood there, awaiting a vicious growl or perhaps a magical piece of advice from the monster squirrel, they suddenly spotted some odd sticking out from the squirrels throat. They looked closely at it, trying to see what 
      it was.At first, they were unsure of what they saw, but then it suddenly occurred to them: sticking out of the squirrels throat was the strange lady who had just threatened them with a pistol.`,
      creator_id: 95,
      prompt: 'A character catches a glimpse of something unusual',
      likes: []
    }
  ],
  lastNode: {
    node_id: 382,
    creator_id: 95,
    created_at: '2023-03-28T22:32:54.671Z',
    finished_at: '2023-03 -28T22:36:35.050Z',
    creator_name: 'Smogg',
    prompt: 'A character catches a glimpse of something unusual'
  }
}
const feed = [
  {
    story_title: 'Come fly with me',
    room_id: 61,
    creator_id: 101,
    creator_name: 'Doko J',
    scenario_id: 392,
    scenario: `When he looks up from the poster he can see a face approaching. It is dizzy, the lines are blurred, and double. His head is aching. But slowly her face comes together before his eyes. It is indeed Amanda. 
Her eyes are so blue. Her skin is smooth and tanned. But she looks worried. "Are you awake Daniel?", she asks. He blinks, doesn't get it. "My name is Paul" he says. She looks puzzled. "Last night it was Daniel", she says. He shrugs. His brain is so slow, struggling to bring pieces of his memory together. What happened? Where is the balloon? He looks 
up as a flock of birds suddenly appears.`,
    finished_at: '2023-05-01T23:36:07.123Z'
  },
  {
    story_title: 'The place to be',
    room_id: 92,
    creator_id: 101,
    creator_name: 'Doko J',
    scenario_id: 391,
    scenario: `It was total madness! Somehow, from below the sand a space ship had materialized. It had emerged at just about the same place as the cage with the beef and the parrot statue had been. He didn't know much about space ships, but this one reminded him 
of the ship from Star Trek, only smaller and somehow friendlier. Strange, but "friendly" was the first word that popped up when he tried to describe it to himself - friendly, rather small and painted in a welcoming green color. He stroke its surface, and felt a warm vibration in his hand. He started smiling as the rain started falling.`,
    finished_at: '2023-05-01T21:36:36.012Z'
  },
  {
    story_title: 'Chessmate',
    room_id: 93,
    creator_id: 95,
    creator_name: 'Smogg',
    scenario_id: 390,
    scenario: `The goblin sits in silence. Ears vibrating. Angry fumes from its nostrils. A moment passes. The crowd around the table is awaiting a reaction. Then, then goblin 
    makes a leap. Up onto the chessboard. It shrinks. Until it is the size of a chesspiece. 
    The size of a horse.`,
    finished_at: '2023-04-19T16:21:56.340Z'
  },
  {
    story_title: 'Chessmate',
    room_id: 93,
    creator_id: 112,
    creator_name: 'Lgooper',
    scenario_id: 389,
    scenario: `Check aaaand mate! I smugly look across the board to my opponent, a very 
    angry little goblin who doesn't even really 
    know how he got here...`,
    finished_at: '2023-04-19T14:23:54.516Z'
  },
  {
    story_title: 'Come fly with me',
    room_id: 61,
    creator_id: 112,
    creator_name: 'Lgooper',
    scenario_id: 388,
    scenario: `A mini woman strut from the tiny door, she walked with intention, it is a little intimidating as she grew with every 
    step. The sky turned to smog, smoke chasing 
    Amanda, "AMANDA!" Calling out as you recognise her once again. Your lungs are filled with a violent cough and you go to grab the odd box and obstruct the door with your thumb. 
    It glows green, how captivating, S E v E n t h I r t y...? SMACK, "DANIEL, Get uuuuuup" 
    I know no Daniel. The sun intrudes your sight and collect your barrings, you are wrapped in a poster like a blanket sleeping on mouldy carpet...  What is Amanda doing here?`,
    finished_at: '2023-04-19T14:20:06.437Z'
  },
  {
    story_title: 'The place to be',
    room_id: 92,
    creator_id: 112,
    creator_name: 'Lgooper',
    scenario_id: 387,
    scenario: `With a sharp sting the air changes with a frigid snap! The sun is now an 
    endless moon, and the night seems never ending... The blisters leave you vulnerable to the change in the weather, you try to sleep off these delusions but you can't help but cry agony in your rest... That's when the horrible beeping began, louder and louder! Where is it coming from? Is it getting closer? A 
    tremble from the ground you loose your footing and the horizon is sinking... No! You're 
    rising! The island is flying?! You jump back into the bunker in fear of falling off the 
    spacecraft, where ever it may take us...`,
    finished_at: '2023-04-19T08:48:07.342Z'
  },
  {
    story_title: 'The place to be',
    room_id: 92,
    creator_id: 101,
    creator_name: 'Doko J',
    scenario_id: 385,
    scenario: `Carefully he bent forward to 
    take a closer look. But as he did so, his nostrils started to shiver, tears streamed from his eyes and he couldn't stop himself. Like a mad animal he tore at the piece of meat 
    with his bare teeth. It was juicy, well spiced, and unbelievably tempting. He finished it off before he could really appreciate it. 
    As he licked the last remains from his fingers he started to shiver. Such behaviour suggested he could not control himself any longer. He sat down with a sigh. His eyes fell upon the statue. It was a marble parrot. As it opened its beak the sun started to flicker`,
    finished_at: '2023-04-04T00:01:06.299Z'
  },
  {
    story_title: 'The place to be',
    room_id: 92,
    creator_id: 108,
    creator_name: 'Zoltan',
    scenario_id: 384,
    scenario: `That cannot be! Quickly looked around but saw nothing but the vastness of the blue ocean. He was convinced he was going crazy. He started walking around in total despair, when he suddenly heard a squeaking sound under his feet. He throw himself to the ground and started sweeping the sand away. His hands quickly uncoverd a wooden structure about an inch below the surface. It was 
    a hatch. He pulled it open and an otherworldly blue light hit his eyes that was coming from a small statue standing on a little table and right next to it was a beautiful, freshly cooked stemaing piece of meat.`,
    finished_at: '2023-04-01T22:46:28.339Z'
  },
  {
    story_title: 'The place to be',
    room_id: 92,
    creator_id: 101,
    creator_name: 'Doko J',
    scenario_id: 383,
    scenario: `No tree, no delicious fruit, 
    no filfilling of an old dream. Instead he was wide awake, sitting in the shade of one of the few palm trees that formed the backdrop of the beach on this tiny island. When he was able to swim ashore two days ago, after a week of desperately clinging to the remains of his sailing boat, he had felt lucky. But little by little his heart had sunk. Would 
    he be able to stay alive all by himself, with nothing to eat but fruit, until someone one day might find him? He stood up. His skin 
    was red and covered in blisters. As he started walking he felt a strong smell of beef.`,
    finished_at: '2023-03-29T01:26:02.815Z'
  },
  {
    story_title: 'The alien brain',
    room_id: 91,
    creator_id: 95,
    creator_name: 'Smogg',
    scenario_id: 382,
    scenario: `As our confused protagonist stood there, awaiting a vicious growl or perhaps a magical piece of advice from the monster squirrel, they suddenly spotted some odd 
    sticking out from the squirrels throat. They looked closely at it, trying to see what it was. At first, they were unsure of what they saw, but then it suddenly occurred to them: sticking out of the squirrels throat was the strange lady who had just threatened them with a pistol.`,
    finished_at: '2023-03-28T22:36:35.050Z'
  },
  {
    story_title: 'The place to be',
    room_id: 92,
    creator_id: 108,
    creator_name: 'Zoltan',
    scenario_id: 381,
    scenario: `He was so excited, his heart 
    was racing and his hands were shaking. That 
    beautiful fruit was everything he'd wanted. 
    He was just about to touch it when in a split second the fruit just vanished into thin air along with the branch, the tree and the hill itself, leaving him with a mouth as dry 
    as the sand between his fingers. He was dreaming again. And he was still on that godforsaken island.`,
    finished_at: '2023-03-28T22:34:54.578Z'
  },
  {
    story_title: 'The alien brain',
    room_id: 91,
    creator_id: 108,
    creator_name: 'Zoltan',
    scenario_id: 380,
    scenario: `They just stood there for a minute,  wondering what could've scared the old lady away. Then all of a sudden they were hit with a wave of a very strange smell. Upon turning around they quickly realized the 
    smell was coming from an enormous creature that could only be described as a giant squirrel. At that moment the creature opened it's mouth, like it was about to say something.`,
    finished_at: '2023-03-28T19:22:40.958Z'
  },
  {
    story_title: 'The place to be',
    room_id: 92,
    creator_id: 109,
    creator_name: 'eggtwerp',
    scenario_id: 379,
    scenario: `The lone tree stood atop the 
    hill, and the man stared up at the large fruit that hung from one of its branches. He was covered in a thin layer of uneasy sweat, it was so close he could almost touch it. He 
    looked around, almost unbelieving, then slowly, carefully reached out. `,
    finished_at: '2023-03-28T04:46:49.265Z'
  },
  {
    story_title: 'Dark clouds on the horizon',
    room_id: 78,
    creator_id: 101,
    creator_name: 'Doko J',
    scenario_id: 378,
    scenario: `Our hero starts to move his feet, in the direction of where he suspects his beloved lady to be. But then he stops to 
    reflect a bit on his situation. How can he really be sure of the feelings of the mayors 
    daughter? Why would she fall in love with such a miserable jerk as himself? A beautiful 
    girl like her typically never sets eyes on a man with a protruding bent nose. And anyone with eyes in his head can see that his is as bent as a banana, and of enormous propotions. Which in a way perfectly accompanies the rest of his ugly face. Bad complexion. Foul breath. He sits down. What is he doing?`,
    finished_at: '2023-03-26T22:13:05.856Z'
  },
  {
    story_title: 'The place to be',
    room_id: 92,
    creator_id: 101,
    creator_name: 'Doko J',
    scenario_id: 377,
    scenario: `He could not believe his eyes. From as early as he could remember, he had always dreamed of actually seeing it from the inside. But never hade he thought that one day his own eyes would be able to see it, 
    and even reach out to touch it. It was still like a dream, only this time also reality.`,
    finished_at: '2023-03-25T22:44:03.209Z'
  },
  {
    story_title: 'The curse of the carrot cake',
    room_id: 60,
    creator_id: 101,
    creator_name: 'Doko J',
    scenario_id: 376,
    scenario: `Amanda entered the Plaza in a state of bewilderment. There was a bit to much happening this morning. A man who must have come directly from a fancy dress was sitting on the ground, with a black cat in his 
    lap and a carrot sticking out of his roman helmet. She shook her head trying to get back on track. And then she heard a grunt. As she spun around, afraid of being attacked by one of the gangs, she could see a person with a body and clothes matching Ricks, and a paper bag over the head. As she approached him the sky opened up again and it started pouring down.`,
    finished_at: '2023-03-25T19:31:16.638Z'
  },
  {
    story_title: 'Come fly with me',
    room_id: 61,
    creator_id: 101,
    creator_name: 'Doko J',
    scenario_id: 375,
    scenario: `As he lowered his eyes, he could see a grey metallic object under the box in which he was standing. It was oblong, like a cigar, at least twice as big as the box and oscillated slightly. It seemed to have 
    stuck itself to the bottom of the box.The humming seemed to come from the object. He was still certain he had never before heard the tune, but still it reminded him of something. His eyes searched the metallic object. Its surface was smooth, with a few rusty scratches, but he couldn't make out any pattern. 
    Suddenly the humming stopped and a door opened at the end of the metallic cigar. `,
    finished_at: '2023-03-24T19:40:38.729Z'
  },
  {
    story_title: 'Dark clouds on the horizon',
    room_id: 78,
    creator_id: 95,
    creator_name: 'Smogg',
    scenario_id: 342,
    scenario: `"What is this place?" - the man mumbles to himself as he lets his eyes wander through the darkness. The place is strangely empty, at least from what his eyes can spot. But he figures that the only way is forward. The veiled figure must have escaped 
    through some opening on the other side of the door. The man looks down over his wet body and on his feet. "You are everything I have right now," he says to the feet. "I just gotta keep moving forward."`,
    finished_at: '2023-03-24T04:38:54.927Z '
  },
  {
    story_title: 'Dark clouds on the horizon',
    room_id: 78,
    creator_id: 100,
    creator_name: 'Gusten',
    scenario_id: 341,
    scenario: `As he looks around the room he realizes that it is very big, and so dimly lit that he can barely make out the sides of the pyramid walls, which make the room seem almost endless. On the far end of the room he spots a siluette of a person, standing completely still. He stares at the person, trying to make out his loved ones face in the 
    shadows, when the door behind him suddenly creaks and is shut. He looks back in horror, 
    realising he is stuck. When he turns towards the room again, the veiled character is gone.`,
    finished_at: '2023-03-24T02:35:50.041Z'
  },
  {
    story_title: 'Dark clouds on the horizon',
    room_id: 78,
    creator_id: 95,
    creator_name: 'Smogg',
    scenario_id: 340,
    scenario: `Tumbling through the dark corridor as the whole pyramid shakes, the man hopes that the inside will be safer than the 
    outside. As he runs further, he thinks he can hear the girl calling for him somewhere deep inside the cavities, but he is unsure. After running through the darkness for a few seconds, he suddenly turns completely wet, going through a waterfall that was covering the path. With his clothes completely wet, he 
    finds himself in a room inside of the pyramid.`,
    finished_at: '2023-03-17T03:47:36.175Z'
  },
  {
    story_title: 'Dark clouds on the horizon',
    room_id: 78,
    creator_id: 97,
    creator_name: 'Bill G',
    scenario_id: 339,
    scenario: `Suddenly, the ground around started to tremble. Hi almost list his footing as the ground was rapidly shaking with increased intensity. His shaking eyeballs made 
    it hard to see and he stumbled forwards with his arms stretched out infront of him. The 
    panic was delayed but soon had a solid grip 
    of his spine. With shaking teeth and sharp pain in all of his joints, he dove head first through the hatch on the pyramid. Following his beloved.`,
    finished_at: '2023-03-17T01:12:54.411Z'
  },
  {
    story_title: 'The alien brain',
    room_id: 91,
    creator_id: 97,
    creator_name: 'Bill G',
    scenario_id: 338,
    scenario: `Before the lady was able to react, our protagonist bent down and took a bite out of the walnut. Scraping their teeth 
    on the pavement while doing so. The lady pulled a pistol out of her other pocket, and pointed it at them. She pushed the trigger, but nothing happened... She screamed in angst 
    and scurried away like a crab.`,
    finished_at: '2023-03-17T01:02:05.554Z'
  },
  {
    story_title: 'Dark clouds on the horizon',
    room_id: 78,
    creator_id: 95,
    creator_name: 'Smogg',
    scenario_id: 337,
    scenario: `The man hesitated for a while, standing there and staring into the darkness. But the girl didn't seem to be surprised by the event at all, and curiously ventured into the pyramid saying to the man: "Come, 
let's check it out." The man saw her disappearing into the pyramid opening and getting swallowed by it. `,
    finished_at: '2023-03-17T01:00:39.340Z'
  },
  {
    story_title: 'The curse of the carrot cake',
    room_id: 60,
    creator_id: 100,
    creator_name: 'Gusten',
    scenario_id: 336,
    scenario: `"Huh, didn't know I could do 
that", said the gladiator. He had been visiting the local market outside of Colloseum, shopping food for his master when he had come across a delightful fruit he had never seen before. It was yellow and bent, like a boomerang. He bought one from the clerk, which instructed him to peel it before consumtion. 
As he sunk his teeth in the phallic phruit, 
the world started spinning, lifting him away from the world he knew.`,
    finished_at: '2023-03-17T00:59:33.198Z'
  },
  {
    story_title: 'The alien brain',
    room_id: 91,
    creator_id: 100,
    creator_name: 'Gusten',
    scenario_id: 335,
    scenario: `In front of them, an old lady was blocking the path, moving very slowly. 
    Our protagonist becomes annoyed and yells at the lady to move. It startles her, and her 
    sudden movement makes something drop out of 
    her pocket. It's a walnut.`,
    finished_at: '2023-03-17T00:45:50.467Z'
  }
];
const news = {
  message: `The Unwritten experiment is now over. Thanks to everyone who participated!
  The servers are down and what you see here is just a static version of the app.
  You can interact with the app as if it was live, but nothing will be saved.`,
  author: 'Douglas (Unwritten Creator)',
  created_at: '2023-05-19T19:55:51.026Z'
}

//Headers
let authToken;
export const setAuthToken = (newToken) => {
  authToken = newToken;
}
export const hasToken = () => {
  return (authToken && authToken != '');
}
export const backendCallToken = () => {
  return authToken;
}

const AuthHeader = () => {
  return new Headers({
    'Authorization': authToken
  })
}
const GetFetch = () => {
  if (!authToken) {
    console.error('no auth token to fetch with');
  }
  return { headers: AuthHeader(authToken) };
}
const PostFetch = () => {
  return {
    method: "POST",
    headers: AuthHeader(authToken)
  };
}

//USER
export const Login = async () => {
  return user;
}
export const GetUser = async () => {

  return {
    id: user.id,
    name: user.displayName,
    room_keys: user.keys,
  };

}
export const GetLoggedUserName = async () => {
  return user.displayName;
}
export const GetStoryKeys = async () => {
  return user.keys;
}
export const signIn = async (email, password) => {

  return { ok: true, message: 'signed in successfully', token: 'jfoidjsf8audf9ashdf89shdf' };

}
export const signUp = async (email, password, name, pushToken) => {

  return { ok: true, message: 'signed up successfully', token: 'jfoidjsf8audf9ashdf89shdf' };

}
export const GetPlayerStats = async (id) => {
  return userStats;
}
export const SetDisplayName = async (newName) => {

  const response = {
    ok: true,
    message: 'succesfully updated name!',
    data: {
      name: newName
    }
  }
  return response;

}
export const SetExpoToken = async (expoToken) => {

  const response = {
    ok: true,
    message: 'succesfully updated expo token for notifications!',
    data: {
      expoToken: expoToken
    }
  };
  return response;

}

//ROOMS
export const GetAvailableRoomsAsSingleList = async () => {
  return activeCamps;

}
export const GetMyRoomsAsSingleList = async () => {
  return playerCamps;
}
export const GetFinishedStories = async () => {

  return [];

}
export const CreateRoom = async (title, opening) => {

  return {
    ok: true,
    message: 'New camp created successfully!',
    campId: 94
  };

}
export const GetCampData = async (campId) => {
  return exampleCampData;
}

//Nodes
export const Like = async (nodeId) => {

  return {
    ok: true,
    message: 'liked node successfully'
  };

}
export const Dislike = async (nodeId) => {

  return {
    ok: true,
    message: 'removed like successfully'
  };

}
export const UploadScenario = async (text, campId, end) => {

  return { ok: true, message: 'new scenario added!' };

}
export const AddNode = async (campId) => {

  return {
    ok: true,
    message: 'Node added! Created a prompt',
    data: { prompt: 'Write something crazy!' }
  };

}
export const GetFeed = async () => {

  return feed;

}

//INFO
export const GetNews = async () => {
  return news;
}

