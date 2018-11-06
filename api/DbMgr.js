import SQLiteStorage from 'react-native-sqlite-storage';
import {Tools} from "./Tools";

SQLiteStorage.DEBUG(__DEV__);
SQLiteStorage.enablePromise(true);

import RNFS from "react-native-fs";

/**
 *  数据库操作
 * **/
export class DbMgr {
    static db;
    static database_name = "lx_yyt.db";//数据库文件
    static database_version = "1.0";//版本号
    static database_displayname = "lx_yyt Database";
    static database_size = -1;//-1应该是表示无限制

    /***
     * 创建表列表
     * 字段说明
     * sql:创建表的sql语句
     * tableName:表名
     * */
    static DB_TABLE_LIST = [
        {
            sql:"CREATE TABLE IF NOT EXISTS tb_Media " +
            "(id integer primary key AUTOINCREMENT," +
            "path_local varchar(100) not null," +
            "path_service varchar(100) null," +
            "address varchar(100) null," +
            "lat decimal not null," +
            "lng decimal not null," +
            "author varchar(20) null," +
            "isVideo integer not null default 1," + //1、图片，0.视频
            "time_local integer not null," +
            "time_service integer null)",
            tableName:'tb_Media'
        },
        {
            sql:"CREATE TABLE IF NOT EXISTS tb_Role " +
            "(id integer primary key AUTOINCREMENT," +
            "id_parent varchar(100) not null," +
            "id_child varchar(100) not null," +
            "name varchar(100) not null," +
            "time integer not null," +
            "department varchar(100) not null)",
            tableName:'tb_Role'
        }
    ];

    /**
     * 打开或创建数据库
     * return Promise
     * **/
    static openDatabase(){
        return new Promise((resolve) => {
            if (this.db) {
                resolve(this.db);
            }
            else {

                SQLiteStorage.openDatabase(
                    this.database_name,
                    this.database_version,
                    this.database_displayname,
                    this.database_size)
                    .then((db)=>{
                        this.db = db;
                        // console.info("database","results");
                        this.createTable()
                            .then((results)=>{
                                resolve(this.db);
                            });

                    })
                    .catch((err)=>{
                        Tools.toast("数据库打开失败");
                        // reject(err);
                    });
            }

        });


    }

    /**
     * 执行sql
     * @param sql string,//sql命令
     * @param dataList array,//sql插入或更新的数据
     * return Promise
     * **/
    static executeSql(sql,dataList=[]) {
        return new Promise((resolve) => {
            this.openDatabase()
                .then(()=>{
                    this.db.transaction((tx)=>{
                        tx.executeSql(sql,
                            dataList)
                            .then(([tx,results])=>{
                                // console.info("results.rows",results.rows);
                                // resolve(results);
                                resolve(this.getSelectData(results));
                            })
                            .catch((err)=>{
                                Tools.toast("sql executeSql执行失败");
                                console.info("err executeSql",err);
                                // reject(err);
                            });
                    })
                        .catch((err)=>{

                            console.info("err transaction",err);
                            Tools.toast("sql transaction事件失败");
                            // reject(err);
                        });
                });
        });
    }

    /**
     * 创建表
     * @param index int,//表列下标
     * @param resolve func,//回调函数
     * **/
    static createTable(index = 0,resolve) {
        if(resolve){
            if(index == this.DB_TABLE_LIST.length){
                resolve();
            }
            else {
                // console.info("index",index)
                this.executeSql(this.DB_TABLE_LIST[index].sql)
                    .then((results)=>{
                        // console.info("index2",index + 1);
                        this.createTable(++index,resolve);
                    });
            }

        }
        else {
            return new Promise(resolve => {
                this.createTable(index,resolve);
            });
        }


    }

    /**
     * 获取查询数据
     * 将数据转化为数组
     * @param results object;//数据库查询到的数据
     * **/
    static getSelectData(results){
        let dataList = [];
        if(results&&results.rows){
            let len = results.rows.length;
            for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                dataList.push(row);
            }
        }

