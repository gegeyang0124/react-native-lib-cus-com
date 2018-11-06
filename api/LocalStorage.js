import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';

/**
 * 持久化本地存储
 * **/
export class LocalStorage {

    static storage = new Storage({
        // 最大容量，默认值1000条数据循环存储
        size: 1000,

        // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
        // 如果不指定则数据只会保存在内存中，重启后即丢失
        storageBackend: AsyncStorage,

        // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
        defaultExpires: 1000 * 3600 * 24,

        // 读写时在内存中缓存数据。默认启用。
        enableCache: true,

        // 如果storage中没有相应数据，或数据已过期，
        // 则会调用相应的sync方法，无缝返回最新数据。
        // sync方法的具体说明会在后文提到
        // 你可以在构造函数这里就写好sync的方法
        // 或是在任何时候，直接对storage.sync进行赋值修改
        // 或是写到另一个文件里，这里require引入
        // sync: require('你可以另外写一个文件专门处理sync')
        sync: null

    });

    // 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用

    // 对于web
    // window.storage = storage;

    // 对于react native
    // global.storage = storage;
    // 这样，在此**之后**的任意位置即可以直接调用storage
    // 注意：全局变量一定是先声明，后使用
    // 如果你在某处调用storage报错未定义
    // 请检查global.storage = storage语句是否确实已经执行过了


    // 使用key来保存数据（key-only）。这些数据一般是全局独有的，需要谨慎单独处理的数据
    // 批量数据请使用key和id来保存(key-id)，具体请往后看
    // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。

    /**
     * 使用key来保存单个数据（key-only）。这些数据一般是全局独有的，需要谨慎单独处理的数据
     * @param key string;//存储key名，不要在key中使用_下划线符号!
     * @param value Object;//存储的数据
     * @param expires int;//指定过期时间，如果设为null，则永不过期，单位（s）,不传为null
     * **/
    static save(key, value, expires) {

        let option = {
            key: key,  // 注意:请不要在key中使用_下划线符号!
            data: value,

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        };
        option.expires = expires === undefined ? null : expires

        // 使用key来保存数据（key-only）。这些数据一般是全局独有的，需要谨慎单独处理的数据
        // 批量数据请使用key和id来保存(key-id)，具体请往后看
        // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
        return this.storage.save(option);
    }

    /**
     * 读取单个数据
     * @param key string;//存储key名
     * **/
    static get(key) {

        // 读取
        return this.storage.load({
            key: key,

            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
            syncInBackground: true,

            // 你还可以给sync方法传递额外的参数
            syncParams: {
                extraFetchOptions: {
                    // 各种参数
                },
                someFlag: true,
            },
        })
            .then(ret => {
                // 如果找到数据，则在then方法中返回
                // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
                // 你只能在then这个方法内继续处理ret数据
                // 而不能在then以外处理
                // 也没有办法“变成”同步返回
                // 你也可以使用“看似”同步的async/await语法

                //console.log(ret.userid);
                // this.setState({ user: ret });

                return ret;

            })
            .catch(err => {
                //如果没有找到数据且没有sync方法，
                //或者有其他异常，则在catch中返回
                // console.warn(err.message);
                switch (err.name) {
                    case 'NotFoundError':
                        // TODO;
                        break;
                    case 'ExpiredError':
                        // TODO
                        break;
                }

            });

    }

    /**
     * 使用key来保存批量数据（key-only）。这些数据一般是全局独有的，需要谨慎单独处理的数据
     * @param key string;//存储key名，不要在key中使用_下划线符号!
     * @param value Object;//存储的数据
     * @param id int/string;//存储的数据,存储的位置地址
     * @param expires int;//指定过期时间，如果设为null，则永不过期，单位（s）,不传为null
     * **/
    static saves(key, value, id, expires) {

        let option = {
            key: key,  // 注意:请不要在key中使用_下划线符号!
            data: value,
            id: id,   // 注意:请不要在id中使用_下划线符号!
            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        };
        option.expires = expires === undefined ? null : expires

        // 使用key来保存数据（key-only）。这些数据一般是全局独有的，需要谨慎单独处理的数据
        // 批量数据请使用key和id来保存(key-id)，具体请往后看
        // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
        return this.storage.save(option);
    }


