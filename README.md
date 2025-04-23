# StudyBuddy
## Study smarter, together!


Have you ever thought: Man, it sure would be nice if I could discuss that difficult topic from lecture 5 with someone! Well now you can use StudyBuddy to organise study sessions with like-minded peers!


This is an ongoing project developed by Angus Wong initially for IFN666 Web and Mobile Application Development at the Queensland University of Technology.

####Updates
19/04: The web application is fully developed and ready for deployment. Documentation will be updated soon. The application is being hosted on a test server on n11941073.ifn666.com/StudyBuddy (Not available 24/7 currently).


###  How to run

To test this web app on your local device, simply download the source code
`git clone https://github.com/wongy123/StudyBuddy.git`


Ensure you have Node.js installed.
[Node.js](https://nodejs.org/en)


Go into the working directory

`cd StudyBuddy`


Install the dependencies

`cd server`

`npm install`


Create admin user

`npm run createAdmin`

Run the server

`node server.js`


You can also test the API by importing the **StudyBuddy.postman_environment** file into Postman environment, then import **StudyBuddy API.postman_collection** into collections, and run the collection.
