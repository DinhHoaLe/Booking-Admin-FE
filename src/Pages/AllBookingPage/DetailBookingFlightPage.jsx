import React, { useEffect, useState } from "react";
import { apiGetAll, apiPatch } from "../../API/APIService";
import { useParams } from "react-router-dom";
import Logo from "../../img/Logo.png";
import VNA from "../../img/logo-vna.svg";
import VJ from "../../img/logo-vietjet.svg";
import JS from "../../img/logo-jetstar.svg";
import BAA from "../../img/logo-bamboo-airways.svg";

const DetailBookingFlightPage = () => {
  const params = useParams();
  const [dataBooking, setDatabooking] = useState({});

  const callApi = async () => {
    try {
      const response = await apiGetAll(`admin-get-booking/${params.bookingId}`);
      setDatabooking(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(dataBooking);

  useEffect(() => {
    callApi();
  }, []);

  const getLogo = () => {
    switch (dataBooking?.objectId?.airlineName) {
      case "Vietnam Airlines":
        return VNA;
      case "VietJet":
        return VJ;
      case "Jetstar Pacific":
        return JS;
      case "Bamboo Airways":
        return BAA;
    }
  };

  return dataBooking ? (
    <div className="flex flex-col items-center">
      <div className="p-3 bg-gray-100 border-black min-w-[1200px] flex flex-col justify-between mt-6">
        {/* Header */}

        {/* Id Info */}
        <div className="bg-white p-6 shadow rounded-lg flex justify-between mb-6 mt-6">
          <div className="flex gap-6">
            <img
              src={Logo}
              alt="Hotel"
              className="w-full h-24 rounded-md object-cover"
            />
          </div>

          <div className="text-right">
            <p className="text-gray-600 text-sm font-bold">
              Booking confirmation
            </p>
            <div className="text-gray-500 text-sm">
              Confirmation code :
              <span className="text-blue-600 font-bold text-lg">
                {" "}
                {dataBooking._id}
              </span>
            </div>
            <div className="text-gray-500 text-sm">
              PIN code:{" "}
              <span className="text-blue-600 font-bold text-lg">
                {dataBooking.pin}
              </span>
            </div>
            <span className="bg-green-500 text-white py-1 px-3 rounded-lg font-semibold text-sm">
              {dataBooking.status}
            </span>
          </div>
        </div>

        {/* Customer Information */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          <div className="flex items-center space-x-4">
            <img
              src={dataBooking?.userId?.avatar}
              alt="Customer Avatar"
              className="w-20 h-20 rounded-full border border-gray-200"
            />
            <div>
              <p className="font-semibold">
                Name : {dataBooking?.userId?.firstName}{" "}
                {dataBooking?.userId?.lastName}
              </p>
              <p>
                {" "}
                <span className="font-semibold">Email : </span>
                {dataBooking?.userId?.email}
              </p>
              <p>
                {" "}
                <span className="font-semibold">Phone : </span>
                {dataBooking?.userId?.phone}
              </p>
              <p>
                {" "}
                <span className="font-semibold">Nationality : </span>
                {dataBooking?.userId?.nationality}
              </p>
              <p>
                <span className="font-semibold">Address : </span>
                {dataBooking?.userId?.address?.street} ,{" "}
                {dataBooking?.userId?.address?.ward} ,{" "}
                {dataBooking?.userId?.address?.district} ,{" "}
                {dataBooking?.userId?.address?.city}{" "}
                {dataBooking?.userId?.address?.country}
              </p>
            </div>
          </div>
        </section>

        {/* Booking Details */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                <span className="font-semibold">Check-in:</span>{" "}
                {dataBooking?.bookingStartDate?.slice(0, 10)}
              </p>

              <p>
                <span className="font-semibold">Check-out:</span>{" "}
                {dataBooking?.bookingEndDate?.slice(0, 10)}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Special Requests:</span>{" "}
                Non-smoking room, High floor
              </p>
              <p>
                <span className="font-semibold">Cancellation Policy:</span> Free
                cancellation before 24 hours
              </p>
            </div>
          </div>
        </section>

        {/* Flight Information */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Flight Information</h2>
          <div className="flex space-x-6">
            <img
              src={getLogo()}
              alt="Hotel"
              className="w-32 h-32 rounded-lg object-cover border border-gray-200"
            />
            <div>
              <p>
                <span className="font-semibold">Airline:</span>{" "}
                {dataBooking?.objectId?.airlineName}
              </p>
              <p>
                <span className="font-semibold">Flight Number:</span>{" "}
                {dataBooking?.objectId?.flightNumber}
              </p>
              <p>
                <span className="font-semibold">Departure Airport:</span>{" "}
                {dataBooking?.objectId?.departureAirport}
              </p>
              <p>
                <span className="font-semibold">Destination Airport:</span>{" "}
                {dataBooking?.objectId?.destinationAirport}
              </p>
              <p>
                <span className="font-semibold">Departure Date:</span>{" "}
                {dataBooking?.objectId?.departureDate?.slice(0, 10)}
              </p>
            </div>
          </div>
        </section>

        {/* Payment Details */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <p>
              <span>Price : </span>
              <span className="font-bold text-xl text-blue-600">
                {" "}
                {dataBooking?.userId?.currency === "usd" && "USD"}{" "}
                {dataBooking?.totalAmount}
              </span>
            </p>

            <p>
              <span className="font-semibold">Paid via:</span> MoMo
            </p>
            <p>
              <span className="font-semibold">Transaction ID:</span>{" "}
              momo_tx_12345
            </p>
            <p>
              <span className="font-semibold">Payment Date:</span> 2024-12-07
            </p>
          </div>
          <h3 className="text-lg font-bold mb-2">Policies</h3>
          <p>
            - Giá cuối cùng được hiển thị là số tiền bạn sẽ thanh toán cho chỗ
            nghỉ.
          </p>
          <p>
            - Booking.com không thu phí khách cho bất kỳ đặt phòng, phí hành
            chính hay bất kỳ chi phí nào khác.
          </p>
          <p>
            - Đơn vị phát hành thẻ của bạn có thể tính phí giao dịch ngoại hối
          </p>
          <h3 className="text-lg font-bold mt-6 mb-2">Information Payment</h3>
          <p>
            - {dataBooking?.objectId?.hotelName} sẽ xử lý tất cả thanh toán.
          </p>
          <h3 className="text-lg font-bold mt-6 mb-2">Notes</h3>
          <p>
            Các khoản phí phụ (nếu có) như giường phụ không được tính trong giá
            tổng cộng này.
          </p>
        </section>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default DetailBookingFlightPage;
