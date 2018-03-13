## **The Problem**

The problem is to create a service that gives out the latest or historical foreign exchange price based on inputs provided by the end-user.  A pub/sub or worker mode setup is also preferred to make the service more scalable.

## **The Solution**

The solution is to use the free data provided by [openexchange.org](https://openexchangerates.org/ "openexchange.org") and create a SPA that let's the user input their options then call the API hosted by the express nodejs server which takes in the options as parameters and then pass it to the openexchange API to extract the relevant data.

I am also using Redis pub/sub setup to make the backend service more scalable.

## **The Stack**

This is a full-stack application which uses the following:
* Frontend: React.JS, Redux, [Semantic UI React](https://react.semantic-ui.com/ "Semantic UI React")
* Backend: NodeJS, ExpressJS, Redis (Pub/Sub), Axios

## **Technical Choice**

The reason I choose React with Redux as my frontend for this problem is because it is more flexible to add more functionality based on the current need vs some framework such as Angular 5.

As for the horizontal scaling, please see the following chart:

![Alt](/pubsub.png "Redis Pub/Sub")

## **Comments (Trade-offs, Left-out etc)**

Trade-off:  Focusing more on Backend (especially on horizontal scaling) than on Front-end as I was not familiar with horizontal scaling and how to implement.

Left-out: 
*   For the front-end, I left out the following:
    1. Past Record implementation - The idea was that I should be storing the last 5 request on the LocalStorage such that each time you refresh the page you can see what you have previously searched for.
    2. Formatting of the tables - table are constanting changing size based on user input.
    3. Checking of input: There are some checks (for example historical date validity, format) that might cause an issue when requesting.
    4. React testing using Jest-Enzyme
*   For the back-end, I left out the following:
    1. Cluster Module: using `cluster.fork()` on each GET request to improve performance.
    2. Testing: In general

Things I would do differently:  Probably do more testing (unit or integration) before moving on to another parts of the application.

## **How to use**

* Clone the project onto your drive
* Install [Redis Server](https://github.com/NodeRedis/node_redis "Redis Server"), NodeJS & npm
* Do `npm install` inside './' and './frontend'
* Get your API key from [openexchange.org](https://openexchangerates.org/ "openexchange.org")
* Add your API key opening a .env file in the same location as server.js and then put in `APP_ID="YOUR API ID HERE"`
* Start Redis-server(Ubuntu) by typing `redis-server --daemonize yes`
* Start the worker (at least one or as many as your want) by type `node worker.js` using a different terminal or using PM2
* type `npm run build` in './frontend' to build the folder and `node server.js` to start the backend server.
* The site should be then be available on `http://localhost:8080`

## **Demo**
Hosted on AWS EC2: [http://52.74.237.18/](http://52.74.237.18/ "Exchange App on AWS")

## **Link to other code**

Deals Hub
demo: [https://dealshub.space/](https://dealshub.space/ "Deals Hub Demo") 
code: [Deals Hub Github](https://github.com/Midori-Funaki/OnlineMarketplace/ "Deals Hub Github") 

## **Link to public profile**

Linkedin: [My Linkedin Profile](https://www.linkedin.com/in/adrian-lee-244248147/ "My Linkedin Profile") 

