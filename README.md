# Chatroom Web Application

This repository contains the source code for a chatroom web application built with React, TypeScript, and Bootstrap. The application features a responsive three-column layout with chat functionality, user profiles, and online user tracking.

## Key Features

- **Three Column Layout**: Implements a responsive layout with chat, user profile, and online users list.
- **Dark Mode Support**: Includes a theme context for toggling between light and dark modes.
- **Custom UI Components**: Utilizes custom-styled components for dialogs, cards, and form controls.
- **Responsive Design**: Adapts to various screen sizes from mobile to large desktops.

## Directory Structure

- `src/components`: Contains reusable UI components.
- `src/features/chat`: Chat-related components like chat window and profile viewer.
- `src/styles`: React-Bootstrap with custom CSS configurations for styling.

## Components

### ThreeColumnLayout

A responsive layout component that organizes the chat interface into three sections.

- **Source**: [ThreeColumnLayout.tsx](typescript:chatroom-webapp-vtwo/src/components/ThreeColumnLayout.tsx)
  - startLine: 1
  - endLine: 35

### ChatComponent

Handles the chat interface, displaying messages and allowing users to send new messages.

- **Source**: [ChatComponent.tsx](typescript:chatroom-webapp-vtwo/src/features/chat/ChatComponent.tsx)

### ProfileComponent

Displays user profile information.

- **Source**: [ProfileComponent.tsx](typescript:chatroom-webapp-vtwo/src/features/chat/ProfileComponent.tsx)

## Styles

- **Global Styles**: [index.css](css:chatroom-webapp-vtwo/src/index.css)
- **Chat Component Styles**: [ChatComponent.css](css:chatroom-webapp-vtwo/src/styles/ChatComponent.css)

## Development

### Prerequisites

- Node.js
- npm or yarn

### Setup

Clone the repository and install dependencies:

```bash
git clone https://your-repository-url.git
cd chatroom-webapp-vtwo
npm install
```

### Running the Application

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
