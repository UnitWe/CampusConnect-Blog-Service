import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
    imports: [
        ClientsModule.register([
            {
              name: 'BLOG_SERVICE',
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: 'blog',
                  brokers: ['host.docker.internal:9094'],
                },
              },
            },
        ]),
    ],
    exports: [
        ClientsModule
    ]
})
export class ClientModule {}
