# PG6301_340
 Exam for Webutvikling and API-design


##Topic
In this application I have chosen as my topic to make a simulator of card pack mechanics seen in the game Hearthstone,
and my data for the cards you can open are gathered from an [open endpoint serving all the collectible cards in the game](
https://hearthstonejson.com/). Because of the scope of the task and the limitations in the UI I designed, I've capped the
cards at 100. The application follows similar mechanics to what's seen in the actual game, but altered to fit the
specifications of the exam. In particular, when milling cards you get gold to buy packs rather than dust to buy new cards,
and you get more gold the higher rarity of the card. I give out 5 cards per pack, which is how they work in the game
as well.

##Authentication and Authorization
Authentication is done through passport which saves user's id in their session cookie, when I do authentication or
authorization checks, I check this session cookie. On open endpoints, in this exam's case the /api/cards endpoint,
we don't do any authentication or authorization. If the user is not explicitly targeting in the endpoint (which they may do
in a GET request, for instance), we only authenticate and use the id from the session cookie. If the user is making a 
request to a specific id, we do an authorization by checking that his session cookie matches the ID he requested.

In the exam task it was explicitly mentioned we should use 401 for authentication and 403 for authorization, so I have
followed this convention. It's my understanding of the recent [RFC standards](https://tools.ietf.org/html/rfc7235#section-4.1)
that this should be the other way around, as 401 is semantically called Unauthorized rather than Unauthenticated. When in
doubt I'll always follow the words in the exam, and have so named 401 status codes Unauthorized instead, 
but I wanted to clarify my thoughts on this in case it comes up.

##Requirements Achieved
R1 thorugh R5

T1 through T5

Test coverage 67.92%

##Extra functionality
Rarity on cards impact mill price

Cards are sorted by class

User can purchase cards individually for twice the price of milling