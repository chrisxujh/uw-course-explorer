import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class ConfigService {
  constructor() {}

  getUwApiKey() {
    return environment.uwApiKey;
  }

  getBackendUrl() {
    return environment.backendUrl;
  }
}
