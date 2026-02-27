/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import AccountDeletion from './pages/AccountDeletion';
import AdminDashboard from './pages/AdminDashboard';
import FindRides from './pages/FindRides';
import FooterAdmin from './pages/FooterAdmin';
import FounderDirectory from './pages/FounderDirectory';
import FounderProfile from './pages/FounderProfile';
import Home from './pages/Home';
import MyBookings from './pages/MyBookings';
import MyTrips from './pages/MyTrips';
import PostTrip from './pages/PostTrip';
import Profile from './pages/Profile';
import PublicRoutes from './pages/PublicRoutes';
import Routes from './pages/Routes';
import Settings from './pages/Settings';
import SuggestRoute from './pages/SuggestRoute';
import Wallet from './pages/Wallet';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AccountDeletion": AccountDeletion,
    "AdminDashboard": AdminDashboard,
    "FindRides": FindRides,
    "FooterAdmin": FooterAdmin,
    "FounderDirectory": FounderDirectory,
    "FounderProfile": FounderProfile,
    "Home": Home,
    "MyBookings": MyBookings,
    "MyTrips": MyTrips,
    "PostTrip": PostTrip,
    "Profile": Profile,
    "PublicRoutes": PublicRoutes,
    "Routes": Routes,
    "Settings": Settings,
    "SuggestRoute": SuggestRoute,
    "Wallet": Wallet,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};