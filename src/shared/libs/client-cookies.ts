import jscookie from "js-cookie";

const clientCookies = () => {
  return {
    get(key: string) {
      const cookie = jscookie.get(key);
      if (!cookie) return null;
      return cookie;
    },
    set(key: string, value: any, options: Cookies.CookieAttributes = {}) {
      jscookie.set(key, JSON.stringify(value), options);
    },
    delete(key: string) {
      jscookie.remove(key);
    },
  };
};

export default clientCookies;
