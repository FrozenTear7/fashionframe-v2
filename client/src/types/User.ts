export interface UserBase {
  _id: string;
  username: string;
}

export interface UserDetails extends UserBase {
  score: number;
}
