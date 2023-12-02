import Gwangalli from '../../public/spot/광안리.jpg';
import Namsan from '../../public/spot/남산타워.png';
import Temple from '../../public/spot/해동용궁사.jpg';
import Nodeul from '../../public/spot/노들섬.png';
import Donggung from '../../public/spot/동궁과월지.png';

import Spot from '../../type/spot';

const spots: Spot[] = [
  {
    id: 1,
    latitude: 35.15330166749557,
    longitude: 129.119064488961,
    spotLevel: 4,
    spotName: '광안리 해수욕장',
    spotImage: Gwangalli,
    spotTag: ['부산', '바다', '광안대교'],
    spotInfo:
      '광안리 해수욕장은 부산의 대표적인 해변으로, 광안대교의 아름다운 불빛과 함께 밤에 더욱 아름답습니다. 백사장과 맑은 바다가 특징이며, 다양한 레스토랑과 상점들이 주변에 자리하고 있어 해변가를 즐기기에 좋습니다. 해안도로를 따라 산책하거나 수영을 즐기는 등 다양한 활동이 가능합니다.',
  },
  {
    id: 2,
    latitude: 37.5512675794077,
    longitude: 126.98823628636346,
    spotLevel: 4,
    spotName: '남산 타워',
    spotImage: Namsan,
    spotTag: ['남산', '서울', '남산서울타워'],
    spotInfo:
      '광안리 해수욕장은 부산의 대표적인 해변으로, 광안대교의 아름다운 불빛과 함께 밤에 더욱 아름답습니다. 백사장과 맑은 바다가 특징이며, 다양한 레스토랑과 상점들이 주변에 자리하고 있어 해변가를 즐기기에 좋습니다. 해안도로를 따라 산책하거나 수영을 즐기는 등 다양한 활동이 가능합니다.',
  },
  {
    id: 3,
    latitude: 35.18843609680439,
    longitude: 129.22326911628673,
    spotLevel: 4,
    spotName: '해동용궁사',
    spotImage: Temple,
    spotTag: ['부산', '자연', '절'],
    spotInfo:
      '해동용궁사는 부산에 위치한 아름다운 절로, 해운대 해수욕장과 가까이 있어 많은 사람들에게 찾아지는 곳입니다. 용궁사 내에는 고즈넉한 분위기와 아름다운 정원, 다양한 문화유산들이 자리하고 있어 방문객들에게 평온한 시간을 선사합니다.',
  },
  {
    id: 4,
    latitude: 37.51866834339457,
    longitude: 126.9555305703854,
    spotLevel: 4,
    spotName: '노들섬',
    spotImage: Nodeul,
    spotTag: ['서울', '한강', '노을'],
    spotInfo:
      '노들섬은 한강에 위치한 작은 섬으로, 서울 시내에서도 가까운 자연의 휴식처입니다. 노을이 아름답게 내리쬐는 곳으로 유명하며, 섬 주변에는 자전거 도로와 산책로가 구비되어 있어 휴식과 운동을 즐길 수 있습니다.',
  },
  {
    id: 5,
    latitude: 35.83477603881743,
    longitude: 129.2269876843237,
    spotLevel: 4,
    spotName: '동궁과월지',
    spotImage: Donggung,
    spotTag: ['경주', '아경', '신라'],
    spotInfo:
      '동궁과 월지는 경주에 위치한 신라 왕국의 궁궐로, 아름다운 정원과 건물들이 자리하고 있습니다. 동궁은 신라의 궁궐 중 하나로, 월지는 궁전 앞의 아름다운 연못을 지칭합니다. 이곳은 신라시대의 역사와 아름다움을 간직하고 있어 역사와 문화를 즐기기에 좋은 장소입니다.',
  },
];

export default spots;
