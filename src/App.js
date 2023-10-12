
import { Route, Routes } from "react-router-dom"
import Home from "./routes/home/Home.component";
import Navigation from "./routes/navigation/Navigation.component";
import SignIn from "./routes/sign-in/SignIn.component";



const App = () => {
  return(
    <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/signin" element={<SignIn />}/>
        </Route>
    </Routes>
)
};

const Shop = () => {
  return(
    <>SHop compomonne</>
  )
}

export default App;
