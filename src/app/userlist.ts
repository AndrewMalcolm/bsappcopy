import { User } from './user';

export const userlist: User[] = [
  { id: 1, username: 'Andrew Malcolm', password: 'wachtwoord', role: 'specificationsmanager', picture: "../assets/dummyimages/architect.jpg" },
  { id: 2, username: 'Jeroen Werbrouck', password: 'wachtwoord', role: 'projectmanager', picture: "../assets/dummyimages/architect.jpg" },
  { id: 3, username: 'Sam Vanhee', password: 'wachtwoord', role: 'architect', picture: "../assets/dummyimages/architect.jpg" },
  { id: 4, username: 'Seppe Neyts', password: 'wachtwoord', role: 'visitor', picture: "../assets/dummyimages/architect.jpg" },
  { id: 5, username: 'creator', password: '', role: 'visitor', picture: "../assets/dummyimages/architect.jpg" }
];
