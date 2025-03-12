import { HelloProducerService } from '@/modules/rabbitmq/producers/hello-message/hello-producer.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class MinutelyService implements OnModuleInit {
    private isBusy: boolean;
    private counter = 0;

    constructor(
        @InjectPinoLogger(MinutelyService.name) private readonly logger: PinoLogger,
        private readonly helloProducerService: HelloProducerService,
    ) {

    }

    async onModuleInit() {
        // If we want to run on App startup
        setTimeout(() => {
            return this.run();
        }, 1000)
        
    }

    //@Interval(60000)
    // or
    @Cron('0 * * * * *')
    async run() {
        this.counter++;
        this.logger.debug(`Run jon #${this.counter}`);
        if (!this.isBusy) {
            this.isBusy = true;
            await this.execSome()
                .catch((error) => {
                    this.logger.error(error);
                })
                .finally(() => {
                    this.isBusy = false;
                    this.logger.debug(`Job #${this.counter} is finished`);
                })
        }
    }

    async execSome() {
        const data = {dummyData: 'This is dummy data'}
        this.logger.info(data, 'Do some task');
        return this.helloProducerService.sendHelloMessage('Hello!');
    }
}
