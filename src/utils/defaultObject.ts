export interface Ticket {
  name: string;
  nbHours: number;
  responsable: Responsable;
}

export interface Responsable {
  firstName: string;
  lastName?: string;
}
