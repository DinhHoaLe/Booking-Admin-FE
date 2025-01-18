import React, { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ReloadOutlined, DownCircleOutlined } from "@ant-design/icons";
import { Avatar, Input, Typography, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../Redux/Slide/infoUserSlice";

function Header() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const { infor, status } = useSelector((state) => state.inforUser);
  console.log(status);
  const searchInput = (e) => {
    setSearch(e.target.value);
  };
  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserInfo());
    }
  }, [status, dispatch]);

  return (
    <div className="w-full p-6 ">
      <div className="w-full flex items-center justify-between pb-3">
        <div className="flex gap-5">
          <button className="bg-[#F5F6FA] w-10 rounded-2xl hover:bg-[#e5e7eb]">
            <ReloadOutlined />
          </button>
          <Input
            type="text"
            className="hidden sm:block bg-[#F5F6FA] rounded-2xl"
            placeholder="Search"
            onChange={searchInput}
            value={search}
          />
        </div>
        <div className="flex items-center space-x-4 font-bold italic">
          <div> {infor?.email}</div>
          <div
            style={{
              textAlign: "center",
              // marginBottom: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar size={50} src={infor?.avatar} />
          </div>
          <DownCircleOutlined />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Header;
