/**
 * Created by qianqing on 2017/2/14.
 */
export default (Vue, Options = {}) => {
  Vue.directive('inputPrice', {
    bind: (el, binding) => {
      el.addEventListener('input', () => {
        let value = el.value;
        value = value.replace(/[^\d.]/g, '');  // 清除“数字”和“.”以外的字符
        value = value.replace(/^\./g, '');  // 验证第一个字符是数字而不是.
        value = value.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的.
        value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(.*\..{2}).*$/, '$1');
        el.value = value;
      });
    },
    unbind: (el, binding) => {
      el.removeEventListener('input', undefined);
    }
  });
};
