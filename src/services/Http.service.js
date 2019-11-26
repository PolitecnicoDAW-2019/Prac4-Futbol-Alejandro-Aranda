class HttpService {
  constructor() {}
  makeRequest = url => {
    return fetch(url, {
      method: 'POST',
      body: ''
    }).then(response => response.json());
  };
}
