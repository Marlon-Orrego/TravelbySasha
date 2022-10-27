import DashboardLayout from "../layout/DashboardLayout.vue";
// GeneralViews
import NotFound from "../pages/NotFoundPage.vue";

// Admin pages
import Overview from "src/pages/Overview.vue";
import UserProfile from "src/pages/UserProfile.vue";
import Login from "src/pages/Login.vue";
import Aviones from "src/pages/Aviones.vue";
import Reservas from "src/pages/Reservas.vue";
import Usuarios from "src/pages/Usuarios.vue";
import Vuelos from "src/pages/Vuelos.vue";


const routes = [
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
        path: "user",
        name: "User",
        component: UserProfile,
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
    ],
  },
  { path: '*', component: NotFound }
];

export default routes;
