import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Diagnosis from "./pages/Diagnosis.js";
import Test from "./pages/Test.js";
import Login from "./pages/Login.js";
import ProtectedRoute from "./components/ProtectedRoute"; // Đường dẫn tới file ProtectedRoute
import "./app.css";
import { useState } from "react"; // Import useState
import {useSelector, useDispatch} from "react-redux"; // Import useSelector và useDispatch
const App = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Lấy giá trị isLoggedIn từ store

  const router = createBrowserRouter([
    { path: "/", element: <Login/> }, // Truyền hàm đăng nhập vào Login
    {
      path: "/diagnosis",
      element: <ProtectedRoute element={<Diagnosis />} isLoggedIn={isLoggedIn} />,
    },
    {
      path: "/test",
      element: <ProtectedRoute element={<Test />} isLoggedIn={isLoggedIn} />,
    },
  ]);

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
