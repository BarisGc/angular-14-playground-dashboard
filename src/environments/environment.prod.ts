export enum codeOwner {
  baris,
  original
}
export const environment = {
  codeOwnerName: codeOwner.baris,
  production: true,
  backend: {
    // host: 'https://demo0034835.mockable.io',
    host: 'http://localhost:9000',
  },
  oauth: {
    // host: 'https://demo0034835.mockable.io',
    host: 'http://localhost:9000',
    client_id: '2',
    client_secret: 'tsN80QNwTawD3WZSX2uziOFI6HstTEs2bXBqsCyv',
    scope: '*',
  },
  movieDB: {
    // host: 'https://api.themoviedb.org/3', // caution: find better fake api
    host:''
  },
};
