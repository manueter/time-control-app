# Time Control Web Application

## Overview

This Time Control Web Application is a tool to track and manage time effectively. It enables users to register and log their activities through a virtual clock and view their records on a calendar. Additionally, users can add notes to specific days for better organization.

## Features

- **User Authentication**: 
  - Login and register functionality to securely access personal activity data.
- **Activity Logging**: 
  - Logged-in users can register activities using a virtual clock.
  - Users can select predefined activity types or create custom entries.
- **Calendar View**: 
  - A calendar that displays logged activities for each day.
  - Allows adding and viewing notes for specific days.
- **Responsive Design**: 
  - Optimized for use across devices (desktop, tablet, and mobile).

## Technologies Used

- **Frontend**:
  - [React](https://reactjs.org/): A JavaScript library for building user interfaces.
  - [Vite](https://vitejs.dev/): A fast build tool and development server.
  - [TypeScript](https://www.typescriptlang.org/): A strongly typed programming language that builds on JavaScript.

## Installation

### Prerequisites

- Node.js (>= 14.x)
- Yarn

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/time-control-app.git
   cd time-control-app
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Usage

1. **Register an Account**: Create a new account using the registration form.
2. **Log In**: Access your account with your email and password.
3. **Register Activities**: Use the virtual clock to log your activities.
4. **View Calendar**: Navigate to the calendar to see your logged activities and add notes.
5. **Add Notes**: Click on a specific day to add or edit notes.

## Project Structure

```
project-root
├── src
│   ├── assets         # Static assets (e.g., cloud-bg.png)
│   ├── components     # Reusable React components
│   │   ├── calendar.tsx
│   │   ├── clock.tsx
│   │   ├── clockdisplay.tsx
│   │   ├── clockwise.tsx
│   │   ├── dropdownmenu.tsx
│   │   ├── entriesbutton.tsx
│   │   ├── note.tsx
│   │   ├── sidebar.tsx
│   │   └── togglebutton.tsx
│   ├── pages          # Application pages
│   │   ├── CalendarPage.tsx
│   │   ├── ClockPage.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── styles         # CSS files
│   ├── utils          # Utility functions (e.g., dateUtils.ts)
│   ├── App.tsx        # Main application entry
│   ├── index.css      # Global styles
│   ├── main.html      # HTML template
│   └── app.css        # Application-specific styles
├── public             # Static assets
├── package.json       # Project dependencies and scripts
└── vite.config.ts     # Vite configuration
```

> **Note**: The structure and files of this project are subject to change as development progresses.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact

For any inquiries or feedback, please reach out to:

- **Email**: [your-email@example.com](mailto:your-email@example.com)
- **GitHub**: [your-username](https://github.com/your-username)

---
Thank you for using the Time Control Web Application!
