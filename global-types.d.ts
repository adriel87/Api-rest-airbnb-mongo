declare namespace Express {
    export type Role = 'ADMIN' | 'USER';
  
    export interface UserSession {
      id: string;
      role: Role;
    }
  
    export interface Request {
      userSession?: UserSession;
    }
  }