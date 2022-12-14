import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { NotFound } from "./components/NotFound";

import ObjectTypesList from './components/object-types/View';
import ObjectTypesForm from './components/object-types/Form';

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/object-types',
        element: <ObjectTypesList />
    },
    {
        path: '/object-types/create',
        element: <ObjectTypesForm formType="create" />
    },
    {
        path: '/object-types/edit/:typeId',
        element: <ObjectTypesForm formType="edit" />
    },
    {
        path: '/notfound',
        element: <NotFound />
    },
    {
        path: '*',
        element: <NotFound />
    }
];

export default AppRoutes;
