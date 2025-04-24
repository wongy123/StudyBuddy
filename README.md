# StudyBuddy

## Study smarter, together!

Have you ever thought: Man, it sure would be nice if I could discuss that difficult topic from lecture 5 with someone! Well now you can use StudyBuddy to organise study sessions with like-minded peers!

This is an ongoing project developed by Angus Wong initially for IFN666 Web and Mobile Application Development at the Queensland University of Technology.

#### Updates

24/04: Added admin panel to view all registered users. Admin can already modify or delete any users.

19/04: The web application is fully developed and ready for deployment. Documentation will be updated soon. The application is being hosted on a test server on https://n11941073.ifn666.com/StudyBuddy (Not available 24/7 currently).

### 🔐 Role-Based Access Control (RBAC)

| Feature / Action             | User 👤 | Moderator 🛡️ | Admin 👑 |
| ---------------------------- | :-----: | :----------: | :------: |
| View study sessions          |   ✅    |      ✅      |    ✅    |
| Create study sessions        |   ✅    |      ✅      |    ✅    |
| Edit own study sessions      |   ✅    |      ✅      |    ✅    |
| Delete own study sessions    |   ✅    |      ✅      |    ✅    |
| Edit _any_ session           |   ❌    |      ✅      |    ✅    |
| Delete _any_ session         |   ❌    |      ✅      |    ✅    |
| Comment on sessions          |   ✅    |      ✅      |    ✅    |
| Edit/delete own comments     |   ✅    |      ✅      |    ✅    |
| Edit/delete _any_ comment    |   ❌    |      ✅      |    ✅    |
| Access AdminPage             |   ❌    |      ❌      |    ✅    |
| Edit or delete users         |   ❌    |      ❌      |    ✅    |
| View all users (Admin panel) |   ❌    |      ❌      |    ✅    |

✅ = Allowed  
❌ = Not allowed

### How to run API

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

`npm run createAdmin -- <userName> <email> <password>`

Create moderator user

`npm run createMod -- <userName> <email> <password>`

Run the server

`node server.js`

You can also test the API by importing the **StudyBuddy.postman_environment** file into Postman environment, then import **StudyBuddy API.postman_collection** into collections, and run the collection.

**If you want to run the HoppScotch API tests, make sure you create an admin account with the following command first**

**`npm run createAdmin -- adminUser adminuser@example.com password`**

### How to run Front-End

Go into the working directory

`cd StudyBuddy`

Install the dependencies

`cd client`

`npm install`

The front-end React app is configured to be deployed under the /StudyBuddy path in production.

In development mode, this restriction does not apply.

To test the web app in development mode, ensure you already have the API running on port `4000`, then start the front-end

`npm run dev`

This will launch the React app locally (usually at http://localhost:5173), and it will proxy API requests to your backend on port 4000.

If you wish to expose the React app to your local network, you can run

`npm run dev --host`

Other devices on your local network can now access the React app via http://`server's local ip`:5173
