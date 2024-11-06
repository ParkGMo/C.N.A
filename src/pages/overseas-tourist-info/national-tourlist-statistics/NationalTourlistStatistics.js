import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { portNameMap } from "../../../lib/changeNames";
import { fetchOverseasTouristData } from "../../../store/tourist-info-slice/touristInfoSlice";

const year = new Date().getFullYear();
const month = new Date().getMonth() - 1;
const now = `${year}${String(month).padStart(2, "0")}`;
const ym = `${year}-${String(month).padStart(2, "0")}`;

function NationalTourlistStatistics() {
  const [changeYm, setChangeYm] = useState(ym);
  const [yearMonth, setYearMonth] = useState(now);
  const [selectPort, setSelectPort] = useState("GP");

  const { touristStatsByAgeData, touristStatsByGenderData } = useSelector(
    (state) => state.tourlistInfoSlice
  );
  console.log(touristStatsByAgeData);

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

  return (
    <div>
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
        {touristStatsByAgeData?.map((data, idx) => (
          <div key={idx}>
            {data.ageCd !== "99" && (
              <>
                <div>
                  {data.ageCd}대 / {data.gender} / {data.num}명
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NationalTourlistStatistics;
