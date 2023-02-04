interface IPocketbook {
  id: string;
  owner: string;
  name?: string;
  createdAt: number;
}

const POCKETBOOK_STUB: IPocketbook = {
  id: '',
  owner: '',
  createdAt: 0
};

export { IPocketbook, POCKETBOOK_STUB };