        // console.info("dataList",dataList);
        return dataList;
    }

    /**
     * 查询表
     * @param name string,//表名
     * @param where string,//条件
     * **/
    static queryTable(name,where=""){
        return this.executeSql("select * from " + name + " " + where);
        return this.executeSql("select * from " + name)
            .then((results)=>{
                return this.getSelectData(results);
            });
    };

    /**
     * 查询多媒体表
     * **/
    static queryTableMedia(){
        return this.queryTable("tb_Media")
            .then(rows=>{
                rows.forEach((row,i,a)=>{
                    row.path_local = row.path_local.replace(
                        row.path_local.substring(0,row.path_local.indexOf("Documents") + 9),
                        RNFS.DocumentDirectoryPath);
                });

                return rows;
            });
    };

    /**
     * 查询切换角色表
     * **/
    static queryTableRole(){
        return this.queryTable("tb_Role","ORDER BY time DESC");
    };

    /**
     * 插入角色表
     * @param dataList array;
     * //插入表的数据[
     id_parent,
     id_child,
     name,
     deparentment,
     time,
     ]
     * **/
    static insertTableRole(dataList){
        return this.executeSql(
            "INSERT INTO tb_Role" +
            "(id_parent," +
            "id_child," +
            "name," +
            "department," +
            "time) "+
            "values(?,?,?,?,?)",dataList);
    };

    /**
     * 插入切换角色表
     * @param dataList array;
     * //插入表的数据[
     path_local,
     lat,
     lng,
     time_local,
     address,
     author,
     isVideo,
     path_service,
     time_service
     ]
     * **/
    static insertTableMedia(dataList){
        return this.executeSql(
            "INSERT INTO tb_Media" +
            "(path_local," +
            "lat," +
            "lng," +
            "time_local," +
            "address," +
            "author," +
            "isVideo," +
            "path_service," +
            "time_service) "+
            "values(?,?,?,?,?,?,?,?,?)",dataList);
    };

    /**
     * 更新表
     * @param name string,//表名
     * @param alterJson json,//修改的json对象 alterJson={"列名"："值"}
     * @param where string,//条件值
     * **/
    static uptateTable(name,alterJson,where){
        let sql = " UPDATE " + name;
        if(alterJson){
            sql += " SET ";
            for(let key in alterJson) {
                sql += key + "=" + alterJson[key] + ",";
            }
            sql = sql.split(0,sql.length - 1);
            sql += " ";
        }

        sql += where;

        return this.executeSql(sql);
    }

    /**
     * 更新角色表
     * @param alterJson json,//修改的json对象 alterJson={"列名"："值"}
     * @param id string,//数据库ID
     * **/
    static uptateTableRole(alterJson,id){
        return this.uptateTable("tb_Role",alterJson,"where id=" + id);
    }

    /**
     * 删除表的数据
     * @param name string,//表名
     * @param id int,//id
     * **/
    static delDataTb(name,id){
        let sql = "delete from " + name;
        if(id != undefined)
        {
            sql +=" where id=" + id;
        }

        return this.executeSql(sql);
    }

    /**
     * 删除多媒体表的数据
     * @param id int,//拍照的id,若为undefined就删除所有
     * **/
    static delDataTbMDay(id){
        return this.delDataTb("tb_Media",id);
    }

    /**
     * 删除角色表数据
     * @param id int,//拍照的id,若为undefined就删除所有
     * **/
    static delDataTbRole(id){
        return this.delDataTb("tb_Role",id);
    }

    /**
     * 删除表
     * @param name string,//表名
     * **/
    static delTable(name){
        let sql = "DROP TABLE " + name;
        return this.executeSql(sql);
    }

    /**
     * 删除文件
     * @param dataList array,//据库查询到的数据
     * **/
    static deleteFile(dataList,i=0){
        if(dataList.length > 0){
            RNFS.unlink(dataList[i].path_local)
                .then(()=>{
                    if(dataList.length > i)
                    {
                        this.delDataTbMDay(dataList[i].id)
                            .then(()=>{
                                this.deleteFile(dataList,++i);
                            });
                    }
                })
                .catch(()=>{
                    if(dataList.length > i)
                    {
                        this.delDataTbMDay(dataList[i].id)
                            .then(()=>{
                                this.deleteFile(dataList,++i);
                            });
                    }
                });
        }
    }

    /**
     * 删除多媒体表31天前的数据
     * **/
    static delDataTbMDay31(){
        let timebefore = new Date().getTime() - Tools.ONE_DAY_TIME * 31;
        let sql = "select * from tb_Media where time_local<" + timebefore;
        return this.executeSql(sql);
    }
}

// DbMgr.delTable("tb_Role");
// DbMgr.delDataTbMDay31();