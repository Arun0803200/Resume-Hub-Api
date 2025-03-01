import { EntityRepository, Repository } from "typeorm";
import { UserModel } from "../models/UserModel";
@EntityRepository(UserModel)
export class UserRepository extends Repository<UserModel> {}
