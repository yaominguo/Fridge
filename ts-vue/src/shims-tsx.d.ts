/** 此文件的目的是允许以.tsx结尾的文件，在vue项目中编写jsx代码 */
import Vue, { VNode } from 'vue';

declare global { // 扩展全局变量
  // 在全局变量global中批量命名了数个内部模块
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
