// 예전에 실습하면서 만든 함수인데 이번 프로젝트에서 써볼 수 있을까 싶어서 가져온 거
// 나중에 없앨지도
const COLORS = {
  purple: '#d19fe9',
  green: '#7cd9c2',
  yellow: '#f7d16f',
};

function getProductColor(code = '000') {
  const firstCode = code.charAt(0);
  switch (firstCode) {
    case 3:
    case 9:
      return COLORS.green;
    case 5:
      return COLORS.yellow;
    case 1:
    case 7:
    case 8:
    default:
      return COLORS.purple;
  }
}

export default getProductColor;