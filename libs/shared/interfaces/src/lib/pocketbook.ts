interface IPocketbook {
  id: string;
  owner: string;
  name?: string;
  collaborators: string[];
  createdAt: Date;
}

const POCKETBOOK_STUB: IPocketbook = {
  id: '',
  owner: '',
  collaborators: [],
  createdAt: new Date(0)
};

export { IPocketbook, POCKETBOOK_STUB };
