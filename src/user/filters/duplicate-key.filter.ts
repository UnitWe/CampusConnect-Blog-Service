import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class DuplicateKeyFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    
    if (exception.code === 11000) {
      // Tratar o erro de chave duplicada
      const status = HttpStatus.CONFLICT;
      const message = 'Este email já está em uso. Por favor, escolha outro email.';
      
      response.status(status).json({
        statusCode: status,
        message: message,
      });
    }
  }
}