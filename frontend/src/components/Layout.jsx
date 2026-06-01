import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-canvas">
            <Sidebar />
            <main className="flex-1 min-h-screen bg-surface-1 pb-14 md:pb-0 md:pl-[56px]">
                <div className="p-4 md:p-10 max-w-full">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
