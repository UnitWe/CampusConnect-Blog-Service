import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { RoomsController } from './controllers/rooms.controller';
import { RoomsService } from './services/rooms.service';
import { RoomsSchema } from './schemas/rooms.schema';
import { DatabaseModule } from '../../core/database/database.module';


@Module({
    imports: [DatabaseModule],
    controllers: [RoomsController],
    providers: [
        RoomsService, {
            provide: 'ROOMS_MODEL',
            useFactory: (connection: Connection) => connection.model('rooms', RoomsSchema),
            inject: ['DATABASE_CONNECTION'],
        }
    ], 
    exports: [
        RoomsService, {
            provide: 'ROOMS_MODEL',
            useFactory: (connection: Connection) => connection.model('rooms', RoomsSchema),
            inject: ['DATABASE_CONNECTION'],
        }
    ]
})
export class RoomsModule {}





