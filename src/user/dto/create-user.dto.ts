import { IsArray, IsEnum, IsString } from "class-validator";
import { ValidRoles, ValidRolesList } from "../enums/valid-roles";

export class CreateUserDto {
  @IsString()
  username: string;

  @IsArray()
  @IsEnum(ValidRoles, { each: true, message: 'roles must be an array of valid roles' })
  roles: ValidRoles[];
}