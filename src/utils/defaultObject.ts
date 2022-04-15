export interface Ticket {
  id: string;
  name: string;
  nbHours: number;
  responsable_id: Responsable;
  completed: boolean;
}

export interface Responsable {
  id: string;
  firstName: string;
  lastName: string;
  tickets: Ticket[];
}
