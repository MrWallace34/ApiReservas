import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AnimalService } from 'src/app/services/animal.service';
import { AreaService } from 'src/app/services/area.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent {
  animalList: any = [];
  areaList: any = [];
  areaForm: any = this.formBuilder.group({
    nombre: '',
    descripcion: ''
  })
  editableArea: boolean = false;
  idArea: any;
  idAnimal: any;


  constructor(private areaService: AreaService,
    private animalService: AnimalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthenticationService) {


  }
  ngOnInit() {
    this.getAllAnimals();
    this.getAllAreas();
  }


  getAllAnimals() {
    this.animalService.getAllAnimalsData(localStorage.getItem('accessToken')).subscribe(
      (data: {}) => {
        this.animalList = data
      }
    );
  }
  getAllAreas() {
    this.areaService.getAllAreasData(localStorage.getItem('accessToken')).subscribe(
      (data: {}) => {
        this.areaList = data;
      }
    );
  }

  newAreaEntry() {
    this.areaService.newArea(localStorage.getItem('accessToken'), this.areaForm.value).subscribe(
      () => {
        //Redirigiendo a la ruta actual /area y recargando la ventana
        this.router.navigate(['/area']).then(() => {
          this.newMessage('Registro exitoso');
        })
      }
    );
  }


  newMessage(messageText: string) {
    this.toastr.success('Clic aquí para actualizar la lista', messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }

  updateAreaEntry() {
    //Removiendo valores vacios del formulario de actualización


    for (let key in this.areaForm.value) {
      if (this.areaForm.value[key] === '') {
        this.areaForm.removeControl(key);
      }
    }
    this.areaService.updateArea(localStorage.getItem('accessToken'), this.idArea, {codigoAnimal: this.idAnimal}).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Área editada");
      }
    );
  }

  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }


  toggleEditArea(id: any) {
    this.idArea = id;
    console.log(this.idArea)
    this.areaService.getOneArea(localStorage.getItem('accessToken'), id).subscribe(
      data => {
        this.areaForm.setValue({
          nombre: data.nombre,
         descripcion: data.descripcion,

        });
      }
    );
    this.editableArea = !this.editableArea;
  }

  getValidDate(fecha: Date) {
    const fechaFinal: Date = new Date(fecha);
    //separado los datos
    var dd = fechaFinal.getDate() + 1;//fue necesario porque siempre daba un día antes
    var mm = fechaFinal.getMonth() + 1; //porque Enero es 0
    var yyyy = fechaFinal.getFullYear();
    var mes = '';
    var dia = '';

    //Como algunos meses tienen 31 días dd puede dar 32
    if (dd == 32) {
      dd = 1;
      mm++;
    }
    //Transformación de fecha cuando el día o mes son menores a 10
    //se le coloca un cero al inicio
    //Día
    if (dd < 10) {
      dia += `0${dd}`;
    } else {
      dia += `${dd}`;
    }
    //Mes
    if (mm < 10) {
      mes += `0${mm}`;
    } else {
      mes += `${mm}`;
    }
    //formatDate para colocar la fecha en un formato aceptado por el calendario
    //GMT-0500 es para Colombia
    var finalDate = formatDate(new Date(yyyy + '-' + mes + '-' + dia + ' GMT-0500'), 'yyyy-MM-dd', "en-US");
    return finalDate;
  }
/*
  deleteAreaEntry(id: any) {
    console.log(id)
    this.areaService.deleteArea(localStorage.getItem('accessToken'), id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Animal eliminado");
      }
    );
  }*/
}
