class UserService {

  constructor() {
    console.log('init UserService');
  }

  public get(): Promise<object> {
    return Promise.resolve({test: 'ok!'});
  }
}

export default UserService;