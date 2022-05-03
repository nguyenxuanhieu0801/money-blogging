import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import DashboardLayout from "./module/dashboard/DashboardLayout";
import PostAddNew from "./module/post/PostAddNew";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  return (
    <>
      
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/*" element={<NotFoundPage />} />
          {/* <Route path="/:slug" element={<PostDetailsPage />} /> */}
          <Route element={<DashboardLayout />}>
            {/* <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/manage/post" element={<PostManage />} /> */}
            <Route path="/manage/add-post" element={<PostAddNew />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
