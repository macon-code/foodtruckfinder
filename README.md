# foodtruckfinder
an application to help find food trucks/food truck events

# Installation Instructions

To Node is required prior to downloading the project.

## Installing Node.js

Follow the instructions on the Node.js [website](https://nodejs.org/en/download/current) to install Node.js.

## Installing Yarn

Open a command console and run the command:

```
npm install --global yarn
```

## Project Directory

Create an empty folder where you want to store your app.

## Install Git

Follow the instructions on [Git](https://git-scm.com/downloads) to download Git.

## Clone the Repository

Open Git Bash and navigate to the folder you created to store the app. Clone the repository using:

```
git clone https://github.com/macon-code/foodtruckfinder.git
```

## Install Dependencies

To install the project dependencies, open /foodtruckfinder/ in a command console. Run the command:

```
yarn
```

or

```
yarn install
```

# Configuring the Project

Some environment variables are required to build the app. Create a file called .env at the main level of your project.

## Environment Variables

NextAuth requires some information before the project can be built. The required fields are:

```
DATABASE_URL="file:./dev.db"
```

Contact Macon Code to inquire about the application information.

## Generate the Prisma db file

To create or upate the db and Zod resources, use the command:

```
prisma generate
```

## Seeding the Database

To fill the db with test data, use the command:

```
npx tsx .\prisma\seed.ts
```

# Using the Development Server

The app runs locally on a local server.

## Building the Application

The application has to be built/rebuilt to view it. To build, run the command:

```
yarn build
```

## Start Development Server

To start the development server, run the command:

```
yarn run dev
```

## Stopping Developement Server

To stop the server, use <kbd>Ctrl</kbd> + <kbd>C</kbd>.
