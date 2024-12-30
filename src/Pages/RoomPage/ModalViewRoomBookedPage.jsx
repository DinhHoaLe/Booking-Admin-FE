import React, { useEffect, useState } from "react";
import { Modal, Descriptions, Alert, Drawer, message } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "react-toastify/dist/ReactToastify.css";
import { apiGetAll } from "../../API/APIService";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

dayjs.extend(utc);
dayjs.extend(timezone);

const ModalViewRoomBookedPage = ({ openModal, selected }) => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleCancel = () => {
    openModal(false);
  };

  const callApi = async () => {
    try {
      const response = await apiGetAll(
        `admin-get-all-booking-by-roomId/${selected._id}`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selected) {
      callApi();
    }
  }, [selected]);

  const formatEvents = () => {
    return data.map((booking) => {
      return {
        title: `Booked: ${dayjs
          .utc(booking.bookingStartDate)
          .format("HH:mm")} → ${dayjs
          .utc(booking.bookingEndDate)
          .format("HH:mm")}`,
        start: booking.bookingStartDate,
        end: booking.bookingEndDate,
        backgroundColor: "#07689F",
        borderColor: "#07689F",
        extendedProps: {
          customerName: booking?.contactInfo?.name,
          customerPhone: booking?.contactInfo?.phone,
          customerEmail: booking?.contactInfo?.email,
          totalAmount: booking?.totalAmount,
        },
      };
    });
  };

  const handleEventClick = (info) => {
    setEventDetails({
      title: info.event.title,
      start: dayjs(info.event.start).format("HH:mm DD/MM/YYYY"),
      end: dayjs(info.event.end).format("HH:mm DD/MM/YYYY"),
      customerName: info.event.extendedProps.customerName,
      customerPhone: info.event.extendedProps.customerPhone,
      customerEmail: info.event.extendedProps.customerEmail,
      totalAmount: info.event.extendedProps.totalAmount,
    });
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setEventDetails(null);
  };

  return (
    <Modal
      title="Room Information"
      open={true}
      onCancel={handleCancel}
      width={1400}
      bodyStyle={{
        maxHeight: "65vh",
        overflowY: "auto",
        padding: "20px",
      }}
    >
      {/* Hiển thị thông tin phòng */}
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="Hotel Name">
          {selected?.hotelId?.hotelName || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Room ID">
          {selected?._id || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Room Name">
          {selected?.roomName || "N/A"}
        </Descriptions.Item>
      </Descriptions>

      {/* Lịch FullCalendar */}
      <div style={{ marginTop: "20px" }}>
        <Alert
          message={`You selected date: ${
            selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : "None"
          }`}
          type="info"
          showIcon
          style={{ marginBottom: "10px" }}
        />
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          // timeZone="Asia/Ho_Chi_Minh"
          timeZone="UTC"
          initialView="timeGridWeek"
          nowIndicator={true}
          editable={true}
          selectable={true}
          height="600px"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek,timeGridDay,dayGridMonth",
          }}
          events={formatEvents()} // Gắn dữ liệu booking vào lịch
          dateClick={(info) => {
            setSelectedDate(info.dateStr);
          }}
          eventClick={handleEventClick}
        />
      </div>
      <Drawer
        title="Event Details"
        placement="bottom"
        closable={true}
        onClose={closeDrawer}
        open={drawerVisible}
        height={230}
      >
        {eventDetails ? (
          <div className="flex justify-center gap-10">
            <div>
              <p>
                <strong>Title:</strong> {eventDetails.title}
              </p>
              <p>
                <strong>Start:</strong> {eventDetails.start}
              </p>
              <p>
                <strong>End:</strong> {eventDetails.end}
              </p>
            </div>
            <div>
              <p>
                <strong>Customer Name:</strong>{" "}
                {eventDetails.customerName || "N/A"}
              </p>
              <p>
                <strong>Customer Phone:</strong>{" "}
                {eventDetails.customerPhone || "N/A"}
              </p>
              <p>
                <strong>Customer Email:</strong>{" "}
                {eventDetails.customerEmail || "N/A"}
              </p>
              <p>
                <strong>Price:</strong> {eventDetails.totalAmount || "N/A"}
              </p>
            </div>
          </div>
        ) : (
          <p>No event details available.</p>
        )}
      </Drawer>
    </Modal>
  );
};

export default ModalViewRoomBookedPage;
