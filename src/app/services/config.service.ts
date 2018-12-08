import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class ConfigService {
  configResourceUrl = environment.configResourceUrl;
  constructor(private httpClient: HttpClient) {}

  getUwApiKey() {
    return environment.uwApiKey;
  }

  getBackendUrl() {
    return environment.backendUrl;
  }

  getPopularSubjects() {
    return this.configGet('/subjects/popular_subjects.json');
  }

  configGet(target: string) {
    return this.httpClient.get(this.configResourceUrl + target);
  }
}
