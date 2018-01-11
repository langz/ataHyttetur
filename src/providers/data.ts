import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class DataProvider {
  constructor(private af: AngularFire, private http: Http) { }

  push(path: string, data: any): Observable<any> {
    return Observable.create(observer => {
      this.af.database.list(path).push(data).then(firebaseNewData => {
        // Return the uid created
        let newData: any = firebaseNewData;
        observer.next(newData.path.o[newData.path.o.length - 1]);
      }, error => {
        observer.error(error);
      });
    });
  }

  update(path: string, data: any) {
    this.af.database.object(path).update(data);
  }

  getAttendees() {
    return this.http.get('https://hyttetur-fagerholm.1d35.starter-us-east-1.openshiftapps.com/gjesteliste')
      .map((res: Response) => res.json());
  }

  list(path: string, queryObj: Object): FirebaseListObservable<any> {
    return this.af.database.list(path, queryObj);
  }

  object(path: string): FirebaseObjectObservable<any> {
    return this.af.database.object(path);
  }

  remove(path: string): Observable<any> {
    return Observable.create(observer => {
      this.af.database.object(path).remove().then(data => {
        observer.next();
      }, error => {
        observer.error(error);
      });
    });
  }
}
