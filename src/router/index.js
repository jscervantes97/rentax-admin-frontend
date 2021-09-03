import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "",
      component: () => import("@/layouts/App.vue"),
      children: [
        {
          path: "/login",
          name: "login",
          component: () => import("@/views/Login.vue")
        }
      ]
    },
    {
      path: "",
      component: () => import("@/layouts/Main.vue"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/views/Dashboard.vue")
        },
        {
          path: "/add-development",
          name: "Add development",
          component: () => import("@/views/Add-development.vue") 
        },
        {
          path: "/developments",
          name: "developments",
          component: () => import("@/views/Developments.vue")
        },
        {
          path: "/commercial",
          name: "developments",
          component: () => import("@/views/CommercialAreas.vue")
        },
        {
          path: "/contactRequests",
          name: "contactRequests",
          component: () => import("@/views/ContactRequests.vue")
        },
        {
          path: "/goods",
          name: "goods",
          component: () => import("@/views/Goods.vue")
        },
        {
          path: "/placesAndOffices",
          name: "placesAndOffices",
          component: () => import("@/views/PlacesAndOfices.vue")
        },
        {
          path: "/galery",
          name: "galery",
          component: () => import("@/views/GaleryProjects.vue")
        },
        {
          path: "/edit-development/:id",
          name: "edit-development",
          component: () => import("@/views/Edit-development.vue"),
        },
        {
          path: "/properties",
          name: "properties",
          component: () => import("@/views/Properties.vue")
        },
        {
          path: "/add-property",
          name: "add-property",
          component: () => import("@/views/Add-property.vue")
        },
        {
          path: "/edit-property/:id",
          name: "edit-property",
          component: () => import("@/views/Edit-property.vue"),
        },
        {
          path: "/main-banner",
          name: "main-banner",
          component: () => import("@/views/Main-banner.vue")
        },
        {
          path: "/add-main-banner",
          name: "add-main-banner",
          component: () => import("@/views/Add-main-banner.vue")
        },
        {
          path: "/edit-main-banner/:id",
          name: "edit-main-banner",
          component: () => import("@/views/Edit-main-banner.vue")
        },
        {
          path: "/vacancies",
          name: "vacancies",
          component: () => import("@/views/Vacancies.vue")
        },
        {
          path: "/add-vacancy",
          name: "add-main-banner",
          component: () => import("@/views/Add-vacancy.vue")
        },
        {
          path: "/edit-vacancy/:id",
          name: "edit-vacancy",
          component: () => import("@/views/Edit-vacancy.vue")
        },
        {
          path: "/blog",
          name: "blog",
          component: () => import("@/views/Blog.vue")
        },
        {
          path: "/add-post",
          name: "add-post",
          component: () => import("@/views/Add-post.vue")
        },
        {
          path: "/edit-post/:id",
          name: "edit-post",
          component: () => import("@/views/Edit-post.vue")
        },
        {
          path: "/reward",
          name: "reward",
          component: () => import("@/views/Reward.vue")
        },
        {
          path: "/reviews",
          name: "reviews",
          component: () => import("@/views/Reviews.vue")
        },
        {
          path: "/add-testimony",
          name: "add-review",
          component: () => import("@/views/Add-review.vue")
        },
        {
          path: "/add-placeOfice",
          name: "add-placeOfice",
          component: () => import("@/views/Add-centerOfice.vue")
        },
        {
          path: "/add-proyect",
          name: "add-proyect",
          component: () => import("@/views/Add-proyect.vue")
        }
      ]
    }
  ]
})
