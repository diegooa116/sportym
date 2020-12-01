import { Component, OnInit } from '@angular/core';
import { ApiInscripcionesService } from '../api-inscripciones.service';
import {Chart} from 'chart.js'
@Component({
  selector: 'app-grafico-tipo-inscripcion',
  templateUrl: './grafico-tipo-inscripcion.component.html',
  styleUrls: ['./grafico-tipo-inscripcion.component.css'],
  providers:[ApiInscripcionesService]
})
export class GraficoTipoInscripcionComponent implements OnInit {
  tipoInscripciones:any[] = new Array<any>();//Donde guardaremos los tipo de inscripciones
  chart = [];

  datosGrafica:any[] = new Array<any>()
  
 tipo = ['Novato','Principiante','Avanzado','Crack'] // Valores de los tipos de membresías 

 totalDia;
 totalSemana;
 totalMes;
 totalAnio;

 d:number;
 s:number;
 m:number;
 a:number;

  constructor(private api:ApiInscripcionesService) {
    this.getInscripciones();
   }

  ngOnInit(): void {
    
  }


  getInscripciones = () =>{//Con este método optenemos de la api las incripciones que estén creadas
    this.api.obtenerListadoInscripcion().subscribe((data:any)=>{
      this.tipoInscripciones = data.results.map(data => data.tipoInscripcion);
      console.log(this.tipoInscripciones)

      this.totalDia=this.tipoInscripciones.filter(dia=>dia=='1') //Guardamos en totalDia los resultados encontrados para tiposinscripciones = a 1
      this.totalSemana=this.tipoInscripciones.filter(dia=>dia=='2') //Guardamos en totalSemana los resultados encontrados para tiposinscripciones = a 2
      this.totalMes=this.tipoInscripciones.filter(dia=>dia=='3')  //Guardamos en totalMes los resultados encontrados para tiposinscripciones = a 3
      this.totalAnio=this.tipoInscripciones.filter(dia=>dia=='4')  //Guardamos en totalAnio los resultados encontrados para tiposinscripciones = a 4

      this.d=this.totalDia.length // Guardamos en d el tamaño del arreglo en totalDia
      this.s=this.totalSemana.length // Guardamos en s el tamaño del arreglo totalSemana
      this.m=this.totalMes.length // Guardamos en m el tamaño del arreglo totalMes
      this.a=this.totalAnio.length  // Guardamos en a el tamaño del arreglo totalAnio
      
      
      this.chart = new Chart('canvas',{ // Gráfica en donde se muestran los resultados de total tipo membresia
        type:'bar',
        data:{
          labels:this.tipo,
          
          datasets:[
            {
              data:[this.d,this.s,this.m,this.a], // Cantidad de membresias segun su correspondiente tipo
              backgroundColor:[
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)'
              ],
              fill:false
            }
          ]
        },
        options:{
          legend:{
            display:false
            
          },
          scales:{
            xAxes:[{
              display:true,
              ticks: {
                fontColor: "black",
                fontSize: 40,
                beginAtZero: true
              }
            }],
            yAxes:[{
              ticks: {
              fontColor: "black",
              fontSize: 20,
              beginAtZero: true
            }
            },
          ]
          }

        }
      });
      
    },
    error =>{
      console.log(error);
    }
    )
    
  }

  




}
