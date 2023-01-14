DROP TABLE IF EXISTS messages_by_user;
CREATE TABLE messages_by_user ("id" SERIAL PRIMARY KEY, "user_id" numeric NOT NULL, "creation_date" timestamp NOT NULL, "content" text NOT NULL, "votes" numeric NOT NULL);

DROP TABLE IF EXISTS users;
CREATE TABLE users("id" SERIAL PRIMARY KEY, "uuid" varchar NOT NULL);

DROP TABLE IF EXISTS replies;
CREATE TABLE replies("id" SERIAL PRIMARY KEY, "post_id" numeric NOT NULL, "reply" varchar NOT NULL);

INSERT INTO users (uuid) VALUES ('2cfa1e93-87e3-4f74-a8eb-b6e21431f8c7');

INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'Ullman stood five-five, and when he moved, it was with the prissy speed that seems to be the exclusive domain of all small plump men. The part in his hair was exact, and his dark suit was sober but comforting. I am a man you can bring your problems to, that suit said to the paying customer.', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'To the hired help it spoke more curtly: This had better be good, you. There was a red carnation in the lapel, perhaps so that no one on the street would mistake Stuart Ullman for the local undertaker.', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'As he listened to Ullman speak, Jack admitted to himself that he probably could not have liked any man on that side of the desk—under the circumstances.', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'Ullman had asked a question he hadn’t caught. That was bad; Ullman was the type of man who would file such lapses away in a mental Rolodex for later consideration.', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'Jack smiled, a big wide PR smile. “We like to think so, I suppose. He’s quite self-reliant for a five-year-old.”', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'No returning smile from Ullman. He slipped Jack’s application back into a file. The file went into a drawer. ', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'The desk top was now completely bare except for a blotter, a telephone, a Tensor lamp, and an in/out basket. Both sides of the in/out were empty, too.', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'Ullman stood up and went to the file cabinet in the corner. “Step around the desk, if you will, Mr. Torrance. We’ll look at the hotel floor plans.”', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'He brought back five large sheets and set them down on the glossy walnut plane of the desk. Jack stood by his shoulder, very much aware of the scent of Ullman’s cologne. ', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'All my men wear English Leather or they wear nothing at all came into his mind for no reason at all, and he had to clamp his tongue between his teeth to keep in a bray of laughter. ', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'Beyond the wall, faintly, came the sounds of the Overlook Hotel’s kitchen, gearing down from lunch.', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, '“Top floor,” Ullman said briskly. “The attic. Absolutely nothing up there now but bric-a-brac.', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'The Overlook has changed hands several times since World War II and it seems that each successive manager has put everything they don’t want up in the attic. ', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'I want rattraps and poison bait sowed around in it. Some of the third-floor chambermaids say they have heard rustling noises. I don’t believe it, not for a moment, but there mustn’t even be that one-in-a-hundred chance that a single rat inhabits the Overlook Hotel.”', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'Jack, who suspected that every hotel in the world had a rat or two, held his tongue.', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, '“Of course you wouldn’t allow your son up in the attic under any circumstances.”', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, '“No,” Jack said, and flashed the big PR smile again. Humiliating situation. ', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'Did this officious little prick actually think he would allow his son to goof around in a rattrap attic full of junk furniture and God knew what else?', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'Ullman whisked away the attic floor plan and put it on the bottom of the pile.', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, '“The Overlook has one hundred and ten guest quarters,” he said in a scholarly voice.', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, '“Thirty of them, all suites, are here on the third floor. Ten in the west wing (including the Presidential Suite), ten in the center, ten more in the east wing. All of them command magnificent views.”', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'Could you at least spare the salestalk?', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'But he kept quiet. He needed the job.', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'Ullman put the third floor on the bottom of the pile and they studied the second floor. “Forty rooms,” Ullman said, “thirty doubles and ten singles. ', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'And on the first floor, twenty of each. Plus three linen closets on each floor, and a storeroom which is at the extreme east end of the hotel on the second floor and the extreme west end on the first. Questions?”', 0);
INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES (1, CURRENT_TIMESTAMP, 'Jack shook his head. Ullman whisked the second and first floors away.', 0);
