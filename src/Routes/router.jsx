import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main.jsx";
import Dashboardskeleton from "../Components/SkeletonDashboard/Dashboardskeleton.jsx";
import InventoryTable from "../Components/InventoryTable/InventoryTable.jsx";
import Hero from "../Components/Home/Hero.jsx";
import Projectpage from "../Components/Home/Projectpage.jsx";
import Postpage from "../Components/Home/Postpage.jsx";
export const router = createBrowserRouter([
    
    {
        path : '/',
        element : <Main></Main>,
        errorElement : <h2 className="text-center">Unexpected Error :)</h2>,
        children : [
            {
                path : '/',
                element :
                   
                <Hero/>
            
            },

            {
                path : '/dashboard',
                element : <Dashboardskeleton></Dashboardskeleton>
            },
            {
                path : '/projects',
                element :<Projectpage/>,
            },
            {
                path : '/postpage/:postId',
                element :<Postpage/>
            },
            {
                path : '/inventory',
                element : <InventoryTable></InventoryTable>
            },

            ]
        
        }])



