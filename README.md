# PG6301_340
 Exam for Webutvikling and API-design

##Requirements Achieved
All requirements, R1 thorugh R5 and T1 through T6, have been met.

The final test coverage is 66.43%


##Topic
In this application I have chosen as my topic to make a simulator of card pack mechanics seen in the game Hearthstone,
and my data for the cards you can open are gathered from an [open endpoint serving all the collectible cards in the game](
https://hearthstonejson.com/). Because of the scope of the task and the limitations in the UI I designed, I've capped the
cards at 100. The application follows similar mechanics to what's seen in the actual game, but altered to fit the
specifications of the exam. In particular, when milling cards you get gold to buy packs rather than dust to buy new cards,
and you get more gold the higher rarity of the card. I give out 5 cards per pack, which is how they work in the game
as well.


##Extra functionality
Cards are all sorted by class.

Cards all have rarities that will impact the mill price, allowing the user to maximize cardcount or gold by milling high
value cards.

User can elect to purchase cards rather than packs, the cost per card equals twice the amount you get for milling them.

The game tracks count of your total cards, in case you want to try competing with your friends for the most amount of cards

##API
The API is divided into three repositories, user, collection and packs, all with a range of endpoints covering GET, PUT,
POST and DELETE. The API is logically divided, and follows best practice URI-naming schemes, I have also enforced lowercase
letterings for usernames so that their names can be used directly as ids in the URI. The RESTful api is based on best
practices and RFC standards, they are meaningful (though not all are rendered in the frontend) and should be self-evident
as to what handles what. 

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

##Frontend
The frontend is bui