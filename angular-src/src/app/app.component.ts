import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

export class Cli {
  tableName: string;
}

export class Output {
  JSON: any
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private serverApi= 'http://localhost:3000';
  public cli: Cli;
  public output: Output;

  constructor(private httpClient: HttpClient,) {
      this.cli = new Cli();
      this.output = new Output();
}

  generate(){
    let URI = `${this.serverApi}/main/`;
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
        let body = JSON.stringify({tableName: this.cli.tableName});
        this.httpClient.post(URI, body, {headers: headers})
          .subscribe(res => {
            this.output.JSON = JSON.stringify(res, null, 4)
          }
          )

  }
}
