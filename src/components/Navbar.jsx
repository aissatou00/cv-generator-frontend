import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const CustomNavbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold">
                    CV Generator
                </Link>

                {/* Navigation Links */}
                <div className="flex space-x-4 items-center">
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="hover:underline">
                                Dashboard
                            </Link>
                            <div className="relative group">
                                <button className="flex items-center space-x-2 hover:underline">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>{user.name || "User"}</span>
                                </button>
                                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg hidden group-hover:block">
                                    <button
                                        onClick={logout}
                                        className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                                    >
                                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline">
                                Login
                            </Link>
                            <Link to="/register" className="hover:underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default CustomNavbar;
