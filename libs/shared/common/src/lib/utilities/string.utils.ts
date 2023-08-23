const camelCaseToSentenceCase = (input: string) =>
  input
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();

export { camelCaseToSentenceCase };
