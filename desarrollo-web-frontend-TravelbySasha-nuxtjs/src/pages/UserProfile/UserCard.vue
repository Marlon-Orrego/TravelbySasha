<template>
  <center>
    <center>
      <CRow
        :xs="{ cols: 1, gutter: 4 }"
        :md="{ cols: 2 }"
        v-show="!editProfile"
      >
        <CCol xs v-for="d in data">
          <stats-card style="width: 23rem; height: 12rem">
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-send"></i>
            </div>
            <div slot="content">
              <p class="card-tittle">Nombre: {{ d.nombre }}</p>
              <h4 class="card-title">Correo: {{ d.correo }}</h4>
              <table>
                <tr>
                  <td>
                    <button
                      class="btn btn-light"
                      v-on:click="consultarUsuario(d)"
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      v-on:click="borrarUsuario(d)"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </stats-card>
        </CCol>
      </CRow>
    </center>
    <div v-show="editProfile">
      <template>
        <center>
          <card>
            <h4 slot="header" class="card-title">Edit Profile</h4>
            <form>
              <div class="row">
                <div class="col-md-5">
                  <base-input
                    type="text"
                    label="Cédula de ciudadanía"
                    :disabled="true"
                    placeholder="C.C"
                    v-model="dataEdit.IdUsuario"
                  >
                  </base-input>
                </div>
                <div class="col-md-3">
                  <base-input
                    type="text"
                    label="Nombre"
                    placeholder="Nombre"
                    v-model="dataEdit.nombre"
                  >
                  </base-input>
                </div>
                <div class="col-md-4">
                  <base-input
                    type="email"
                    label="Email"
                    placeholder="correo"
                    v-model="dataEdit.correo"
                  >
                  </base-input>
                </div>
              </div>
              <center>
                <div class="text-center">
                  <button
                    type="submit"
                    class="btn btn-info btn-fill float-right"
                    @click.prevent="updateProfile(dataEdit._Id)"
                  >
                    Actualizar perfil
                  </button>
                </div>
              </center>
              <div class="clearfix"></div>
            </form>
          </card>
        </center>
      </template>
    </div>
  </center>
</template>
<script>
import StatsCard from "src/components/Cards/StatsCard.vue";
import {
  CRow,
  CCard,
  CCol,
  CCardBody,
  CCardTitle,
  CCardText,
  CCardFooter,
} from "@coreui/bootstrap-vue";
import Swal from "sweetalert2";
export default {
  components: {
    CRow,
    CCard,
    CCol,
    CCardBody,
    CCardTitle,
    CCardText,
    CCardFooter,
    StatsCard,
  },
  data() {
    return {
      registerActive: false,
      emptyFields: false,
      data: [],
      editProfile: false,
      dataEdit: {
        IdUsuario: "",
        nombre: "",
        correo: "",
        contraseña: "",
      },
    };
  },
  methods: {
    getClasses(index) {
      var remainder = index % 3;
      if (remainder === 0) {
        return "col-md col-md-offset-1";
      } else if (remainder === 2) {
        return "col-md";
      } else {
        return "col-md";
      }
    },
    async consultarUsuario(d) {
      this.editProfile = true;
      let url = "http://localhost:8000/usuarios/" + d._id;
      let token = localStorage.getItem("user-token");
      token = token.slice(1, -1);
      const headers = { authorization: `Bearer ${token}` };

      let response = await fetch(url, { headers });
      let promise = await response.json();
      let datos = promise.info;
      this.dataEdit.IdUsuario = datos.IdUsuario;
      this.dataEdit.nombre = datos.nombre;
      this.dataEdit.correo = datos.correo;
      this.dataEdit._Id = datos._id;
      this.dataEdit.contraseña = datos.contraseña;
    },
    async updateProfile(id) {
      let url = "http://localhost:8000/usuarios/" + id;
      let token = localStorage.getItem("user-token");
      token = token.slice(1, -1);
      let response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(this.dataEdit),
      });

      let info = await response.json();
      if (info.message == "Usuario actualizado.") {
        await Swal.fire({
          icon: "success",
          title: "Excelente",
          text: "Usuario editado con éxito!",
        });
        location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "oh no...",
          text: "Ha ocurrido un error actualizando el usuario",
        });
      }
      console.log(await response.json());
    },
    async borrarUsuario(id) {
      let url = "http://localhost:8000/usuarios/" + id._id;
      let token = localStorage.getItem("user-token");
      token = token.slice(1, -1);
      const headers = { authorization: `Bearer ${token}` };
      let response = await fetch(url, {
        method: "DELETE",
        headers,
      });
      let data = await response.json();
      if (data.message == "0") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "no se pudo elimina el usuario!",
        });
      } else {
        await Swal.fire({
          icon: "success",
          title: "Modificación Realizada",
          text: "usuario eliminado!",
        });
        location.reload();
      }
    },
  },
  async mounted() {
    let url = "http://localhost:8000/usuarios";
    let token = localStorage.getItem("user-token");
    token = token.slice(1, -1);
    const headers = { authorization: `Bearer ${token}` };
    let response = await fetch(url, { headers });
    let promise = await response.json();
    let datos = promise.info;
    this.data = datos;
  },
};
</script>
