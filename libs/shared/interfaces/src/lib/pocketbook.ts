interface IPocketbook {
  id: string;
  owner: string;
  name?: string;
  collaboratorList: string[];
  createdAt: Date;
}

const POCKETBOOK_STUB: IPocketbook = {
  id: '',
  owner: '',
  collaboratorList: [],
  createdAt: new Date(0)
};

export { IPocketbook, POCKETBOOK_STUB };
