import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth-context";
import PageNotFound from "../../pages/PageNotFound";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 40px;
      color: ${(props) => props.theme.primary};
      letter-spacing: 1px;
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
  }
`;
const DashboardLayout = ({ children }) => {
  const { userInfo } = useAuth();
  if (!userInfo) return <PageNotFound />;
  return (
    <DashboardStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <Sidebar />
        <Outlet />
        <div className="dashboard-children"></div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
