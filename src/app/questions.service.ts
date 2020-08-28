import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/*Look at the constructor example below. Its signature contains two oddities: a namespace (private) and a type.
The namespace is a way of initializing the instance with whatever is given as a parameter. It's a shortcut for the following:

constructor(http: HttpClient) {
  this.http = http;
}

Expressing this dependency (to HttpClient) in the constructor tells Angular to inject an HttpClient into this class—its dependency injection again.*/
export class QuestionsService {
  constructor(private http: HttpClient) {}

  /*The getJSON method takes a string argument that's the fileID to fetch. Using this.http, it fetches it and returns the result.
  There is, however, one final twist: the as Observable<any> is a TypeScript type cast. This is a way of giving the TypeScript compiler
  information it can deduce about types. It's supposed to make the method's return explicit by saying "we return this type". HttpClient
  returns an Observable (from the RxJS library you imported); for the purpose of this Exercise, you can consider it an enhanced promise,
  as they allow you to process events asynchronously. When invoking the getJSON function from another class, you'll benefit from TypeScript's
  features because it will know what the method returns and won't let you use the result like a string or something else.*/
  public getJSON(fileId: string) {
    return this.http.get(`./assets/${fileId}.json`) as Observable<any>;
  }
}
