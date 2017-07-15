/**
 * Created by qianqing on 2017/3/27.
 */
export default {
  methods: {
    jump (url, replace = false) {
      if (/^javas/.test(url) || !url) {
        return;
      }

      let useRouter = typeof url === 'object' || (this.$router && typeof url === 'string' && !/http/.test(url));
      if (useRouter) {
        if (!replace) {
          this.$router.push(url);
        } else {
          this.$router.replace(url);
        }
      } else {
        if (!replace) {
          window.location.href = url;
        } else {
          window.location.replace(url);
        }
      }
    },
    getUrl(url) {
      // Make sure the href is right in hash mode
      if (this.$router && !this.$router._history && typeof url === 'string' && !/http/.test(url)) {
        return `#!${url}`;
      }
      return url && typeof url !== 'object' ? url : 'javascript:void(0);';
    }
  }
};
