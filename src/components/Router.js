import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Homepage';
import Filter from './filterpage';
import Details from './detail';
import Header from './header';
import { useState, useEffect } from 'react';

const Router = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = () => {
            fetch("http://localhost:5500/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                if (response.status === 200) return response.json();
                throw new Error("Authentication Failed");
            })
            .then((resObject) => {
                setUser(resObject.user);
            })
            .catch((err) => {
                console.log(err);
            });
        };
        getUser();
    }, []);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Filter" element={<Filter />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
