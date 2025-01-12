// src/components/layout/Navbar.js
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
      <nav className="py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-[#ECE5F0]">Finhealth</Link>
              <div className="relative ml-4">
                <input
                  type="search"
                  placeholder="Search"
                  className="w-64 px-4 py-2 bg-[#2B2F3A] text-[#ECE5F0] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2191FB] placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <Link to="/invest" className="text-[#ECE5F0] hover:text-[#2191FB] transition-colors">
                Invest
              </Link>
              <Link to="/features" className="text-[#ECE5F0] hover:text-[#2191FB] transition-colors">
                Features
              </Link>
              <Link to="/blogs" className="text-[#ECE5F0] hover:text-[#2191FB] transition-colors">
                Blogs
              </Link>
              <Link to="/pricing" className="text-[#ECE5F0] hover:text-[#2191FB] transition-colors">
                Pricing
              </Link>
              <Link 
                to="/login" 
                className="text-[#ECE5F0] px-6 py-2 rounded-lg border border-[#2191FB] hover:bg-[#2191FB]/10 transition-all"
              >
                Log In
              </Link>
              <Link 
                to="/register"
                className="bg-[#2191FB] text-[#ECE5F0] px-6 py-2 rounded-lg hover:bg-[#2191FB]/90 transition-all"
              >
                Open Demat Account
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
};

export default Navbar;