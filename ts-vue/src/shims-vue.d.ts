/** 此文件主要用于TypeScript识别.vue文件，Ts默认并不支持导入vue文件
 * 这个文件告诉Ts导入.vue文件都按VueConstructor<Vue>处理
 */
declare module '*.vue' { // 扩展模块
  // 告诉TypeScript以.vue后缀的文件可以交给vue模块来处理
  import Vue from 'vue';

  export default Vue;
}
