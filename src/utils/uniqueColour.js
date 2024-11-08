// 문자열을 색상으로 변환하는 함수
// 문자열을 -> 코드화 -> RGB화 시키는 과정  == 고유한 단어에 특정색을 부여한다.
export const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash); // 문자열을 해시화
  }

  // 해시 값을 사용해 색상을 생성
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;
  const alpha = 0.5;
  return `rgb(${r}, ${g}, ${b}, ${alpha})`;
};
