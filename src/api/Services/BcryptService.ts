import bcrypt = require('bcrypt');
import { Service } from 'typedi';

@Service()
export class BcryptService {
  // Hash Password
  public async hashPassword(password: string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      bcrypt.hash(password, 10, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  public async comparePassword(
    comparePassword: string,
    hashPassword: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(comparePassword, hashPassword, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
