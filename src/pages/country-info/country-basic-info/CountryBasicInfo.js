import cn from 'classnames';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomModal from '../../../components/layout/custom-modal/CustomModal';
import styles from './CountryBasicInfo.module.scss';

function CountryBasicInfo({
  basicData,
  travelAlarm,
  dangMap,
  flagUrl,
  className,
}) {
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const travelAlarmColor = (alarm) => {
    if (alarm.includes('1단계')) {
      return styles.attention;
    } else if (alarm.includes('2단계')) {
      return styles.refrainment;
    } else if (alarm.includes('3단계')) {
      return styles.recommendation;
    } else if (alarm.includes('4단계')) {
      return styles.forbid;
    } else if (alarm === 'normal') {
      return styles.normal;
    } else {
      return styles.specialAadvisory;
    }
  };

  return (
    <div className={cn(styles.basicInfo, className)}>
      <div className={styles.flag}>
        <img src={flagUrl || null} alt="" />
      </div>
      <div className={styles.locationInfo}>
        <span>[{basicData?.continent}]</span>
        <h2>{basicData?.countryName}</h2>
        <h3>{basicData?.countryEnName}</h3>
        {/* 여행 경보 */}
        <div className={styles.travelAlarm}>
          {pathname === '/' ? (
            <span
              className={cn(
                styles.alarm,
                travelAlarmColor(travelAlarm || 'normal')
              )}
              onClick={handleOpen}
            >
              {travelAlarm || '여행경보단계 조회'}
            </span>
          ) : (
            <>
              <button
                className={cn(
                  styles.alarm,
                  travelAlarmColor(travelAlarm || 'normal')
                )}
                onClick={handleOpen}
              >
                {travelAlarm || '여행경보단계 조회'}
              </button>
              <CustomModal isOpen={isOpen} handleClose={handleClose}>
                <div className={styles.dangMap}>
                  <img src={dangMap} alt="" />
                </div>
              </CustomModal>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryBasicInfo;
