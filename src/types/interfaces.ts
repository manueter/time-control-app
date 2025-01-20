export interface EntryType {
    value: string;
    description: string;
}
  
export interface Clock {
  clock_id: string;
  program: ClockProgram;
}

export interface ClockProgram {
  program_id: number;
  entries_type: string[];
}

  