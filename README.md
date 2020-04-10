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

## Build status
(To come)

[![Build Status](https://travis-ci.org/akashnimare/foco.svg?branch=master)](https://travis-ci.org/akashnimare/foco)
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/akashnimare/foco?branch=master&svg=true)](https://ci.appveyor.com/project/akashnimare/foco/branch/master)

## Screenshots
To come

## Tech/framework used
Ex. 
<b>Built with</b>
- [React ](https://reactjs.org/)

## How to use?
If people like your project they’ll want to learn how they can use it. To do so include step by step guide to use your project.

## Contribute
This project is not awaiting contributions, as it starts as a simple exercice in the beginning. This might change later.

## Credits
Huge thanks to:
- Udacity for providing the needed resources
- React and Redux team for their framework and tools
- The authors of any NPM package used in this project

## License
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

MIT © 2020 [Mehdi RAFENNE]()