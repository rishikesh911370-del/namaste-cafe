const menuItems = [

  // Rolls
  { id: 1, name: "Veg Roll", price: 69, category: "Rolls", veg: true, image : "https://wbcdn.in/assets/img/uploads/mywb/uploads/img_44c15b4eec6898693ccf5c2e58e2eece47f06385.jpg" },
  { id: 2, name: "Paneer Roll", price: 89, category: "Rolls", veg: true, image : "https://th.bing.com/th/id/OIP.kzDGD3zZVbBQv2hZ7egqmQHaE8?w=272&h=182&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 3, name: "Double Paneer Roll", price: 109, category: "Rolls", veg: true, image:"https://media.istockphoto.com/id/1400256817/photo/mix-vegetable-kathi-roll.jpg?b=1&s=170667a&w=0&k=20&c=I6WVFXliBY2Wm_PGZdT5US3p8h_FHqX57Q4m1DB9x0M=" },
  { id: 4, name: "Egg Roll", price: 99, category: "Rolls", veg: false, image:"https://wallpapercave.com/wp/wp10113627.jpg" },
  { id: 5, name: "Double Egg Roll", price: 119, category: "Rolls", veg: false, image:"https://orders.popskitchen.in/storage/2024/09/image-298.png" },
  { id: 6, name: "Chicken Roll", price: 109, category: "Rolls", veg: false, image:"https://media.istockphoto.com/id/1352473088/photo/fresh-chicken-tikka-roll-with-fresh-tomatos-salad-cheese-and-onions-isolated-on-bright-blue.webp?b=1&s=170667a&w=0&k=20&c=m9LQXfCgCOdHslKmRZ2Pni6sdMTXzQCTEuaKEk4pOTI=" },
  { id: 7, name: "Double Chicken Roll", price: 129, category: "Rolls", veg: false, image:"https://img.freepik.com/premium-photo/tandoori-chicken-stuffed-pita-pockets-with-tzatziki_1169880-40658.jpg" },
  { id: 8, name: "Single Egg Chicken Roll", price: 129, category: "Rolls", veg: false, image:"https://tse4.mm.bing.net/th/id/OIP.Vsk9ApTgRGOaOjNvKPiy-gHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 9, name: "Double Egg Double Chicken Roll", price: 149, category: "Rolls", veg: false, image:"https://th.bing.com/th/id/R.756797dea6db7ebdba8460d734e49d82?rik=lT4YStn5yHeCbg&riu=http%3a%2f%2fspicyworld.in%2frecipeimages%2fbhuna-chicken-roll.jpg&ehk=fqUtcbt6Rd2j2BjhyAP7qj8l1ZDUPDNF%2fg4Zx96rZHU%3d&risl=&pid=ImgRaw&r=0" },

  // Thali
{ id: 106, name: "Veg Thali", price: 179, category: "Thali", veg: true,image:"/images/Veg Thali.jpeg"},
{ id: 107, name: "Chicken Thali", price: 199, category: "Thali", veg: false,image:"/images/Chicken Thali.jpeg" },
{ id: 108, name: "Veg Deluxe Thali", price: 279, category: "Thali", veg: true,image:"/images/Veg Deluxe Thali.jpeg" },
{ id: 109, name: "Chicken Deluxe Thali", price: 299, category: "Thali", veg: false,image:"/images/Chicken Deluxe Thali.jpeg" },




  // Biryani
{ id: 110, name: "Veg Biryani", price: 259, category: "Biryani", veg: true,image:"https://tse2.mm.bing.net/th/id/OIP.MOlAdGwdw_k_zP7GjLp5WgHaFl?w=530&h=400&rs=1&pid=ImgDetMain&o=7&rm=3" },
{ id: 111, name: "Chicken Biryani", price: 289, category: "Biryani", veg: false,image:"https://static.vecteezy.com/system/resources/thumbnails/038/970/604/small_2x/ai-generated-chicken-biryani-in-a-shiny-silver-bowl-spicy-curry-and-aromatic-flavors-authentic-indian-food-serving-fancy-food-in-a-restaurant-photo.jpg" },


  // Snacks & Pasta
  { id: 10, name: "French Fries", price: 139, category: "Snacks & Pasta", veg: true, image:"https://tse1.mm.bing.net/th/id/OIP.r6fDfWkbqrTDpv-WmWQHoAHaF7?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 11, name: "Masala French Fries", price: 159, category: "Snacks & Pasta", veg: true, image:"https://recipewithraimens.com/wp-content/uploads/2024/12/Overhead-birds-eye-view-photograph-of-masala-french-fries-recipe-in-warm-golden-hour-light-top-down-perspective-soft-light-just-after-sunrise-or-before-sunset-emphasizing-textures-and-details.jpg" },
 { id: 24, name: "Chicken Rice Paper Dumplings", price: 219, category: "Snacks & Pasta", veg: false, image:"https://th.bing.com/th/id/OSK.cd7419fae8bb9bedd1e546076fa8c257?w=424&h=424&c=7&rs=1&qlt=90&o=6&dpr=1.3&pid=16.1" },
  { id: 25, name: "Veg Rice Paper Dumplings", price: 189, category: "Snacks & Pasta", veg: true, image:"https://th.bing.com/th/id/OSK.3660a0409df1adcd517c59ae885eede6?w=424&h=424&c=7&rs=1&qlt=90&o=6&dpr=1.3&pid=16.1" },
  { id: 26, name: "Paneer Bhurjee Dumplings", price: 199, category: "Snacks & Pasta", veg: true, image: "https://i.ytimg.com/vi/PkupKkSDcBk/oardefault.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&rs=AOn4CLDGfga85UGtQTAUHMon71T9t8XUqw" },
  { id: 12, name: "Arrabbiata Red Sauce Pasta", price: 229, category: "Snacks & Pasta", veg: true, image:"https://nummyrecipes.com/wp-content/uploads/2025/10/Arrabiata-Recipe-Pasta.jpg" },
  { id: 13, name: "Alfredo White Sauce Pasta", price: 239, category: "Snacks & Pasta", veg: true, image:"https://cookingwithcasey.com/assets/images/1742358496409-ajvfa0wd.webp" },
  { id: 14, name: "Makhani Sauce Pasta", price: 219, category: "Snacks & Pasta", veg: true, image:"https://blogger.googleusercontent.com/img/a/AVvXsEgRx_b-sgo1cY_h5UyJd1kFfZ6rYBOuxjH6_V53mB2YzW6ydb4NeZESq-0tjhqgkGTIUroGUJ7shb5vLZ6TPVeB1RmhLRCVg--BdO4oQTAs07tYYRTrSk7iK1nWa4XBQgaE-yLEwKDasQUwlWhUtV92miR5C5-k3aGS6foPHAMQsEXIgFWWD0uXvP7C" },
  { id: 15, name: "Teriyaki Chicken Pasta", price: 299, category: "Snacks & Pasta", veg: false, image:"https://media.istockphoto.com/photos/chicken-and-pork-teriyaki-picture-id1303170868?b=1&k=20&m=1303170868&s=170667a&w=0&h=rinOQhbbCAVXyiuxcDjaaoUu8mQYdpLLRFkRhAqqcRM=" },
  { id: 16, name: "Mixed Murg Pasta", price: 269, category: "Snacks & Pasta", veg: false, image:"https://media.istockphoto.com/id/2039788884/photo/chicken-alfredo-penne-creamy-pasta-wich-parmesan-cheese-in-a-white-plate-on-a-brown-napkin.webp?a=1&b=1&s=612x612&w=0&k=20&c=SNCKopbMf-L3sdTOBmzKZ8gswdEwyI0qAjiJLnVebjQ=" },

  // Burgers & Sandwich
  { id: 17, name: "Aloo Tikki Burger", price: 89, category: "Burgers & Sandwich", veg: true, image:"https://plus.unsplash.com/premium_photo-1684534125391-9e01a39570d2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 18, name: "Veg Burger", price: 109, category: "Burgers & Sandwich", veg: true, image:"https://images.unsplash.com/photo-1603064752734-4c48eff53d05?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 19, name: "Paneer Burger", price: 139, category: "Burgers & Sandwich", veg: true, image:"https://plus.unsplash.com/premium_photo-1664392112262-271039647be9?q=80&w=1050&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 20, name: "Monster Chicken Burger", price: 159, category: "Burgers & Sandwich", veg: false, image:"https://images.unsplash.com/photo-1637710847214-f91d99669e18?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpY2tlbiUyMGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 21, name: "Veg Grilled Sandwich", price: 99, category: "Burgers & Sandwich", veg: true, image:"https://plus.unsplash.com/premium_photo-1738802845911-809a01acfa50?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnJTIwc2FuZHdpY2h8ZW58MHx8MHx8fDA%3D" },
  { id: 22, name: "Paneer Grilled Sandwich", price: 149, category: "Burgers & Sandwich", veg: true, image:"https://images.unsplash.com/photo-1709689155464-90d6ca1e9f62?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBhbmVlciUyMHNhbmR3aWNofGVufDB8fDB8fHww" },
  { id: 23, name: "Chicken Keema Sandwich", price: 189, category: "Burgers & Sandwich", veg: false, image:"https://images.unsplash.com/photo-1666819604716-7b60a604bb76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hpY2tlbiUyMHNhbmR3aWNofGVufDB8fDB8fHww" },

  // Maggi & Ramen
  { id: 27, name: "Veg Maggi", price: 99, category: "Maggi & Chowmein", veg: true, image:"https://images.unsplash.com/photo-1692273212247-f5efb3fc9b87?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  { id: 28, name: "Cheese Maggi", price: 139, category: "Maggi & Chowmein", veg: true, image:"https://i.pinimg.com/originals/80/16/1a/80161a59100fc7271a92ace5d0b0d5f0.jpg"},
  { id: 29, name: "Egg Maggi", price: 129, category: "Maggi & Chowmein", veg: false, image:"https://images.unsplash.com/photo-1603033172872-c2525115c7b9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  { id: 30, name: "Korean Veg Ramen", price: 139, category: "Maggi & Chowmein", veg: true, image:"https://tse3.mm.bing.net/th/id/OIP.vxLbW85XEzy6wqeuMwpngAHaKX?w=1400&h=1960&rs=1&pid=ImgDetMain&o=7&rm=3"},
  { id: 31, name: "Korean Egg Ramen", price: 149, category: "Maggi & Chowmein", veg: false, image:"https://tse4.mm.bing.net/th/id/OIP.mM7ckrTboEuWVRAGEAi9fwHaLH?rs=1&pid=ImgDetMain&o=7&rm=3" },

  // Chowmein
  { id: 32, name: "Veg Chowmein Half", price: 99, category: "Maggi & Chowmein", veg: true, image:"https://images.unsplash.com/photo-1617622141573-2e00d8818f3f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 33, name: "Veg Chowmein Full", price: 149, category: "Maggi & Chowmein", veg: true, image:"https://images.unsplash.com/photo-1617622141573-2e00d8818f3f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 34, name: "Paneer Chowmein Half", price: 119, category: "Maggi & Chowmein", veg: true, image:"https://media.istockphoto.com/id/1092999718/photo/schezwan-hakka-noodles-with-paneer-or-cottage-cheese-served-in-a-bowl-selective-focus.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZjEhcxqVynQ1nIgCIbbtYmFNGq1tbRcp6fzM3Wykx_Q=" },
  { id: 35, name: "Paneer Chowmein Full", price: 169, category: "Maggi & Chowmein", veg: true, image:"https://media.istockphoto.com/id/1092999718/photo/schezwan-hakka-noodles-with-paneer-or-cottage-cheese-served-in-a-bowl-selective-focus.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZjEhcxqVynQ1nIgCIbbtYmFNGq1tbRcp6fzM3Wykx_Q=" },
  { id: 36, name: "Egg Chowmein Half", price: 129, category: "Maggi & Chowmein", veg: false, image:"https://images.unsplash.com/photo-1600326145359-3a44909d1a39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGVnZyUyMGNob3dtZWlufGVufDB8fDB8fHww" },
  { id: 37, name: "Egg Chowmein Full", price: 169, category: "Maggi & Chowmein", veg: false, image:"https://images.unsplash.com/photo-1600326145359-3a44909d1a39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGVnZyUyMGNob3dtZWlufGVufDB8fDB8fHww" },
  { id: 38, name: "Chicken Chowmein Half", price: 139, category: "Maggi & Chowmein", veg: false, image:"https://images.unsplash.com/photo-1769690507359-98ad7820b1bb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 39, name: "Chicken Chowmein Full", price: 189, category: "Maggi & Chowmein", veg: false, image:"https://images.unsplash.com/photo-1769690507359-98ad7820b1bb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  // Chinese
  { id: 40, name: "Chilli Paneer (Half)(4pc)", price: 149, category: "Chinese", veg: true, image:"https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFuZWVyJTIwY2hpbGxpfGVufDB8fDB8fHww" },
  { id: 41, name: "Chilli Paneer (Full) (8pc)", price: 239, category: "Chinese", veg: true, image:"https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFuZWVyJTIwY2hpbGxpfGVufDB8fDB8fHww" },
  { id: 42, name: "Mushroom Chilli (Half)", price: 129, category: "Chinese", veg: true, image:"https://images.unsplash.com/photo-1716535232842-d10da4eb33d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaHJvb20lMjBjaGlsbGl8ZW58MHx8MHx8fDA%3D" },
  { id: 43, name: "Mushroom Chilli (Full)", price: 199, category: "Chinese", veg: true,image:"https://images.unsplash.com/photo-1716535232842-d10da4eb33d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaHJvb20lMjBjaGlsbGl8ZW58MHx8MHx8fDA%3D" },
  { id: 44, name: "Veg Manchurian (Half)(4pc)", price: 129, category: "Chinese", veg: true, image:"https://media.istockphoto.com/id/1208081969/photo/veg-manchurian-very-popular-chinese-snack-popular-in-india.jpg?s=612x612&w=0&k=20&c=-h2IX5DsT3el_Ryk4x9Hyj_amGzFF077AaRLCyXEh60=" },
  { id: 45, name: "Veg Manchurian (Full)(8pc)", price: 189, category: "Chinese", veg: true, image:"https://media.istockphoto.com/id/1208081969/photo/veg-manchurian-very-popular-chinese-snack-popular-in-india.jpg?s=612x612&w=0&k=20&c=-h2IX5DsT3el_Ryk4x9Hyj_amGzFF077AaRLCyXEh60=" },
  { id: 46, name: "Baby Corn Chilli (Half)", price: 149, category: "Chinese", veg: true, image:"https://aayanshkitchen.com/wp-content/uploads/2024/01/Chilli-Baby-Corn-1536x864.jpg" },
  { id: 47, name: "Baby Corn Chilli (Full)", price: 229, category: "Chinese", veg: true, image:"https://aayanshkitchen.com/wp-content/uploads/2024/01/Chilli-Baby-Corn-1536x864.jpg" },
  { id: 48, name: "Chilli Chicken (Half)(4pc)", price: 169, category: "Chinese", veg: false, image:"https://images.unsplash.com/photo-1644677859434-21ccfcdd3eab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 49, name: "Chilli Chicken (Full)(8pc)", price: 259, category: "Chinese", veg: false, image:"https://images.unsplash.com/photo-1644677859434-21ccfcdd3eab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 50, name: "Mini Chicken Lollipop (6pc)", price: 209, category: "Chinese", veg: false, image:"https://images.unsplash.com/photo-1766589220977-143f5cba3f22?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  { id: 51, name: "Kings Chicken Lollipop(6pc)", price: 310, category: "Chinese", veg: false, image:"https://images.unsplash.com/photo-1766589221509-61951995e435?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  // Indian Veg
  { id: 52, name: "Paneer Masala (Half)", price: 179, category: "Indian Veg", veg: true, image: "https://media.istockphoto.com/id/2160428229/photo/vertical-photo-of-paneer-butter-masala.webp?b=1&s=612x612&w=0&k=20&c=Wgqo3OvXpOGk9PjsykzB83S3n7zqBcCn0In3ElVkUq4=" },
  { id: 53, name: "Paneer Masala (Full)", price: 299, category: "Indian Veg", veg: true, image: "https://media.istockphoto.com/id/2160428229/photo/vertical-photo-of-paneer-butter-masala.webp?b=1&s=612x612&w=0&k=20&c=Wgqo3OvXpOGk9PjsykzB83S3n7zqBcCn0In3ElVkUq4=" },
  { id: 54, name: "Lasooni Paneer (Half)", price: 169, category: "Indian Veg", veg: true, image:"https://tse4.mm.bing.net/th/id/OIP.lDd1Ki2qrbbDvkmlq7QXBgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 55, name: "Lasooni Paneer (Full)", price: 299, category: "Indian Veg", veg: true, image:"https://tse4.mm.bing.net/th/id/OIP.lDd1Ki2qrbbDvkmlq7QXBgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 56, name: "Paneer Kadhai (Half)", price: 169, category: "Indian Veg", veg: true, image:"https://wallpapercave.com/wp/wp13998812.jpg"},
  { id: 57, name: "Paneer Kadhai (Full)", price: 299, category: "Indian Veg", veg: true, image:"https://wallpapercave.com/wp/wp13998812.jpg"},
  { id: 58, name: "Paneer Butter Masala (Half)", price: 189, category: "Indian Veg", veg: true, image:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  { id: 59, name: "Paneer Butter Masala (Full)", price: 309, category: "Indian Veg", veg: true, image:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  { id: 60, name: "Paneer Lababdar (Half)", price: 179, category: "Indian Veg", veg: true, image:"https://i.pinimg.com/originals/1c/83/f7/1c83f794cf7327f94b41631b7414cd77.jpg"},
  { id: 61, name: "Paneer Lababdar (Full)", price: 299, category: "Indian Veg", veg: true, image:"https://i.pinimg.com/originals/1c/83/f7/1c83f794cf7327f94b41631b7414cd77.jpg"},
  { id: 62, name: "Mushroom Kadhai (Half)", price: 169, category: "Indian Veg", veg: true, image:"https://www.vegrecipesofindia.com/wp-content/uploads/2018/12/kadai-mushroom-1a.jpg" },
  { id: 63, name: "Mushroom Kadhai (Full)", price: 289, category: "Indian Veg", veg: true, image:"https://www.vegrecipesofindia.com/wp-content/uploads/2018/12/kadai-mushroom-1a.jpg" },
  { id: 64, name: "Mushroom Masala (Half)", price: 169, category: "Indian Veg", veg: true, image:"https://tse3.mm.bing.net/th/id/OIP.kvx-pK1MDqpRURPO1ht0MgHaG_?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 65, name: "Mushroom Masala (Full)", price: 289, category: "Indian Veg", veg: true, image:"https://tse3.mm.bing.net/th/id/OIP.kvx-pK1MDqpRURPO1ht0MgHaG_?rs=1&pid=ImgDetMain&o=7&rm=3" },

  // Indian Non Veg
  { id: 66, name: "Chicken Ghee Roast (Half)", price: 189, category: "Indian Non-Veg", veg: false, image:"https://tse4.mm.bing.net/th/id/OIP.9yEnlD22r1t94cSt1QI82gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 67, name: "Chicken Ghee Roast (Full)", price: 329, category: "Indian Non-Veg", veg: false, image:"https://tse4.mm.bing.net/th/id/OIP.9yEnlD22r1t94cSt1QI82gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 68, name: "Chicken Patiala (Half)", price: 189, category: "Indian Non-Veg", veg: false, image:"https://tse1.mm.bing.net/th/id/OIP.8M8U71GVJ1jUUlM_IboTOAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 69, name: "Chicken Patiala (Full)", price: 329, category: "Indian Non-Veg", veg: false, image:"https://tse1.mm.bing.net/th/id/OIP.8M8U71GVJ1jUUlM_IboTOAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 70, name: "Chicken Masala (Half)", price: 179, category: "Indian Non-Veg", veg: false, image:"https://images.unsplash.com/photo-1694579740719-0e601c5d2437?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  { id: 71, name: "Chicken Masala (Full)", price: 309, category: "Indian Non-Veg", veg: false, image:"https://images.unsplash.com/photo-1694579740719-0e601c5d2437?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  { id: 72, name: "Chicken Kadhai (Half)", price: 189, category: "Indian Non-Veg", veg: false, image:"https://images.unsplash.com/photo-1708782344490-9026aaa5eec7?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 73, name: "Chicken Kadhai (Full)", price: 309, category: "Indian Non-Veg", veg: false, image:"https://images.unsplash.com/photo-1708782344490-9026aaa5eec7?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 74, name: "Chicken Butter Masala (Half)", price: 199, category: "Indian Non-Veg", veg: false, image:"https://images.unsplash.com/photo-1683533738338-19b9a22c6405?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 75, name: "Chicken Butter Masala (Full)", price: 339, category: "Indian Non-Veg", veg: false, image:"https://images.unsplash.com/photo-1683533738338-19b9a22c6405?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  // Bread & Rice
  { id: 76, name: "Butter Roti", price: 25, category: "Bread & Rice", veg: true, image:"https://plus.unsplash.com/premium_photo-1675382377431-d0e28a0e87da?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 77, name: "Lachha Paratha", price: 40, category: "Bread & Rice", veg: true, image:"https://tse3.mm.bing.net/th/id/OIP.Upb45sHuk1vVQ-_aEXJKUQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 78, name: "Egg Lachha Paratha", price: 55, category: "Bread & Rice", veg: false, image:"https://tse3.mm.bing.net/th/id/OIP.Hfxq__q6cTINsuVttm1utgHaFS?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 79, name: "Plain Steam Rice", price: 89, category: "Bread & Rice", veg: true, image:"https://plus.unsplash.com/premium_photo-1675814316651-3ce3c6409922?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 80, name: "Veg Fried Rice", price: 149, category: "Bread & Rice", veg: true, image:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 81, name: "Paneer Fried Rice", price: 189, category: "Bread & Rice", veg: true, image:"https://images.unsplash.com/photo-1751618646882-4221d5e3b1c2?q=80&w=1030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 82, name: "Egg Fried Rice", price: 209, category: "Bread & Rice", veg: false, image:"https://images.unsplash.com/photo-1642972420043-4736c570a716?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 83, name: "Chicken Fried Rice", price: 229, category: "Bread & Rice", veg: false, image:"https://plus.unsplash.com/premium_photo-1664475934279-2631a25c42ce?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  // Combos
  { id: 84, name: "Veg Burger + French Fries + Coke(250ml)", price: 269, category: "Combos", veg: true, image:"https://tse3.mm.bing.net/th/id/OIP.O55TwCx52jyhwqnejDDLGgHaHK?w=1300&h=1258&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 85, name: "Chicken Burger + French Fries + Coke(250ml)", price: 289, category: "Combos", veg: false, image:"https://img.freepik.com/premium-photo/tasty-fresh-burger-fries-coke-wood-table_488220-60466.jpg" },
  { id: 86, name: "Veg Fried Rice + Paneer Chilli", price: 259, category: "Combos", veg: true, image:"https://i.pinimg.com/736x/5f/7f/b5/5f7fb56c815b4bd76ace9776fc06c3b2.jpg" },
  { id: 87, name: "Veg Fried Rice + Veg Manchurian", price: 249, category: "Combos", veg: true, image:"https://product-assets.faasos.io/production/product/image_1664188834371_veg_schezwan_fried_rice_and_veg_manchurian_gravy.jpg" },
  { id: 88, name: "Veg Fried + Mushroom Chilli", price: 249, category: "Combos", veg: true, image:"https://tse2.mm.bing.net/th/id/OIP.spVuSvZOiUUKfMyqm2NlhwHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 89, name: "Veg Fried Rice + Chicken Chilli", price: 259, category: "Combos", veg: false, image:"https://tse3.mm.bing.net/th/id/OIP.K7ELhzFD_mWRxGk7z9C-9AAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 90, name: "egg Fried Rice + Chicken Chilli", price: 279, category: "Combos", veg: false, image:"https://i.pinimg.com/originals/d7/93/06/d7930696452eca4067b64fdb57c2ce78.jpg" },

  // Beverages

  { id: 96, name: "Classic Cold Coffee", price: 129, category: "Beverages", veg: true, image:"https://plus.unsplash.com/premium_photo-1690212143534-aff93264082b?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 97, name: "Vanilla Cold Coffee", price: 139, category: "Beverages", veg: true, image:"https://plus.unsplash.com/premium_photo-1663933534262-5de49eb4f59f?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 98, name: "Caramel Cold Coffee", price: 149, category: "Beverages", veg: true, image:"https://images.unsplash.com/photo-1662047102608-a6f2e492411f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 99, name: "Hazelnut Cold Coffee", price: 159, category: "Beverages", veg: true, image:"https://images.unsplash.com/photo-1724198218799-19e4be9c439a?q=80&w=1084&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  
  { id: 102, name: "Mint Mojito", price: 129, category: "Beverages", veg: true,image:"https://images.unsplash.com/photo-1761472385306-b1a60316d405?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWludCUyMG1vY2t0YWlsfGVufDB8fDB8fHww" },
  { id: 103, name: "Strawberry Mocktail", price: 129, category: "Beverages", veg: true,image:"https://images.unsplash.com/photo-1755234985438-f27ee87f077b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHN0cmF3YmVycnltb2NrdGFpbHxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 104, name: "Rose Lemonade", price: 129, category: "Beverages", veg: true, image:"https://images.unsplash.com/photo-1636298961986-4fa5d2aba98c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJvc2UlMjBtb2NrdGFpbHxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 105, name: "Blue Lagoon", price: 139, category: "Beverages", veg: true,image:"https://plus.unsplash.com/premium_photo-1663011520373-084c36a3a522?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGJsdWUlMjBtb2NrdGFpbHxlbnwwfHwwfHx8MA%3D%3D" },

  { id: 91, name: "Oreo Shake", price: 149, category: "Beverages", veg: true, image:"https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  { id: 92, name: "KitKat Shake", price: 159, category: "Beverages", veg: true, image:"https://images.unsplash.com/photo-1714799263245-4fc7cc21911e?q=80&w=1099&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 93, name: "Vanilla Shake", price: 119, category: "Beverages", veg: true, image:"https://plus.unsplash.com/premium_photo-1695868328902-b8a3b093da74?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 94, name: "Mango Shake", price: 149, category: "Beverages", veg: true, image:"https://images.unsplash.com/photo-1525385133512-2f3bdd039054?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 95, name: "Falooda Shake", price: 169, category: "Beverages", veg: true, image:"https://tse3.mm.bing.net/th/id/OIP.S7ZTYCpmIzYheM1UfG3vlQHaK6?rs=1&pid=ImgDetMain&o=7&rm=3" },

];

export default menuItems;
