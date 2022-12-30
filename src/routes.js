
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserList";
import ScreenList from "views/ScreenList";
import VehicleList from "views/VehicleList";
import Event from "./views/Events";
import TravelEquipment from "./views/TravelEquipment";
import HotelManagement from "./views/HotelManagement";

const dashboardRoutes = [
  
  
  {
    path: "/user",
    name: "User Management",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/main",
    name: "Main Screen Management",
    icon: "nc-icon nc-circle-09",
    component: ScreenList,
    layout: "/admin",
  },
  {
    path: "/hotel",
    name: "Hotel Management",
    icon: "nc-icon nc-circle-09",
    component: HotelManagement,
    layout: "/admin",
  },
  {
    path: "/vehicle",
    name: "Vehicle Management",
    icon: "nc-icon nc-notes",
    component: VehicleList,
    layout: "/admin",
  },
  {
    path: "/events",
    name: "Events Management",
    icon: "nc-icon nc-notes",
    component: Event,
    layout: "/admin",
  },
  
  {
    path: "/travel-equipment",
    name: "Travel Equipment Rent Shop Management",
    icon: "nc-icon nc-paper-2",
    component: TravelEquipment,
    layout: "/admin",
  },
  
  
];

export default dashboardRoutes;
