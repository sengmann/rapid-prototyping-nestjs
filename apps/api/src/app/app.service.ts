import { Injectable } from '@nestjs/common';
import { Message } from '@w11k/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
