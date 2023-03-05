interface ITransaction {
  id: string;
  pocketbook: string;
  createdAt: Date;
  category: string;
  amount: number;
  direction: string;
  message: string;
}

export { ITransaction };
