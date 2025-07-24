# Procrasti-Not

<div style="text-align:center;">
  <img src="./static/favicon256.png" alt="Procrasti Not logo" style="width:15%;" />
</div>

-Procrasti Not is a simple todo list application built with SvelteKit. It stores data in a MongoDB cluster and includes user authentication, todo management, AI-powered text correction, and theme customization.

## ✨ Features

- User authentication via [Logto.io](https://docs.logto.io/introduction), with Google sign-in support.
- Add, complete, and delete todos.
- Add random todos using the [DummyJson](https://dummyjson.com/docs/todos) API.
- Correct typos in custom todos with the [Gemini](https://ai.google.dev/gemini-api/docs) API.
- Switch between themes: _Light_, _Alpine_, _Dark_, and _Cyberpunk_.

## 🖼️ Screenshots & Demo

### Login

Log in using Logto.io or Google authentication.

![Logto login splash-page](static/readme/logto.png)

### Theme Switching

Switch between included themes.

![Rotate through theme](static/readme/rotate-theme.mp4)

### Managing Todos

Add random todos, mark tasks as completed, or delete them.

![Interact with todo](static/readme/random-todo.mp4)

### Custom Todo with AI Correction

Add custom todos and use AI to correct typos.

![Add and correct custom todo](static/readme/add-todo.mp4)
