export interface Ticket {
  name: string;
  nbHours: number;
  responsable: Responsable;
  completed: boolean;
}

export interface Responsable {
  firstName: string;
  lastName?: string;
}
