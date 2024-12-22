import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slide/userSlice";
import tourReducer from "./Slide/tourSlice";
import hotelReducer from "./Slide/hotelSlice";
import allHotelReducer from "./Slide/allHotelSlice";
import addressReducer from "./Slide/addressSlice";
import flightReducer from "./Slide/flightSlice";
import bookingReducer from "./Slide/bookingSlice";
import roomsReducer from "./Slide/roomSlice";
import reviewsReducer from "./Slide/reviewSlice";
import promotionReducer from "./Slide/promotionSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    hotels: hotelReducer,
    address: addressReducer,
    flights: flightReducer,
    tours: tourReducer,
    allHotels: allHotelReducer,
    booking: bookingReducer,
    rooms: roomsReducer,
    reviews: reviewsReducer,
    promotion: promotionReducer,
  },
});

export default store;
