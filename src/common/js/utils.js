export default {
     //操作cookie
     setCookie:function (name, value, iDay) {
        var oDate=new Date();
        oDate.setDate(oDate.getDate()+iDay);
        document.cookie=name+'='+encodeURIComponent(value)+';expires='+oDate;
    },
    //删除所有cookie
    clearAllCookie:function(){
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);  
            if(keys) {  
                for(var i = keys.length; i--;)  
                    document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
            }  
    },
    getCookie:function (name)
    {
        var arr=document.cookie.split('; ');
        var i=0;
        for(i=0;i<arr.length;i++)
        {
            var arr2=arr[i].split('=');
            if(arr2[0]==name)
            {  
                var getC = decodeURIComponent(arr2[1]);
                return getC;
            }
        }
        return '';
    },
}