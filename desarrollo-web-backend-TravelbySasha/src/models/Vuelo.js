class Vuelo {
  constructor({
    IdVuelo,
    IdPiloto,
    IdAvion,
    FechaDespegue,
    FechaAterrizaje,
    Tiempo,
  }) {
    this.IdVuelo = IdVuelo;
    this.IdPiloto = IdPiloto;
    this.IdAvion = IdAvion;
    this.FechaDespegue = FechaDespegue;
    this.FechaAterrizaje = FechaAterrizaje;
    this.Tiempo = Tiempo;
  }
}

module.exports = Vuelo;
