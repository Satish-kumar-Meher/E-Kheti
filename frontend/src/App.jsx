import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { ErrorPage } from "./pages/Erorr";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import EmailVerificationPage from "./pages/auth/EmailVerification";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import { ProfilePage } from "./pages/Profile";
import { EditProfile } from "./pages/EditProfile";
import { MainFeaturesPage } from "./pages/MainFeaturesPage";
import WeatherBox from "./components/layout/WeatherBox";
import ProtectedRoutes from "./pages/ProtectedRoutes";
// import SessionCheck from "./pages/SessionCheck";


const router = createBrowserRouter([
  {
    path: "/",
    element:<AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verify-otp",
        element: <EmailVerificationPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage/>,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPasswordPage/>,
      },
      // {
      //   path: "/chatbot",
      //   element: <Chatbot/>,
      // },
      {
        path: "/profile/:id",
        element: <ProtectedRoutes> <ProfilePage/></ProtectedRoutes>
      },
      {
        path: "/editprofile",
        element: <ProtectedRoutes> <EditProfile/></ProtectedRoutes>
      },
      {
        path: "/features",
        element: <ProtectedRoutes> <MainFeaturesPage/> </ProtectedRoutes>
      },
      {
        path: "/weather",
        element: <ProtectedRoutes> <WeatherBox/></ProtectedRoutes>
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}> </RouterProvider>;
};

export default App;