import axios from "axios";

/**
 * Service lấy dữ liệu từ các API
 */
export const fetchCarData = async () => {
  try {
    const carVersionsResponse = await axios.get("http://localhost:3000/carVer");
    console.log("Fetched car data:", response.data);
    return carVersionsResponse.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu carVer:", error);
    throw new Error("Không thể lấy dữ liệu carVer");
  }
};

export const fetchRateData = async () => {
  try {
    const ratesResponse = await axios.get("http://localhost:3000/rate");
    console.log("Fetched rate data:", response.data);
    return ratesResponse.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu rate:", error);
    throw new Error("Không thể lấy dữ liệu rate");
  }
};
