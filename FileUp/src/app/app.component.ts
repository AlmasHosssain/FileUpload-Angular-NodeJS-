import { FileSelectDirective, FileUploader } from 'ng2-file-upload'

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  image;
  constructor(
    private http : HttpClient
  ){}

  selectImage(event){
    if (event.target.files.length>0) {
      const file = event.target.files[0]
      this.image = file
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('file',this.image)
    this.http.post<any>('http://localhost:3000/file',formData).subscribe(
      res=>console.log(res),
      err=>console.log("Error From Client"+err)
    )
  }
}
