//Defines routes for the Initial View & User View
import { Routes, Route } from 'react-router-dom';
import Home from './components/MainView';
import User from './components/UserView';
const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user/:id' element={<User />} />
        </Routes>
    );
}
export default Main;