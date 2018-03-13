**The Problem**

The problem is to create a service that gives out the latest or historical foreign exchange price based on inputs provided by the end-user.  A pub/sub or worker mode setup is also preferred to make the service more scalable.

**The Solution**

The solution is use the free data provided by [openexchange.org](https://openexchangerates.org/ "openexchange.org") and create a SPA that let's the user input their options then call the API hosted by the express nodejs server which takes in the options as parameters and then pass it to the openexchange API to extract the relevant data.

I am also using Redis pub/sub setup to make the backend service more scalable.

**The Stack**

This is a full-stack application which uses the following:
* Frontend: React.JS, Redux, [Semantic UI React](https://react.semantic-ui.com/ "Semantic UI React"), [React Date Picker](https://github.com/wojtekmaj/react-date-picker "React Date Picker")
* Backend: NodeJS, ExpressJS, Redis (Pub/Sub), Axios
