type TransactionFormFields = {
  category: string | null;
  amount: number | null;
  direction: TransactionDirection | null;
  message: string | null;
  timestamp: Date | null;
  paymentMode: PaymentMode | null;
};

export { TransactionFormFields };
