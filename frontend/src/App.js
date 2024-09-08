// Import hook
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Diagnosis from "./pages/Diagnosis.js";
import Test from "./pages/Test.js";
import "./app.css"
const router = createBrowserRouter([
  { path: "/diagnosis", element: <Diagnosis /> },
  { path: "/test", element: <Test /> },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
