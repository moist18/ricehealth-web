import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="bg-background text-on-background font-body-md antialiased flex w-full">
      <Sidebar />
      <Outlet />
    </div>
  );
}
