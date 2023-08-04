import {Routes,Route} from "react-router-dom"
import HomePage from "../Pages/HomePage"
import Signup from "../Pages/Signup"
import Login from '../Pages/Login'
import ForgetPass from '../Pages/ForgetPass'
import PrivateRouter from "./PrivateRouter"
import ProductsPage from "../Pages/ProductsPage"
import SingleProduct from "../Pages/SingleProduct"
import PaymentsPage from "../Pages/PaymentsPage"
import CheckoutPage from "../Pages/CheckoutPage"
import UserBookings from "../Pages/UserBookings"
import AdminPage from "../Pages/AdminPage"
import PropertyListing from "../Pages/PropertyListing"
import LoaderPage from "../Pages/LoaderPage"
import SuccessPayment from "../Pages/SuccessPayment"
import MapContainer from "../Components/MapContainer"
import Updatepassword from "../Pages/Updatepassword"
import OwnerPortal from "../Pages/OwnerPortal"
import AddHostel from "../Components/AddHostel"
import Addroom from "../Components/AddRoom"
import Help from '../Pages/Help'
import About from '../Pages/About'
import Admin from "../Pages/Admin"
import UserTable from "../Pages/Admin/UserTable"
import OwnerTable from "../Pages/Admin/OwnerTable"
import HostelTable from "../Pages/Admin/HostelTable"
import BookingTable from "../Pages/Admin/BookingTable"
export default function Allroutes(){
    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/forgetpass" element={<ForgetPass/>}/>
            <Route path="/updatepass" element={<Updatepassword/>}/>
            <Route path='/products' element={<ProductsPage/>}/>
            <Route path='/singleproduct' element={<SingleProduct/>}/>
            <Route path='/checkout' element={<CheckoutPage/>}/>
            <Route path='/payment' element={<PaymentsPage/>}/>
            <Route path='/admin' element={<AdminPage/>}/>
            <Route path='/map' element={<MapContainer/>}/>
            <Route path='/owner' element={<OwnerPortal/>}/>
            <Route path='/addhostel' element={<AddHostel/>}/>
            <Route path='/help' element={<Help/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/addroom' element={<Addroom/>}/>
            <Route path='/userbookings' element={<UserBookings/>}/>
            {/* <Route path='/propertylist' element={<PropertyListing/>}/> */}
            <Route path='/loader' element={<LoaderPage/>}/>
            <Route path='/paymentdone' element={<SuccessPayment/>   }/>
            <Route path='/adminDash' element={<Admin/>}/>
            <Route path='/userList' element={<UserTable/>}/>
            <Route path='/ownerlist' element={<OwnerTable/>}/>
            <Route path='/hostellist' element= {<HostelTable />}/>
            <Route path='/bookinglist' element={<BookingTable/>}/>

        </Routes>
    )
}