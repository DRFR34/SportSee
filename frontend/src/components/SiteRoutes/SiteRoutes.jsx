import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../../pages/HomePage/HomePage.jsx';
import ProfilePage from '../../pages/ProfilePage/ProfilePage.jsx';
import SettingsPage from '../../pages/SettingsPage/SettingsPage.jsx';
import CommunityPage from '../../pages/CommunityPage/CommunityPage.jsx';
import Error404Page, { p404Options } from '../../pages/Error404Page/Error404Page.jsx';

/**
 * Component for rendering the site routes.
 * @returns {JSX.Element.Component} The site routes component.
 */
export default function SiteRoutes() {

    return (
        <>
            <Routes>

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/profil/:idSlug"
                    element={<ProfilePage />}
                />

                <Route
                    path="/reglage"
                    element={<SettingsPage />}
                />

                <Route
                    path="/communaute"
                    element={<CommunityPage />}
                />

                {/* ***Error 404 customized pages*** */}
                <Route
                    path="*"
                    element={<Error404Page />}
                />

                <Route
                    path="/profil/"
                    element={
                        <Error404Page
                            errorText={p404Options.opt1.errorText}
                            homeLinkText={p404Options.opt1.homeLinkText}
                        />
                    } />

            </Routes>
        </>
    )
}
