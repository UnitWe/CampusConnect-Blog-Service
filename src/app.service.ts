import { Injectable } from '@nestjs/common';


//Service é responsável por conter a lógica 
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
