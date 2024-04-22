import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from '../components/TopBar/TopBar';
import SideBar from '../components/SideBar/SideBar';
import HomePage from '../pages/HomePage/HomePage.jsx';
// import ProfilePage from '../pages/ProfilePage/ProfilePage.jsx';
import ProfilePage from '../pages/ProfilePage/ProfilePage.jsx';
import SettingsPage from '../pages/SettingsPage/SettingsPage.jsx';
import CommunityPage from '../pages/CommunityPage/CommunityPage.jsx';
import Error404Page from '../pages/Error404Page/Error404Page.jsx';

import "./App.scss"





export default function App() {
  return (
    <React.StrictMode>
      <BrowserRouter basenam="/sportsee">
        <TopBar />
        <div className='SideBarAndMainContainer'>
          <SideBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profil/:idSlug"  element={<ProfilePage />} />
            <Route path="/reglage" element={<SettingsPage />} />
            <Route path="/communaute" element={<CommunityPage />} />
            <Route path="*" element={<Error404Page />} />
          </Routes>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  )
}
