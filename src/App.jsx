import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const DashboardLayout = lazy(() => import("./module/dashboard/DashboardLayout"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const CategoryAddNew = lazy(() => import("./module/category/CategoryAddNew"));
const CategoryManage = lazy(() => import("./module/category/CategoryManage"));
const CategoryUpdate = lazy(() => import("./module/category/CategoryUpdate"));
const PostAddNew = lazy(() => import("./module/post/PostAddNew"));
const PostManage = lazy(() => import("./module/post/PostUpdate"));
const PostUpdate = lazy(() => import("./module/post/PostUpdate"));
const UserAddNew = lazy(() => import("./module/user/UserAddNew"));
const UserManage = lazy(() => import("./module/user/UserManage"));
const UserUpdate = lazy(() => import("./module/user/UserUpdate"));
const UserProfile = lazy(() => import("./module/user/UserProfile"));
const PostDetailsPage = lazy(() => import("./pages/PostDetailsPage"));

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Suspense fallback={<></>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/:slug" element={<PostDetailsPage />} />
            <Route path="/category/:slug" element={<CategoryPage />}></Route>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/manage/category" element={<CategoryManage />} />
              <Route path="/manage/add-category" element={<CategoryAddNew />} />
              <Route path="/manage/update-category" element={<CategoryUpdate />} />
              <Route path="/manage/post" element={<PostManage />} />
              <Route path="/manage/add-post" element={<PostAddNew />} />
              <Route path="/manage/update-post" element={<PostUpdate />} />
              <Route path="/manage/user" element={<UserManage />} />
              <Route path="/manage/add-user" element={<UserAddNew />} />
              <Route path="/manage/update-user" element={<UserUpdate />} />
              <Route path="/profile" element={<UserProfile />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
};

export default App;
