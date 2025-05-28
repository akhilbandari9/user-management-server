import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Users {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: false })
  phone?: string;

  @Prop({ required: false, type: String })
  address?: string;

  @Prop({ required: false, type: Date })
  dateOfBirth?: Date;

  @Prop({ default: true, type: Boolean })
  isActive?: boolean;

  @Prop({ required: false, type: String })
  role?: string;

  @Prop({ default: Date.now, type: Date })
  updatedAt: Date;

  @Prop({ default: Date.now, type: Date })
  createdAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
