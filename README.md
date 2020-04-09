# WouldYouRather?

This project is my implementation of the second project of Udacity's "React" Nanodegree program.

It is a simple implementation of the "Would you rather" game. There is a list of questions, each of them letting them choose between two options (e.g. "Would you rather this or that?").

The app connects to an offline API (in the form of a file used to read data), but does not persist its state (on refresh, all the added data disappears).


## Installation

Installation is simple and can be done through npm or Yarn.

`git clone https://github.com/FaremDev/react-wouldyourather-p2.git`

`yarn install OR npm install`

`yarn start OR npm start`

It will then be accessible through [http://localhost:3000](http://localhost:3000) in the browser.

## Usage

Usage is also quite straightforward.

The user cannot use the app without being logged in. To do so, they only have to select their name from a simple select input. Once logged in, they can easily log out.

The homepage shows the User's list of answered and unanswered questions. Clicking on one will allow them to see the two vote possibilities, and the number and percentage of users who chose each one (plus their own choice). The user is not allowed to modify its vote once it has selected one or the other option.

There is a form that allows the User to add a new question.

A leaderboard is available, that shows an ordered list of all users number of answered and created questions: for each, they earn one point, and the ranking is based on that total score.