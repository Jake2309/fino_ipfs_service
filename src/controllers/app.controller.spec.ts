import { Test, TestingModule } from '@nestjs/testing';
import * as appController_1 from './app.controller.js';
import * as appService from '../repositories/app.service.js';

describe('AppController', () => {
  let appController: appController_1.AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [appController_1.AppController],
      providers: [appService.AppService],
    }).compile();

    appController = app.get<appController_1.AppController>(
      appController_1.AppController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
