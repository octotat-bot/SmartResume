import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-surface-1">
            <Sidebar />
            <main className="flex-1 ml-64">
                {children}
            </main>
        </div>
    );
};

export default Layout;
