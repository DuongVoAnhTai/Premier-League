export interface User {
    userID: string;
    email: string;
    name: string;
    role: "ADMIN" | "REFEREE";
  }