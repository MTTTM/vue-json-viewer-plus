interface copyObject{
    copyText: string,
     copiedText: string
}
declare const _default: import("vue").DefineComponent<{
   value:object; 
   copyable?:boolean;
   expandDepth?: number;
   copyable?:boolean|copyObject;
   sort?:boolean;
   boxed?:boolean;
   theme?:string;
   expanded?:boolean;
   timeformat?:(t:string)=>string;
   previewMode?:boolean;
   showArrayIndex?:boolean;
   showDoubleQuotes?:boolean;
   allowClickType?:'all'|'array'|'[object Date]'|'object'|'number'|'string'|'boolean'|'function'|'string&number'|'number&string';
   allowClickTypeLabel?:string;
}>
export default _default;