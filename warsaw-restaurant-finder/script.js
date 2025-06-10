const restaurants = [
  {
    name: "N31 by Robert Sowa",
    image: "https://n31restaurant.pl/assets/images/gallery/1.jpg", // Prefer official or royalty-free images
    desc: "N31 by Robert Sowa is an authorial restaurant by master chef Robert Sowa. Enjoy traditional Polish cuisine with international influences, crafted with top-quality ingredients in an elegant, modern setting.",
    link: "https://n31restaurant.pl/en"
  },
  {
    name: "Rozbrat 20",
    image: "https://www.rozbrat20.com/wp-content/uploads/2021/09/rozbrat20-restaurant-warsaw.jpg", // Official site or Unsplash
    desc: "Rozbrat 20 offers a refined, seasonal menu inspired by modern European cuisine. Known for its intimate atmosphere and creative dishes, it's a must-visit for food lovers in Warsaw.",
    link: "https://www.rozbrat20.com/"
  },
  {
    name: "Soul Kitchen",
    image: "https://soulkitchen.pl/wp-content/uploads/2023/01/soulkitchen-restaurant.jpg", // Official site
    desc: "Soul Kitchen is a cozy bistro in the heart of Warsaw, serving contemporary Polish and European dishes in a warm, welcoming environment. Perfect for a casual yet elegant dining experience.",
    link: "https://soulkitchen.pl/"
  }
];

// Example render function for your HTML
const container = document.querySelector('.restaurant-list');
restaurants.forEach(r => {
  container.innerHTML += `
    <div class="restaurant-card">
      <img src="${r.image}" class="restaurant-image" alt="${r.name}">
      <div class="restaurant-content">
        <h2 class="restaurant-title">${r.name}</h2>
        <p class="restaurant-desc">${r.desc}</p>
        <a href="${r.link}" class="restaurant-link" target="_blank">Visit website</a>
      </div>
    </div>
  `;
});
