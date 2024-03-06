export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore();
  if (!store.isLogged) return navigateTo("/login");
});
