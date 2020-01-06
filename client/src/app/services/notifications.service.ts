import { Injectable } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable()
export class NotificationsService {

  constructor(
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = 'default';
  }

  success(msg: string) {
    this.toastyService.success({ title: 'Success', msg: msg });
  }

  warn(msg: string) {
    this.toastyService.warning({ title: 'Error', msg: msg, timeout: 6000 });
  }
}
