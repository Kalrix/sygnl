export const normalizeHandle = (v: string) =>
    v.replace(/^@+/, '').replace(/[^\w.]/g, '').toLowerCase();
  
  export const isHandleValid = (v: string) => normalizeHandle(v).length >= 3;
  