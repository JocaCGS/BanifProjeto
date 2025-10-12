// React Router
import { createBrowserRouter, Navigate} from "react-router-dom"
import Login from './pages/login'
import Home from './pages/home'
import HomeGerente from "./pages/homegerente"

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Navigate to="/login" replace />
    },
    {
        path: "/login", 
        element: <Login />,
    },
     {
        path: "/home", 
        element: <Home />,
    },
    {
        path: "/homegerente", 
        element: <HomeGerente />,
    },
    
])

export default router