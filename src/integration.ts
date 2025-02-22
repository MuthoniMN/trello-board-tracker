export const config = {
  "data": {
    "date": {
      "created_at": "2025-02-19",
      "updated_at": "2025-02-19"
    },
    "descriptions": {
      "app_description": "This is an interval integration that retrieves data from Trello boards every morning and at the end of the workday. Generate a new token here: https://trello-board-tracker.onrender.com/trello/authorize then add it in your settings",
      "app_logo": "https://trello-board-tracker.onrender.com/logo.png",
      "app_name": "Trello Board Tracker",
      "app_url": "https://trello-board-tracker.onrender.com/",
      "background_color": "#172b4d"
    },
    "integration_category": "Project Management",
    "integration_type": "interval",
    "is_active": true,
    "output": [
      {
        "label": "channel",
        "value": true
      }
    ],
    "key_features": [
      "Get notified on daily tasks",
      "Get morning and evening updates on Trello cards",
      "Get notified on upcoming deadlines",
      "Get notified of the team's progress at the end of the day",
      "Keep the team updated on the project's progress"
    ],
    "settings": [
      {
        "label": "Trello API Token",
        "description": "Generate a new token from here: https://trello-board-tracker.onrender.com/trello/authorize",
        "type": "text",
        "required": true,
        "default": process.env.TRELLO_API_KEY
      },
      {
        "label": "Which Trello board would you like to track?",
        "description": "You can specify multiple boards.",
        "type": "multi-select",
        "required": true,
        "default": "Telex Integration"
      },
      {
        "label": "interval",
        "type": "text",
        "required": true,
        "default": "*/1 * * * *"
      },
    ],
    "target_url": "",
    "tick_url": "https://trello-board-tracker.onrender.com/tick",
    "auth_initiate_url": "https://trello-board-tracker.onrender.com/trello/authorize",
    "is_oauth": true
  }
};
