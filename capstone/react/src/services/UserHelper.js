export function isAdmin(user) {
    if (!user || !user.authorities) return false;
    return user.authorities.some((a) => a.name === "ROLE_ADMIN");
  }