const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/longterm",
        component: () => import("pages/LongTerm.vue"),
        name: "LongTerm",
      },
      {
        path: "/work",
        component: () => import("pages/workPage/WorkIndex.vue"),
        name: "WorkIndex",
      },
      {
        path: "/work/about",
        component: () => import("pages/workPage/AboutUs.vue"),
        name: "AboutUs",
      },
      {
        path: "/work/research",
        component: () => import("pages/workPage/ResearchPage.vue"),
        name: "ResearchPage",
      },
      {
        path: "/work/field",
        component: () => import("pages/workPage/FieldObservation.vue"),
        name: "FieldObservation",
      },
      {
        path: "/work/interview",
        component: () => import("pages/workPage/InterviewPage.vue"),
        name: "InterviewPage",
      },
      {
        path: "/work/learning",
        component: () => import("pages/workPage/LearningNote.vue"),
        name: "LearningNote",
      },

      {
        path: "/instant/:id/:name/:number",
        component: () => import("pages/instantPage/InstantPage.vue"),
        name: "InstantPage",
      },

      {
        path: "/longterm/:id/:name/:number",
        component: () => import("pages/longTermPicture/LongtermPicture.vue"),
        name: "LongtermPicture",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
