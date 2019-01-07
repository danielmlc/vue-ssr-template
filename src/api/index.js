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
    // fetchItems((api.cachedIds.top || []).slice(0, 30))
    setTimeout(warmCache, 1000 * 60 * 15)
}



//封装fetch方法
 function fetch(options,axiosConfig={baseURL:'',authorization:'',formatData:false}) {
    return new Promise((resolve, reject) => {
        if(axiosConfig.baseURL){
            axios.defaults.baseURL=axiosConfig.baseURL;
        }
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
        const res = response.data;
        if (response.status!== 200) {
            console.log(res.error); // for debug
            reject(res);
        }
            resolve(res);
        }).catch(error => {
            console.log(error); // for debug
            reject(error);
        });
    })
}

//获取token
export function fetchToken(){
    logRequests && console.log(`fetching token...`)
    const cache = api.cachedItems;
    if (cache && cache.has('token')) {
        logRequests && console.log(`cache hit for token.`)
        console.log('取缓存的值.',cache.get('token'))
        return Promise.resolve(cache.get('token'))
    } else {
        let paramsdata={
            grant_type:'client_credentials',
        };
     fetch({
            url:websiteConfig.url+'/Token',
            method:'post',
            data:paramsdata
        },
        {
            baseURL:'',
            authorization:"Basic " +encode(websiteConfig.clientId+":"+websiteConfig.clientSecret),
            formatData:true
        })().then((res)=>{
            console.log(res)
        })
    }
}

//数据请求
export function fetchData(options,axiosConfig,isCached=true) {
    logRequests && console.log(`fetching ${options.url}...`)
    const cache = api.cachedItems;
    if (cache && cache.has('token')) {
        logRequests && console.log(`cache hit for token.`)
        return Promise.resolve(cache.get('token'))
    }else {
        const instance = axios.create({
            headers: { 'Authorization':'Basic QzFCQzRDQ0VEOEI1NDRGQzE1MjY4QjhGMjlDQjAzODY6OEYzRDNCRjNFM0VBMjg5NUNEN0U4RTYxNzMzODVBQzU3QTM5QzI3ODcwNzE0QjY2'}
        });
        return new Promise((resolve, reject) => {
            axios.get(child).then(res => {
                const val = res.data && res.data.d;
                if (val) val.__lastUpdated = Date.now()
                cache && cache.set(child, val);
                logRequests && console.log(`fetched ${child}.`);
                resolve(val);
            }, reject).catch(reject);
        })
    }
}


