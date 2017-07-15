/**
 * Created by qianqing on 2017/2/14.
 */
export default (Vue, Options = {}) => {
  Vue.directive('inputQuantity', {
    bind: (el, binding) => {
      el.addEventListener('input', () => {
        let value = el.value;
        value = value.replace(/[^\d]/g, '');  // 清除“数字”以外的字符
        value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
        value = value.replace(/([0-9]+\.[0-9]{2})[0-9]*/, '$1');
        el.value = value;
      });
    },
    unbind: (el) => {
      el.removeEventListener('input', undefined);
    }
  });
};
