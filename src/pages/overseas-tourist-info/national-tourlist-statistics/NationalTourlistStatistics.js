import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { portNameMap } from "../../../lib/changeNames";
import { fetchOverseasTouristData } from "../../../store/tourist-info-slice/touristInfoSlice";
import styles from "./NationalTourlistStatistics.module.scss";
import ChartRadar from "../../../components/chart/ChartRadar";
import ChartPyramid from "../../../components/chart/ChartPyramid";

const year = new Date().getFullYear();
const month = new Date().getMonth() - 1;
const now = `${year}${String(month).padStart(2, "0")}`;
const ym = `${year}-${String(month).padStart(2, "0")}`;

function NationalTourlistStatistics() {
  const [changeYm, setChangeYm] = useState(ym); // input용
  const [yearMonth, setYearMonth] = useState(now); // url용
  const [selectPort, setSelectPort] = useState("GP");

  const { touristStatsData } = useSelector((state) => state.tourlistInfoSlice);
  console.log(touristStatsData);

  const dispatch = useDispatch();

  const handleChangePort = (e) => {
    setSelectPort(e.target.value);
  };

  const handleChangeYm = (e) => {
    const value = e.target.value; // input용
    const ym = value.split("-").join(""); // url용

    setChangeYm(value);
    setYearMonth(ym);
  };

  useEffect(() => {
    dispatch(
      fetchOverseasTouristData({ yyyymm: yearMonth, portCode: selectPort })
    );
  }, [dispatch, selectPort, yearMonth]);

  // const transformTouristDataForRadar = (touristData) => {
  //   const labels = [...new Set(touristData.map((item) => item.ageCd))];
  //   const maleData = labels.map((age) => {
  //     const data = touristData.find(
  //       (item) => item.ageCd === age && item.gender === "M"
  //     );
  //     return data ? data.num : 0;
  //   });
  //   const femaleData = labels.map((age) => {
  //     const data = touristData.find(
  //       (item) => item.ageCd === age && item.gender === "F"
  //     );
  //     return data ? data.num : 0;
  //   });

  //   return {
  //     labels,
  //     datasets: [
  //       { label: "Male", data: maleData },
  //       { label: "Female", data: femaleData },
  //     ],
  //   };
  // };

  // const chartData = touristStatsData
  //   ? transformTouristDataForRadar(touristStatsData)
  //   : null;

  const transformTouristDataForPyramid = (touristData) => {
    // 연령대를 라벨로 사용
    const labels = [...new Set(touristData.map((item) => item.ageCd))];

    // 남성 데이터
    const maleData = labels.map((age) => {
      const data = touristData.find(
        (item) => item.ageCd === age && item.gender === "M"
      );
      return data ? data.num : 0;
    });

    // 여성 데이터
    const femaleData = labels.map((age) => {
      const data = touristData.find(
        (item) => item.ageCd === age && item.gender === "F"
      );
      return data ? data.num : 0;
    });

    return { labels, maleData, femaleData };
  };
  const chartData = touristStatsData
    ? transformTouristDataForPyramid(touristStatsData)
    : null;

  return (
    <div className={styles.container}>
      <h3>국민해외관광객통계</h3>
      <select name="" id="" onChange={handleChangePort}>
        {Object.entries(portNameMap).map(([key, value]) => (
          <option value={key} key={key}>
            {value}
          </option>
        ))}
      </select>
      <input type="month" value={changeYm} onChange={handleChangeYm} />
      <div>
        <div>{portNameMap[selectPort]}</div>
        {touristStatsData?.map((data, idx) => (
          <div key={idx}>
            {data.ageCd !== "99" && (
              <>
                <div>
                  {data.ageCd}대 / {data.gender === "M" ? "남성" : "여성"} /{" "}
                  {data.num}명
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <ChartPyramid data={chartData} />
      {/* <ChartRadar data={chartData} /> */}
    </div>
  );
}

export default NationalTourlistStatistics;
