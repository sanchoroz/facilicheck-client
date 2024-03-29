import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Gardens from "./pages/gardens/Gardens";
import Garden from "./pages/garden/Garden";
import {
  FACILITIES_ROUTE,
  GARDENS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  ADD_FACILITY_ROUTE,
  ADD_GARDEN_ROUTE,
  GARDEN_ROUTE,
  USERS_ROUTE,
  REPORTS_ROUTE,
  CREATE_MONTHLY_REPORT_ROUTE,
  CREATE_YEARLY_REPORT_ROUTE,
  CREATE_USER,
} from "./utils/consts";
import Facilities from "./pages/facilities/Facilities";
import { monthlyReportInputs, yearlyReportInputs } from "./utils/formSource";
import CreateFacility from "./pages/createFacility/CreateFacility";
import CreateGarden from "./pages/createGarden/CreateGarden";
import Reports from "./pages/reports/Reports";
import Users from "./pages/users/Users";
import CreateMonthlyReport from "./pages/createMonthlyReport/CreateMonthlyReport";
import CreateYearlyReport from "./pages/createYearlyReport/CreateYearlyReport";
import CreateUser from "./pages/createUser/CreateUser";

export const authRoutes = [
  { path: HOME_ROUTE, Component: <Home /> },
  { path: GARDENS_ROUTE, Component: <Gardens /> },
  { path: GARDEN_ROUTE, Component: <Garden /> },
  { path: FACILITIES_ROUTE, Component: <Facilities /> },
  { path: ADD_FACILITY_ROUTE, Component: <CreateFacility /> },
  { path: ADD_GARDEN_ROUTE, Component: <CreateGarden /> },
  { path: REPORTS_ROUTE, Component: <Reports /> },
  { path: USERS_ROUTE, Component: <Users /> },
  { path: CREATE_USER, Component: <CreateUser /> },
  {
    path: CREATE_MONTHLY_REPORT_ROUTE,
    Component: <CreateMonthlyReport inputs={monthlyReportInputs} />,
  },
  {
    path: CREATE_YEARLY_REPORT_ROUTE,
    Component: <CreateYearlyReport inputs={yearlyReportInputs} />,
  },
];

export const publicRoutes = [
  { path: LOGIN_ROUTE, Component: <Login /> },
  { path: REGISTRATION_ROUTE, Component: <Login /> },
];
