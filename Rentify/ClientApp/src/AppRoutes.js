import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { NotFound } from "./components/NotFound";

import ObjectTypesList from './components/object-types/View';
import ObjectTypesForm from './components/object-types/Form';

import ObjectsList from './components/objects/View';
import ObjectView from './components/objects/SingleView';
import ObjectsForm from './components/objects/Form';

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
        path: '/owned-objects',
        element: <ObjectsList ownership="true" />
    },
    {
        path: '/rented-objects',
        element: <ObjectsList ownership="false" />
    },
    {
        path: '/objects/create',
        element: <ObjectsForm formType="create" />
    },
    {
        path: '/object-type/:objectTypeId/object/:objectId/edit',
        element: <ObjectsForm formType="edit" />
    },
    {
        path: '/object-type/:objectTypeId/object/:objectId',
        element: <ObjectView />
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
