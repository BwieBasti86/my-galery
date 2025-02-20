//Import Route-Components later instead
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/views/Home.vue";
import ImageGallery from "./components/views/ImageGallery.vue";
import Guestbook from "./components/views/Guestbook.vue";
import Contact from "./components/views/Contact.vue";
import Imprint from "./components/views/Imprint.vue";
import About from "./components/views/About.vue";
import JobApplicationPdfView from "./components/views/JobApplicationPdfView.vue";
import JobApplicationLetterPdfView from "./components/views/JobApplicationLetterPdfView.vue";
import ConfigurationView from "./components/views/ConfigurationView.vue";

Vue.use(VueRouter);

const routes = [
  {
    id: 1,
    path: "/",
    component: Home,
    name: "Home",
    icon: "mdi-home",
    meta: {
      info: "Home",
    },
  },
  {
    id: 2,
    path: "/about/:category",
    component: About,
    name: "Über mich",
    icon: "mdi-account-tie",
    meta: {
      info:
        "Wer bin ich. Was mach ich. Wohin will ich.",
      subRoutes: ["vita"],
    },
  },
  {
    id: 3,
    path: "/imageGallery/:category",
    component: ImageGallery,
    name: "Gallerie",
    icon: "mdi-camera",
    meta: {
      info:
        "Eines meiner Hobbys ist die Fotografie, hier findest du eine Auswahl einiger meiner besten Schnappschüsse. Viel Spaß beim stöbern!",
      subRoutes: [
        "all",
        "macro",
        "birds",
        "wildlife",
        "pets",
        "insects",
        "plants",
      ],
    },
  },
  {
    id: 4,
    path: "/guestbook",
    component: Guestbook,
    name: "Gästebuch",
    icon: "mdi-book-edit-outline",
    meta: {
      info: "Hinterlass mir doch Feedback. Hier hast du die Möglichkeit dazu",
    },
  },
  {
    id: 5,
    path: "/contact",
    component: Contact,
    name: "Kontakt",
    icon: "mdi-card-account-mail",
    meta: {
      // here
      info:
        "Wenn Du Fragen hast dann schreib mir doch hier",
    },
  },

  {
    id: 6,
    path: "/imprint",
    component: Imprint,
    name: "Impressum",
    icon: "mdi-information",

    meta: {
      // here
      info: "Ein Impressum, Impressive",
    },
  },

  {
    id: 7,
    path: "/jobapplicationtopdf",
    component: JobApplicationPdfView,
    name: "JobApplicationPdfView",
    icon: "mdi-file-pdf-box",

    meta: {
      id:7,
      // here
      info: "Bewerbung als PDF",
    },
  },
  {
    id: 7,
    path: "/jobapplicationlettertopdf",
    component: JobApplicationLetterPdfView,
    name: "JobApplicationLetterPdfView",
    icon: "mdi-file-pdf-box",

    meta: {
      id:8,
      // here
      info: "Bewerbunganschreiben als PDF",
    },
  },
  {
    id: 7,
    path: "/config",
    component: ConfigurationView,
    name: "Konfiguration",
    icon: "mdi-file-cog",

    meta: {
      id:9,
      // here
      info: "Einstellungen für PDF-Generatoren",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
