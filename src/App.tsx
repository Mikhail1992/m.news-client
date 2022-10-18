import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import Gallery from './components/Gallery/Gallery';
import Layout from './components/Layout';
import ProtectedRoute from './components/PrivateRoute';
import useAuth from './hooks/useAuth';
import Category from './pages/Category';
import CreateArticle from './pages/CreateArticle';
import CreateCategory from './pages/CreateCategory';
import Credentials from './pages/Credentials';
import DraftArticles from './pages/DraftArticles';
import DraftComments from './pages/DraftComments';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import RestorePassword from './pages/RestorePassword';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UpdateArticle from './pages/UpdateArticle';
import Article from './pages/ViewArticle';
import { Roles } from './types/user';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="restore-password" element={<RestorePassword />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="category/:categoryUrl">
          <Route index element={<Category />} />
          <Route path=":articleUrl" element={<Article />}>
            <Route path="image" element={<Gallery />} />
          </Route>
        </Route>
        <Route
          path="draft-articles"
          element={
            <ProtectedRoute user={user} roles={[Roles.ADMIN, Roles.MANAGER]}>
              <DraftArticles />
            </ProtectedRoute>
          }
        />
        <Route
          path="draft-comments"
          element={
            <ProtectedRoute user={user} roles={[Roles.ADMIN, Roles.MANAGER]}>
              <DraftComments />
            </ProtectedRoute>
          }
        />
        <Route
          path="update-article/:articleUrl"
          element={
            <ProtectedRoute user={user} roles={[Roles.ADMIN, Roles.MANAGER]}>
              <UpdateArticle />
            </ProtectedRoute>
          }
        />
        <Route
          path="create-article"
          element={
            <ProtectedRoute user={user} roles={[Roles.ADMIN, Roles.MANAGER]}>
              <CreateArticle />
            </ProtectedRoute>
          }
        />
        <Route
          path="create-category"
          element={
            <ProtectedRoute user={user} roles={[Roles.ADMIN, Roles.MANAGER]}>
              <CreateCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="credentials"
          element={
            <ProtectedRoute user={user} roles={[Roles.ADMIN]}>
              <Credentials />
            </ProtectedRoute>
          }
        />
        <Route path="404" element={<NotFound />} />
      </Route>
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
