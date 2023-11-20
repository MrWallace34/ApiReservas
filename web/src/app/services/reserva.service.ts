import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  apiUri = '/api/Reservas';
  constructor(private http: HttpClient) { }

  newReserva(data: any, id: any, idEspacio: any) {

    const datos = {
      NumeroReserva: data.NumeroReserva,
      FechaReserva:data.FechaReserva,
      HoraInicio: data.HoraInicio,
      HoraFinal: data.HoraFinal,
      idUsuario: id,
      Espacio: idEspacio
    } 

    console.log(datos)
    return this.http.post<any>(
      this.apiUri,
      datos,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }
}
