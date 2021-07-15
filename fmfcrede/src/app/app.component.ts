import { Component } from '@angular/core';
import { Usuarios } from './models/usuarios';
import jsPDF, { jsPDFAPI } from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Usuarios =Usuarios;
  constructor()
  {
    console.log(this.Usuarios);
  }
  /*
  makePDF()
  {
    let pdf = new jsPDF();
    pdf.text("FEDERACIÓN MEXICANA DE FÚTBOL",10,10);
    
    pdf.save();
    
  }*/
  public downloadPDF() {
    
    // Extraemos el
    const DATA:any = document.getElementById('htmlData');
    const doc = new jsPDF('l', 'pt', 'a4');
    const options = {
      background: ' #ffffff',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });}
  
  
  /*downloadPDF() {
    
    // Extraemos el
    const DATA:any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });}*/
  
 // title = 'fmfcrede';
 selectedUsuario: Usuarios = new Usuarios();
  usuarioArray: Usuarios[] =
  
  [
    {
      id:1,
      nombre:"Diana",
      apepat:"Valdes",
      apemat:"Reyes",
      fecnac:"17/11/1998",
      sexo:"Femenino",
      naci:"🇲🇽 Mexicana",
      club:"toluca",
      rfc:"CATD840609MM1",
      ocupacion:"maestra"
   }
  /*
    {
      id:2,
      nombre:"Gustavo",
      apepat:"Valdes",
      apemat:"Reyes",
      fecnac:"18/11/1999",
      sexo:"Masculino",
      naci:"Mexicana",
      club:"toluca",
      rfc:"CATD840609MM9",
      ocupacion:"fisico"
   },
    {id:3,nombre:"Jesus",apepat:"Valdes",apemat:"Reyes",
      fecnac:"03/11/1998",
      sexo:"Masculino",
      naci:"Mexicana",
      club:"toluca",
      rfc:"CATD840609MS1",
      ocupacion:"Ingeniero"
       }*/

  ];
  addOrEdit(){
    this.selectedUsuario.id = this.usuarioArray.length + 1;
    this.usuarioArray.push(this.selectedUsuario);
    this.selectedUsuario = new Usuarios(); //esto es para limpiar la casilla del formulario

  }

}
