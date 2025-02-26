# Time Control Web Application

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Installation](#installation)
- [Database Configuration (Supabase)](#database-configuration-supabase)
- [Project Structure](#project-structure)

## Overview

This Time Control Web Application is a tool designed to manage and monitor employee activities within a company. It functions as a virtual time clock where workers can log their work hours. Additionally, these records can be viewed in a calendar, and users can add notes for specific days to enhance organization and tracking.

## Features

- **User Authentication**: 
  - Login and register functionality using Supabase authentication.
- **Activity Logging**: 
  - Users can register activities (entries) directly in the Supabase database.
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
  - [Supabase Client](https://supabase.com/): Provides authentication, and CRUD operations with database, and access to public store procedures.
- **Backend**:
  - [Supabase](https://supabase.com/): Manages backend services, including authentication and database operations.
  - [PostgreSQL](https://www.postgresql.org/): Used for database management, including Auth, Views, Tables, and Stored Procedures.

## Usage

1. **Register and Log In**: You can either register a new account or log in using the provided test account:
   - Email: `test@mail.com`
   - Password: `testing`
2. **Log Activities (Entries)**: Use the virtual clock to log your work activities directly in Supabase.
3. **View Calendar**: Navigate to the calendar to see your logged activities and add notes.
4. **Add Notes**: Click on a specific day to add or edit notes.
   
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

3. Set up environment variables:
   - Create a `.env` file in the root directory and add your Supabase credentials:
     ```env
     VITE_SUPABASE_URL=your-supabase-url
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. Start the development server:
   ```bash
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

## Database Configuration (Supabase)

### Tables

- `public.users (id, username)`
- `public.clocks (id, ip, description)`
- `public.entry_types (id, value, description)`
- `public.entry (id, created_at, user_uuid, entry_type_id, clock_id, date, time)`
- `public.notes (id, created_at, user_uuid, date, description)`
- `auth.users (id, mail, pwd)`

### Supabase API

Supabase API allows performing CRUD operations as described in the [Supabase API documentation](https://supabase.com/docs/guides/api). 

All views and tables in the `public` schema that are accessible by the active database role for a request can be queried.

To select `id` from `clocks`, you would use:

```typescript
let { data: clocks, error } = await supabase
  .from('clocks')
  .select('id');
```

If Row-Level Security (RLS) is enabled and not configured correctly, this query might return an empty array (`[]`).

To restrict access to specific tables, they should be placed to a different schema (not `public`), for example `auth` schema.

### Row-Level Security (RLS)

- `clocks` and `entry_types`:
  - Public SELECT (any user can read from these tables).
- `entry` and `notes`:
  - RLS configured so that only users who match `user_uuid` can SELECT their own entries/notes.
  - All users can INSERT into this table.
- `users`:
  - RLS configured so that only users who match `user_uuid` can SELECT and UPDATE their own data.

### Public Stored Procedures

- `get_server_time()`: Returns the current server datetime.
- `check_user_exists(mail: string)`: Checks if a user exists by email.

## Project Structure

```
project-root
├── src
│   ├── assets         # Static assets (e.g., cloud-bg.png)
│   ├── components     # Reusable React components
│   ├── context        # AuthContext and AlertContext
│   ├── hooks          # Supabase API calls and data handling
│   ├── pages          # Application pages
│   ├── styles         # CSS files
│   ├── types          # TS types
│   ├── utils          # Utility functions (e.g., dateUtils.ts)
│   ├── App.tsx        # Main application entry
│   ├── App.css        # Main application entry
│   ├── index.css      # Global styles
│   ├── main.tsx       # Application bootstrap file
│   ├── vite-env.d.ts  # 
├── public             # Static assets
├── index.html         # 
├── package.json       # Project dependencies and scripts
├── tsconfig.json      #
├── tsconfig.node.json #
├── vite.config.ts     # Vite configuration
├── yarn.lock          # Vite configuration
├── .env               # Environment variables
└── README.md          # Project documentation
```

> **Note**: The structure and files of this project are subject to change as development progresses.

---

