# Trello Board Tracker

This is a Telex integration that tracks a user's specified board and notifies the team on the card's progress every morning and evening.

## Key Features
- Receive your Trello Board progress on Telex
- Keep your team up-to date with the pending and updated tasks on the Trello boards

## Tech Stack
- Node
- Express
- Telex Webhooks
- Atlassian Trello API

## How to Setup the Integration in Telex.
1. Login or Create an account on [Telex](telex.im)
2. In your dashboard, navigate to the Apps section
3. Click on the "Add App" button and enter this "https://trello-board-tracker.onrender.com/integration.json" in the popup's input field.
4. Activate the app
5. To link to your Trello account by [Authorizing the app here](https://trello-board-tracker.onrender.com/trello/authorize).
6. After authorizing the app, copy the token and add it to your settings in the "Trello API Token" field.
7. Specify the boards you would like to track
8. Choose when the integration should run using the cron expression syntax then add it to the "Interval" field. For example, if you want to run the app at 9:15AM and 4:15PM, you'll use "15 9,16 * * *" 
* You can use [https://crontab.guru](https://crontab.guru) to generate an interval*
9. You can choose a channel to run the integration in the "Output tab"
