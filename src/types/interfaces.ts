export interface User {
  user_uuid: string;
  username?: string;
  email?: string;
  token?: string;
}

export interface Clock {
  clock_id: string;
  program: ClockProgram;
}

export interface EntryType {
  id: number;
  value: string;
  description: string;
}

export interface ClockProgram {
  program_id: number;
  entries_type: EntryType[];
}

export interface Entry {
  entry_id: string;
  user_uuid: string;
  entry_type: string;
  date: string;
  time: string;
  clock_id: string;
}
