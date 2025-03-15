import actions from "~/actions";

export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    await actions.auth.fetchUser();
  } catch (error) {
    console.log(error);
  }
});
