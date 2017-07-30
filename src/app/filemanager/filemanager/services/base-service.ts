import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { CustomHttp } from './custom-http';
import { Http, RequestOptionsArgs } from '@angular/http';


@Injectable()
export class BaseService {
  private resource: string = '';

  constructor(private authHttp: CustomHttp, private http: Http, private minMapService: MinMapService) {

  }

  public setResource(resourceName: string) {
    this.resource = resourceName;
  }

  public getAll(options: RequestOptionsArgs = {}, resource: any = false) {
    let segment = (!resource) ? this.resource : resource;
    return this.authHttp.get(segment).map((res) => this.convertToJson(res, segment));
  }

  public get(resourceID: string, options: RequestOptionsArgs = {}, resource: any = false) {
    let segment = (!resource) ? this.resource : resource;
    return this.authHttp.get(segment).map((res) => this.convertToJson(res, segment));
  }

  public save(object: any, options: RequestOptionsArgs = {}, resource: any = false) {
    let segment = (!resource) ? this.resource : resource;
    return this.authHttp.post(segment, JSON.stringify(object), options).map((res) => this.convertToJson(res, segment));
  }

  public update(resourceID: string, updateObj: any, options: RequestOptionsArgs = {}, resource: any = false) {
    let segment = (!resource) ? this.resource : resource;
    return this.authHttp.post(segment + '/' + resourceID, JSON.stringify(updateObj), options).map((res) => this.convertToJson(res, segment));
  }

  public delete(resourceID: string, options: RequestOptionsArgs = {}, resource: any = false) {

  }

  private convertToJson(res, segment = '') {
    try {
      return res.json();
    } catch (e) {
      console.info('JSON PARSE FAILED => ', e, res);
      return {};
    }
  }

  public isValidJson(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  public setMinMap(entities) {
    this.minMapService.setEntities(entities);
  }
}
