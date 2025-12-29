import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LinkTreeView from "./views/LinkTreeView";
import ProfileView from "./views/ProfileView";

export default function Router(){

    return(
        
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView/>} />
                    <Route path="/auth/register" element={<RegisterView/>} />
                </Route>
                <Route path="/admin" element={<AppLayout />}> //si quieres que laguno de los hijo tenga esta ruta adminse usa path="/admin"
                <Route index = {true} element={<LinkTreeView/>}/>// y el index es para que sea la ruta por defecto la del padre
                <Route path="profile" element={<ProfileView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>

    )
}
