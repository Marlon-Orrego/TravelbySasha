// GeneralViews
import NotFound from "../pages/NotFoundPage.vue";
import DashboardLayout_user from "../layout/DashboardLayout_user.vue";
import Usuario_perfil from "src/pages/Usuario_perfil.vue";
import Overview_user from "src/pages/Overview_user.vue";
import Reservas_user from "src/pages/Reservas_user.vue";
// Admin pages
import DashboardLayout from "../layout/DashboardLayout.vue";
import Overview from "src/pages/Overview.vue";
import Login from "src/pages/Login.vue";
import Aviones from "src/pages/Aviones.vue";
import Reservas from "src/pages/Reservas.vue";
import Usuarios from "src/pages/Usuarios.vue";
import otros from "src/pages/otro.vue";
import Vuelos from "src/pages/Vuelos.vue";

let usuario = localStorage.getItem("user-logged")
let routes;
if (usuario != null) {
  usuario=JSON.parse(usuario)
  if (usuario.tipo == "admin") {
    routes = [
      {
        path: "",
        name: "login",
        component: Login,
      },
      {
        path: "/home",
        component: DashboardLayout,
        redirect: "/admin/overview",
      },
      {
        path: "/admin",
        component: DashboardLayout,
        redirect: "/admin/overview",
        children: [
          {
            path: "overview",
            name: "Overview",
            component: Overview,
          },

          {
            path: "aviones",
            name: "aviones",
            component: Aviones,
          },
          {
            path: "vuelos",
            name: "vuelos",
            component: Vuelos,
          },
          {
            path: "Reservas",
            name: "Reservas",
            component: Reservas,
          },
          {
            path: "usuarios",
            name: "usuarios",
            component: Usuarios,
          },
          {
            path: "otros",
            name: "otros",
            component: otros,
          },
        ],
      },
      { path: "*", component: NotFound },
    ];
  } else {
    routes = [
      {
        path: "",
        name: "/",
        component: Login,
      },
      {
        path: "/home",
        component: DashboardLayout_user,
        redirect: "/user/vuelos",
      },
      {
        path: "/user",
        component: DashboardLayout_user,
        redirect: "/user/vuelos",
        children: [
          {
            path: "vuelos",
            component: Overview_user,
            name: "vuelos"
          },
          ,
          {
            path: "perfil",
            component: Usuario_perfil,
            name: "perfil"
          },
          {
            path: "reservas",
            component: Reservas_user,
            name: "reservas"
          }
        ],
      },

      { path: "*", component: NotFound },
    ];
  }
}else{
  routes = [
    {
      path: "",
      name: "/",
      component: Login,
    },
    { path: "*", component: NotFound },
    ];
}



export default routes;
