import React, { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ReloadOutlined } from "@ant-design/icons";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [search, setSearch] = useState("");

  const searchInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full p-6 ">
      <div className="w-full flex items-center justify-between pb-3">
        <div className="flex gap-8">
          <button className="bg-[#F5F6FA] w-10 rounded-2xl hover:bg-[#e5e7eb]">
            <ReloadOutlined />
          </button>
          <input
            type="text"
            className=" p-2 hidden sm:block bg-[#F5F6FA] rounded-2xl"
            placeholder="Search"
            onChange={searchInput}
            value={search}
          />
        </div>
        <div className="flex items-center space-x-4 font-bold italic">
          Email
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Header;
