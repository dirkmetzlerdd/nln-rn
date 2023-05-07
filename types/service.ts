export type Service = {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  ownerUid: string;
  adminUids: Array<string>;
  // geo
};

export type NewService = Omit<
  Service,
  "createdAt" | "id" | "adminUids" | "ownerUid"
>;
