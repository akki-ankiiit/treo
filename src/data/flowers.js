const posters = {
  '01': '6a4afbe9f3a19844a4b0caed_bougainvillea-flowers_01.avif',
  '02': '6a4afbe941e5e917a8f84c4a_bougainvillea-flowers_02.avif',
  '03': '6a4afbe988f8dc3c9bb1647a_bougainvillea-flowers_03.avif',
  '04': '6a4afbe98eb07b9ca5b07e84_bougainvillea-flowers_04.avif',
  '05': '6a4afbe9a4873ec6185f295d_bougainvillea-flowers_05.avif',
  '06': '6a4afbe968be0cc0c1f5fef2_bougainvillea-flowers_06.avif',
  '07': '6a4afbe9f3a19844a4b0caf0_bougainvillea-flowers_07.avif',
};

export const flowers = Object.fromEntries(Object.entries(posters).map(([id, poster]) => [id, {
  poster: `/assets/images/${poster}`,
  webm: `/assets/videos/bougainvillea-flowers_${id}.webm`,
  mov: `/assets/videos/bougainvillea-flowers_${id}.mov`,
}]));
