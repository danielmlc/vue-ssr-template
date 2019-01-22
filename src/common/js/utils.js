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



    // 站点渲染函数的一些配置==================================
    
    getContentByNode:function(nodeName){
        const options={
            url:'/api/services/app/ssingletable07/getMainObjectForEdit',
            method:'post',
            data:{
                queryConditionItem:[
                    {dataField:"B_Col1",op:"EQ",dataValue:1},
                    {dataField:"V_Col1",op:"EQ",dataValue:nodeName},
                ],
            },
        }
        return options
    },

    getListbyNode:function(nodeName,sorting='sortCode asc'){
        const options={
            url:'/api/services/app/ssingletable08/getMainAllList',
            method:'post',
            data:{
                queryConditionItem:[
                    {dataField:"B_Col1",op:"EQ",dataValue:1},
                    {dataField:"V_Col1",op:"EQ",dataValue:nodeName},
                ],
                sorting: sorting
            }
        }
        return options
    },

    getPageListbyNode:function(nodeName,sorting='sortCode asc',draw=1,maxResultCount=15){

        const options={
            url:'/api/services/app/ssingletable08/getMainPageList',
            method:'post',
            data:{
                queryConditionItem:[
                    {dataField:"B_Col1",op:"EQ",dataValue:1},
                    {dataField:"V_Col1",op:"EQ",dataValue:nodeName},
                ],
                maxResultCount:maxResultCount,
                skipCount:maxResultCount*(draw-1),
                draw:draw,
                sorting: sorting
            }
        }
        return options
    }
}