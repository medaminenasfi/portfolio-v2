"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix('api', { exclude: ['health'] });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    const port = configService.getOrThrow('app.port');
    const appName = configService.get('app.name', 'portfolio-api');
    await app.listen(port);
    const logger = new common_1.Logger('Bootstrap');
    logger.log(`🚀 ${appName} is running at http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map