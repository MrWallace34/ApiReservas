import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EspacioService } from 'src/app/services/espacio.service';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-espacio',
  templateUrl: './espacio.component.html',
  styleUrls: ['./espacio.component.css']
})
export class EspacioComponent {
  espacioList: any = [];
  idUsuario: any = '';
  idEspacio: any = '';

  constructor(private espacioService: EspacioService, private reservaService: ReservaService, private router: Router) { }

  ngOnInit() {
    this.getAllEspacios();
    console.log("Id Usuario" + localStorage.getItem('userId'))
    this.idUsuario = localStorage.getItem('userId')
  }


  getAllEspacios() {
    this.espacioService.getAllEspacioData(localStorage.getItem('accessToken')).subscribe(
      (data: {}) => {
        this.espacioList = data
      }
    );
  }

  onReservar(form: any): void {
    this.reservaService.newReserva(form.value, this.idUsuario, this.idEspacio).subscribe(
      () => {
        this.router.navigateByUrl("espacio")
      }
    )

  }

  getIdEspacio(id: any) {
    this.idEspacio = id;
  }
}

