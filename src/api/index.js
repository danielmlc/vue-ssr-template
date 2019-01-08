// this is aliased in webpack config based on server/client build
import {createAPI} from 'create-api';
import axios from 'axios';
import qs from 'qs';
import websiteConfig from '../config/website';
import  {encode} from '../common/js/base64';


const logRequests = true || !!process.env.DEBUG_API;
const api = createAPI();

// warm the front page cache every 15 min
// make sure to do this only once across all requests
if (api.onServer) {
    warmCache()
}

function warmCache() {
    setTimeout(warmCache, 1000 * 60 * 15)
}

const axiosConf={baseURL:'',authorization:'',formatData:false};

//封装fetch方法
 function fetch(options,axiosConfig=axiosConf,isCached=true) {
    return new Promise((resolve, reject) => {
        axios.defaults.baseURL=axiosConfig.baseURL||websiteConfig.url;
        const instance = axios.create(
            axiosConfig.authorization?{headers: { 'Authorization':axiosConfig.authorization}}:{}
        );

        // 添加请求拦截器     
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            if (axiosConfig.formatData) {
                    config.data= qs.stringify(config.data);
            }
            return config;
            }, function (error) {
                // 对请求错误做些什么
                return reject(error);
            });
        //添加响应拦截器 
        instance.interceptors.response.use((response)=> {
            //console.log('response_start...');
            return response;
            }, function (error) {
                // 对响应错误做点什么
                return reject(error);
            });

    
       //初始化配置
        instance(options).then(response => {
            logRequests && console.log(`fetching ${options.url}...`)
            const res = response.data;
            if (response.status=== 200) {
                console.log('result',res)
                if(isCached){
                const cache = api.cachedItems;
                    res.__lastUpdated = Date.now()
                    cache && cache.set(options.url, res);
                    logRequests && console.log(`fetched ${options.url}.`);
                    resolve(res);
                }else{
                    resolve(res);
                }
            }else{
                console.log(res.error); 
                reject(res);
            }
        }).catch(error => {
            console.log(error); 
            reject(error);
        });
    })
}

//获取token
function fetchToken(){
    let paramsdata={
        grant_type:'client_credentials',
    };
    return fetch({
        url:'/Token',
        method:'post',
        data:paramsdata
    },
    {
        baseURL:'',
        authorization:"Basic " +encode(websiteConfig.clientId+":"+websiteConfig.clientSecret),
        formatData:true
    },true);
}

//数据请求
export  async function  fetchData(options,axiosConfig=axiosConf,isCached=true) {
    //判断是否有缓存
    console.log('执行了...');
    const cache = api.cachedItems;
    if (cache && cache.has(options.url)) {
        logRequests && console.log(`cache hit for ${options.url}`)
        return Promise.resolve(cache.get(options.url))
    } else{
        //自带权限请求
        if(axiosConfig.authorization){
            return fetch(options,axiosConfig,isCached);
        }else{
            if(!(cache && cache.has('/Token'))){
                await fetchToken();
            }
            axiosConfig.authorization='Bearer '+cache.get('/Token').access_token;
            return fetch(options,axiosConfig,isCached);
        }
    }
}


