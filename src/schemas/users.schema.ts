import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Users {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  updatedAt: Date;

  @Prop()
  createdAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
