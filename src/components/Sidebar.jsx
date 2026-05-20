import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getLinkClasses = ({ isActive }) => 
    isActive
      ? "bg-primary-container text-on-primary-container rounded-lg mx-2 my-1 px-4 py-3 flex items-center gap-3 scale-95 transition-transform"
      : "text-on-primary/70 mx-2 my-1 px-4 py-3 flex items-center gap-3 hover:bg-primary-container/20 transition-colors duration-200 rounded-lg group";

  const getIconClasses = (isActive) =>
    `material-symbols-outlined ${isActive ? "icon-fill" : ""}`;
    
  const getTextClasses = (isActive) =>
    `font-title-md text-title-md text-[15px] ${isActive ? "font-bold" : ""}`;

  return (
    <aside className="w-[280px] h-screen fixed left-0 top-0 bg-primary dark:bg-primary-container shadow-lg z-50 flex flex-col justify-between py-6">
      <div>
        {/* Brand Header */}
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
            <span className="material-symbols-outlined text-primary icon-fill">eco</span>
          </div>
          <div>
            <h1 className="text-title-md font-title-md text-on-primary font-bold">RiceHealth</h1>
            <p className="text-label-sm font-label-sm text-on-primary/70">
              {user?.role === 'admin' ? 'Admin' : 'User'} - {user?.username}
            </p>
          </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex flex-col gap-1">
          <NavLink to="/" end className={getLinkClasses}>
            {({ isActive }) => (
              <>
                <span className={getIconClasses(isActive)}>home</span>
                <span className={getTextClasses(isActive)}>Beranda</span>
              </>
            )}
          </NavLink>
          <NavLink to="/dataset" className={getLinkClasses}>
            {({ isActive }) => (
              <>
                <span className={getIconClasses(isActive)}>dataset</span>
                <span className={getTextClasses(isActive)}>Dataset</span>
              </>
            )}
          </NavLink>
          <NavLink to="/segmentasi" className={getLinkClasses}>
            {({ isActive }) => (
              <>
                <span className={getIconClasses(isActive)}>grid_view</span>
                <span className={getTextClasses(isActive)}>Segmentasi</span>
              </>
            )}
          </NavLink>
          <NavLink to="/ndvi" className={getLinkClasses}>
            {({ isActive }) => (
              <>
                <span className={getIconClasses(isActive)}>layers</span>
                <span className={getTextClasses(isActive)}>NDVI</span>
              </>
            )}
          </NavLink>
          <NavLink to="/perbandingan" className={getLinkClasses}>
            {({ isActive }) => (
              <>
                <span className={getIconClasses(isActive)}>bar_chart</span>
                <span className={getTextClasses(isActive)}>Perbandingan Wilayah</span>
              </>
            )}
          </NavLink>
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="px-2 mt-auto">
        <button 
          onClick={handleLogout}
          className="w-full text-on-primary/70 px-4 py-3 flex items-center gap-3 hover:bg-primary-container/20 transition-colors duration-200 rounded-lg group cursor-pointer"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-title-md text-title-md text-[15px]">Logout</span>
        </button>
      </div>
    </aside>
  );
}
