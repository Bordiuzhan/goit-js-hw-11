export function createMarkup(arr) {
  return arr
    .map(
      arr =>
        `<div class="photo-card">
  <img src="${(arr.webformatURL, arr.largeImageURL)}" alt="${
          arr.tags
        }"  loading="lazy" height=100% />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${arr.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${arr.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${arr.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${arr.downloads}
    </p>
  </div>
</div>`
    )
    .join('');
}
