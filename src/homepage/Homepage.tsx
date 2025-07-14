import Navbar from "../components/headerContent/HeaderComp";
// import Hero from "../components/hero/Hero";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";

function Homepage() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
export default Homepage;
