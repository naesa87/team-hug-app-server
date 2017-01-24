# Parse Server for Team Hug App

## Requirements

1. [React Native](http://facebook.github.io/react-native/docs/getting-started.html) (follow iOS and Android guides)
  - Xcode 7.3 +
2. [CocoaPods](http://cocoapods.org) (only for iOS)
  - Version 1.0+ recommended (`gem install cocoapods --pre`)
3. [MongoDB](https://www.mongodb.org/downloads) (needed to run Parse Server locally)

## Setup

1. **Clone the repo**

  ```
  $ git clone https://github.com/naesa87/team-hug-app-server.git
  $ cd team-hug-app-server
  ```

2. **Install dependencies** (npm v3+):

  ```
  $ npm install
  ```

3. **Make sure MongoDB is running:**

  ```
  $ lsof -iTCP:27017 -sTCP:LISTEN
  ```

  NOTE: if installed with [Homebrew](http://brew.sh/) run `brew info mongo` and
  check out the Caveats section.

  If you prefer to use an external MongoDB server, set `DATABASE_URI`:

  ```
  $ export DATABASE_URI=mongodb://example-mongo-hosting.com:1337/my-awesome-database
  ```

4. **Start Parse/GraphQL servers:**

  ```
  $ npm start
  ```

5. **Import sample data** (the local Parse Server should be running):

  ```
  $ npm run import-data
  ```

  Make sure everything works by visiting:

  * Parse Dashboard: [http://localhost:8080/dashboard](http://localhost:8080/dashboard)
  * Graph*i*QL: [http://localhost:8080/graphql](http://localhost:8080/graphql?query=query+%7B%0A++schedule+%7B%0A++++title%0A++++speakers+%7B%0A++++++name%0A++++++title%0A++++%7D%0A++++location+%7B%0A++++++name%0A++++%7D%0A++%7D%0A%7D)

  <img src=".github/screenshot-server@2x.png" width="800">


## Connecting to Remote Server from local command line

add necessary Config Values before "npm start" or "npm run import-data", for example:

  ```
  $ APP_ID=team-hug-app DASHBOARD_AUTH=dbusername:dbpassword DATABASE_URI=mongodb://dbusername:dbpassword@dserver.com:27439/dbname HOST=team-hug-server.herokuapp.com MASTER_KEY=masterKey PARSE_MOUNT=/parse PORT=1337 SERVER_URL=http://team-hug-server.herokuapp.com/parse npm run import-data
  ```
