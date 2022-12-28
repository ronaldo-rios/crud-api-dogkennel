import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Components:
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'
import Message from './components/layout/Message'

//Pages:
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'
import Profile from './components/pages/Users/Profile'
import MyPets from './components/pages/Pets/MyPets'
import AddPet from './components/pages/Pets/AddPet'
import EditPet from './components/pages/Pets/EditPet'
import PetDetails from './components/pages/Pets/PetDetails'

// Context:
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Message />
        <Container >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users/profile" element={<Profile />} />
            <Route path="/pets/mypets" element={<MyPets />} />
            <Route path="/pets/add" element={<AddPet />} />
            <Route path="/pets/edit/:id" element={<EditPet />} />
            <Route path="/pets/:id" element={<PetDetails />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </ Container>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
