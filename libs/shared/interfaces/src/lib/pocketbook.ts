interface IPocketbook {
  id: string;
  owner: string;
  name?: string;
  collaboratorList: string[];
  createdAt: Date;
}

export { IPocketbook };