    // 使用key和id来保存数据，一般是保存同类别（key）的大量数据。
    // 所有这些"key-id"数据共有一个保存上限（无论是否相同key）
    // 即在初始化storage时传入的size参数。
    // 在默认上限参数下，第1001个数据会覆盖第1个数据。
    // 覆盖之后，再读取第1个数据，会返回catch或是相应的sync方法。

    /**
     * 读取批量数据
     * @param key string;//存储key名
     * **/
    static gets(key, id) {

        //load 读取
        return this.storage.load({
            key: key,
            id: id
        })
            .then(ret => {
                // 如果找到数据，则在then方法中返回
                //console.log(ret.userid);

                return ret;

            }).catch(err => {
                // 如果没有找到数据且没有sync方法，
                // 或者有其他异常，则在catch中返回
                // console.warn(err.message);

                switch (err.name) {
                    case 'NotFoundError':
                        // TODO;
                        break;
                    case 'ExpiredError':
                        // TODO
                        break;
                }

            });

    }


    /**
     * // --------------------------------------------------

     // 获取某个key下的所有id(仅key-id数据)
     storage.getIdsForKey('user').then(ids => {
    console.log(ids);
});

     // 获取某个key下的所有数据(仅key-id数据)
     storage.getAllDataForKey('user').then(users => {
    console.log(users);
});

     // !! 清除某个key下的所有数据(仅key-id数据)
     storage.clearMapForKey('user');

     // --------------------------------------------------

     // 删除单个数据
     storage.remove({
	key: 'lastPage'
});
     storage.remove({
	key: 'user',
	id: '1001'
});

     // !! 清空map，移除所有"key-id"数据（但会保留只有key的数据）
     storage.clearMap();
     * **/

    /**
     *同步数据（刷新）
     * 有了上面这个sync方法，以后再调用storage.load时，如果本地并没有存储相应的user，那么会自动触发storage.sync.user去远程取回数据并无缝返回。
     * **/
    /* storage.sync = {
         // sync方法的名字必须和所存数据的key完全相同
         // 方法接受的参数为一整个object，所有参数从object中解构取出
         // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
         user(params){
             let { id, resolve, reject, syncParams: { extraFetchOptions, someFlag } } = params;
             fetch('user/', {
                 method: 'GET',
                 body: 'id=' + id,
                 ...extraFetchOptions,
             }).then(response => {
                 return response.json();
             }).then(json => {
                 //console.log(json);
                 if(json && json.user){
                     storage.save({
                         key: 'user',
                         id,
                         data: json.user
                     });

                     if (someFlag) {
                         // 根据syncParams中的额外参数做对应处理
                     }

                     // 成功则调用resolve
                     resolve && resolve(json.user);
                 }
                 else{
                     // 失败则调用reject
                     reject && reject(new Error('data parse error'));
                 }
             }).catch(err => {
                 console.warn(err);
                 reject && reject(err);
             });
         }
     }*/

    /**
     * 读取批量数据
     * **/
    /*// 使用和load方法一样的参数读取批量数据，但是参数是以数组的方式提供。
// 会在需要时分别调用相应的sync方法，最后统一返回一个有序数组。
    storage.getBatchData([
                             { key: 'loginState' },
                             { key: 'checkPoint', syncInBackground: false },
                             { key: 'balance' },
                             { key: 'user', id: '1009' }
                         ])
.then(results => {
    results.forEach( result => {
    console.log(result);
})
})

//根据key和一个id数组来读取批量数据
storage.getBatchDataWithIds({
    key: 'user',
    ids: ['1001', '1002', '1003']
})
    .then( ... )*/

}

