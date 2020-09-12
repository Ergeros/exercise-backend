import { Request } from 'express';
import { User } from '../../user/user.entity';
interface UserRequest extends Request {
  user: User;
}

export default UserRequest;
