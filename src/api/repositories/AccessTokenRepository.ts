import { EntityRepository, Repository } from "typeorm";
import { AccessTokenModel } from "../models/AccessTokenModel";
@EntityRepository(AccessTokenModel)
export class AccessTokenRepository extends Repository<AccessTokenModel> {}
