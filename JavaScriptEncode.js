// 使用“\”对特殊字符进行转义，除数字字母之外，小于127使用16进制“\xHH”的方式进行编码，大于用unicode（非常严格模式）
const JavaScriptEncode = (str) => {
  const hex = new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f');
      
  function changeTo16Hex(charCode){
    return "\\x" + charCode.charCodeAt(0).toString(16);
  }
  
  function encodeCharx(original) {
    let found = true;
    let thecharchar = original.charAt(0);
    let thechar = original.charCodeAt(0);
    switch(thecharchar) {
      case '\n': return "\\n"; break; 
      case '\r': return "\\r"; break;
      case '\'': return "\\'"; break;
      case '"': return "\\\""; break;
      case '\&': return "\\&"; break;
      case '\\': return "\\\\"; break;
      case '\t': return "\\t"; break;
      case '\b': return "\\b"; break;
      case '\f': return "\\f"; break;
      case '/': return "\\x2F"; break;
      case '<': return "\\x3C"; break;
      case '>': return "\\x3E"; break;
      default:
        found=false;
        break;
    }
    if(!found){
      if(thechar > 47 && thechar < 58){ //数字
        return original;
      }
      
      if(thechar > 64 && thechar < 91){ //大写字母
        return original;
      }

      if(thechar > 96 && thechar < 123){ //小写字母
        return original;
      }        
        
      if(thechar > 127) { //大于127用unicode
        let c = thechar;
        let a4 = c%16;
        c = Math.floor(c/16); 
        let a3 = c%16;
        c = Math.floor(c/16);
        let a2 = c%16;
        c = Math.floor(c/16);
        let a1 = c%16;
        return "\\u"+hex[a1]+hex[a2]+hex[a3]+hex[a4]+"";        
      }
      else {
        return changeTo16Hex(original);
      }
    }
  }     

  let preescape = str;
  let escaped = "";
  let i=0;
  for(i=0; i < preescape.length; i++){
      escaped = escaped + encodeCharx(preescape.charAt(i));
  }
  return escaped;
}
