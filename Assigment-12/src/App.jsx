import { Outlet } from "react-router-dom"
import NavBar from "./Pages/Shared/NavBar/NavBar"
import Footer from "./Pages/Shared/Footer/Footer"
import { motion, useScroll } from "framer-motion"


function App() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div style={{
        scaleX: scrollYProgress,
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        height: 10,
        background: "purple",
        transformOrigin: '0%',
        zIndex:100
      }} />
      <div className="" >
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default App
