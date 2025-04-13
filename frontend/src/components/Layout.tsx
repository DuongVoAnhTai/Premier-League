import Navbar from "./Navbar";

//TypeScript interface for props that component Layout get
interface LayoutProps {
    children: React.ReactNode;
}
//declare component Layout (function component React.FC)
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto-p-4">
                {children}
            </main>
        </div>
    )
}

export default Layout;